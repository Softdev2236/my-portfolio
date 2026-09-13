import { useState, useEffect } from 'react';
import './Experience.css';
import ExperienceCard from './ExperienceCard';
import API_BASE_URL from '../../config/api';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const url = `${API_BASE_URL}/api/experience`;
      console.log('📡 Fetching experience from:', url);
      
      const response = await fetch(url);
      console.log('📥 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Data received:', data);

      if (data.success) {
        const mappedExperiences = data.data.map(exp => ({
          id: exp._id,
          position: exp.position,
          company: exp.company,
          duration: exp.duration,
          description: exp.description,
          order: exp.order
        }));
        console.log('✅ Mapped', mappedExperiences.length, 'experiences');
        setExperiences(mappedExperiences);
      } else {
        setError('Failed to load experience');
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className='experience' id='experience'>
        <h2 className='my-experience'>My Experience</h2>
        <div className='experience-container'>
          <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
            <div style={{
              display: 'inline-block',
              border: '2px solid goldenrod',
              padding: '20px 40px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.1)'
            }}>
              ⏳ Loading experience...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className='experience' id='experience'>
        <h2 className='my-experience'>My Experience</h2>
        <div className='experience-container'>
          <div style={{ textAlign: 'center', color: '#ff6b6b', padding: '50px' }}>
            <div style={{
              border: '2px solid #ff6b6b',
              padding: '20px 40px',
              borderRadius: '10px',
              background: 'rgba(255, 107, 107, 0.1)'
            }}>
              ❌ {error}
              <br /><br />
              <button
                onClick={fetchExperiences}
                style={{
                  padding: '10px 20px',
                  background: 'goldenrod',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'black',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No experience state
  if (experiences.length === 0) {
    return (
      <section className='experience' id='experience'>
        <h2 className='my-experience'>My Experience</h2>
        <div className='experience-container'>
          <div style={{ textAlign: 'center', color: '#bbb', padding: '50px' }}>
            <div style={{
              border: '2px dashed goldenrod',
              padding: '30px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.05)'
            }}>
              📂 No experience yet. Add your first experience!
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display experience
  return (
    <section className='experience' id='experience'>
      <h2 className='my-experience'>My Experience</h2>
      <div className='experience-container'>
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
}

export default Experience;