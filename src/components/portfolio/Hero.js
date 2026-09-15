import './Hero.css';
import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaGlobe
} from 'react-icons/fa';
import API_BASE_URL from '../../config/api';

// Map platform names to icons
const socialIconMap = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
  facebook: <FaFacebook />,
  tiktok: <FaTiktok />,
  globe: <FaGlobe />
};

// Fallback data (used before API loads or if API fails)
const fallbackHero = {
  greeting: "Hello, I'm",
  name: "Ali Raxa",
  roles: [
    'Front-End React Developer',
    'Video Editor & AI Content Creator',
    'Graphics Designer'
  ],
  bio: "I build modern, responsive and user-friendly websites using React.js.",
  profileImageUrl: "/images/profile.jpeg",
  cvUrl: "/cv/Ali-Raxa-CV.pdf",
  hireMeLink: "#contact",
  socials: [
    { platform: "github", url: "https://github.com/Softdev2236" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/ali-raxa-khan-11728527b" }
  ]
};

function Hero() {
  const [hero, setHero] = useState(fallbackHero);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch hero from API
  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const url = `${API_BASE_URL}/api/hero`;
      console.log('📡 Fetching hero from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('📦 Hero data:', data);

      if (data.success && data.data) {
        setHero(data.data);
      } else {
        console.log('ℹ️ Using fallback hero data');
      }
    } catch (err) {
      console.error('❌ Error fetching hero:', err);
      // Keep using fallback
    } finally {
      setLoading(false);
    }
  };

  // Scrolling text animation
  useEffect(() => {
    const roles = hero.roles || [];
    if (roles.length === 0) return;

    const currentRole = roles[roleIndex % roles.length];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setIsDeleting(true);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 10 : 100);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, hero.roles?.length]);

  return (
    <section className='hero' id='home'>
      <div className='hero-content'>
        <div className='hero-left'>
          <h3>{hero.greeting}</h3>
          <h1>{hero.name}</h1>
          <h2>
            {text}<span className="cursor">|</span>
          </h2>
          <p>{hero.bio}</p>
          <div className='hero-buttons'>
            <a href={hero.hireMeLink || '#contact'} className='btn primary-btn'>
              Hire Me
            </a>
            {hero.cvUrl && (
              <a href={hero.cvUrl} download className="btn secondary-btn">
                Download CV
              </a>
            )}
          </div>
          <div className='social-icons'>
            {hero.socials?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                title={social.platform}
              >
                {socialIconMap[social.platform] || socialIconMap.globe}
              </a>
            ))}
          </div>
        </div>

        <div className='hero-right'>
          <img src={hero.profileImageUrl} alt='profile' />
        </div>
      </div>
    </section>
  );
}

export default Hero;