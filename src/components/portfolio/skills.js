import { useState, useEffect } from 'react';
import './skills.css';
import SkillCard from './SkillCard';
import API_BASE_URL from '../../config/api';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      console.log('📡 Fetching skills from:', `${API_BASE_URL}/api/skills`);
      const response = await fetch(`${API_BASE_URL}/api/skills`);
      const data = await response.json();

      if (data.success) {
        // Map MongoDB _id to id for React key
        const mappedSkills = data.data.map(skill => ({
          id: skill._id,
          name: skill.name,
          percentage: skill.percentage,
          icon: skill.icon,  // Icon is a string like "FaHtml5"
          order: skill.order
        }));
        setSkills(mappedSkills);
      } else {
        setError('Failed to load skills');
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className='skills' id='skills'>
        <h2 className='my-skills'>My Skills</h2>
        <div className='skills-container'>
          <div style={{
            textAlign: 'center',
            color: 'white',
            padding: '50px',
            gridColumn: '1 / -1'
          }}>
            <div style={{
              display: 'inline-block',
              border: '2px solid goldenrod',
              padding: '20px 40px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.1)'
            }}>
              ⏳ Loading skills...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className='skills' id='skills'>
        <h2 className='my-skills'>My Skills</h2>
        <div className='skills-container'>
          <div style={{
            textAlign: 'center',
            color: '#ff6b6b',
            padding: '50px',
            gridColumn: '1 / -1'
          }}>
            <div style={{
              border: '2px solid #ff6b6b',
              padding: '20px 40px',
              borderRadius: '10px',
              background: 'rgba(255, 107, 107, 0.1)'
            }}>
              ❌ {error}
              <br /><br />
              <button
                onClick={fetchSkills}
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

  // No skills state
  if (skills.length === 0) {
    return (
      <section className='skills' id='skills'>
        <h2 className='my-skills'>My Skills</h2>
        <div className='skills-container'>
          <div style={{
            textAlign: 'center',
            color: '#bbb',
            padding: '50px',
            gridColumn: '1 / -1'
          }}>
            <div style={{
              border: '2px dashed goldenrod',
              padding: '30px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.05)'
            }}>
              📂 No skills yet. Add your first skill!
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display skills
  return (
    <section className='skills' id='skills'>
      <h2 className='my-skills'>My Skills</h2>
      <div className='skills-container'>
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;