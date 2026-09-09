import './Hero.css';
import profile from '../../assets/profile.jpeg';
import React, { useState, useEffect } from "react";
import{
    FaGithub,FaLinkedin
} from 'react-icons/fa';
const roles = [
    'Front-End React Developer',
    'Video Editor & AI Content Creator',
    'Graphics Designer'
];
function Hero() {
    const [text,setText]=useState('');
    const [roleIndex,setRoleIndex]=useState(0);
    const [isDeleting,setIsDeleting]=useState(false);
    useEffect(()=>{
         const currentRole=roles[roleIndex];
         const timer=setTimeout(()=>{
           if(!isDeleting){
            setText(currentRole.substring(0,text.length+1));
            if(text===currentRole){
                setIsDeleting(true);
            }
           } else 
           {
            setText(currentRole.substring(0,text.length-1));
            if(text===''){
                setIsDeleting(false);
                setRoleIndex((roleIndex+1)%roles.length);
            }
           }

         },isDeleting?10:100);
         return()=>clearTimeout(timer);
    },[text,isDeleting,roleIndex]);

return(
    <section className='hero' id='home'>
        <div className='hero-content'>
            <div className='hero-left'>
                <h3>Hello, I'm</h3>
    <h1>Ali Raxa</h1>
   <h2>
    {text}<span className="cursor">|</span>
</h2>
    <p>I build modern, responsive and user-friendly websites using React.js.</p>
    <div className='hero-buttons'>
<a href='#contact' className='btn primary-btn'>Hire Me</a>
<a href="/cv/Ali-Raxa-CV.pdf"  download className="btn secondary-btn"> Download CV</a>
</div>
<div className='social-icons'>
    <a href="https://github.com/Softdev2236" target='_blank' rel='noreferrer'><FaGithub/></a>
     <a href="https://www.linkedin.com/in/ali-raxa-khan-11728527b" target="_blank" rel="noreferrer"><FaLinkedin /> </a>
    
</div>
    </div>
    
            <div className='hero-right'> 
                <img src={profile} alt='profile'/>
                </div>
        </div>
    </section>
)
}
export default Hero;