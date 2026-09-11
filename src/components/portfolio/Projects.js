import { useState, useEffect } from 'react';
import './Projects.css';
import ProjectCard from './ProjectCard';
import API_BASE_URL from '../../config/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
  try {
    console.log('📡 Fetching from:', `${API_BASE_URL}/api/projects`);
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    const data = await response.json();
    
    if (data.success) {
      const mappedProjects = data.data.map(project => ({
        id: project._id,
        title: project.title,
        description: project.description,
        image: project.imageUrl,
        tools: project.technologies,
        liveLink: project.liveUrl,
        githubLink: project.githubUrl
      }));
      setProjects(mappedProjects);
    } else {
      setError('Failed to load projects');
    }
  } catch (err) {
    console.error('Error fetching projects:', err);
    setError('Cannot connect to server. Make sure backend is running.');
  } finally {
    setLoading(false);
  }
};

  // Loading state
  if (loading) {
    return (
      <section className="projects" id="projects">
        <h2 className="my-projects">My Projects</h2>
        <div className="projects-container">
          <div style={{ 
            textAlign: 'center', 
            color: 'white', 
            padding: '50px',
            fontSize: '18px'
          }}>
            <div style={{ 
              display: 'inline-block',
              border: '2px solid goldenrod',
              padding: '20px 40px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.1)'
            }}>
              ⏳ Loading projects...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="projects" id="projects">
        <h2 className="my-projects">My Projects</h2>
        <div className="projects-container">
          <div style={{ 
            textAlign: 'center', 
            color: '#ff6b6b', 
            padding: '50px',
            fontSize: '16px'
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
                onClick={fetchProjects}
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

  // No projects state
  if (projects.length === 0) {
    return (
      <section className="projects" id="projects">
        <h2 className="my-projects">My Projects</h2>
        <div className="projects-container">
          <div style={{ 
            textAlign: 'center', 
            color: '#bbb', 
            padding: '50px',
            fontSize: '16px'
          }}>
            <div style={{ 
              border: '2px dashed goldenrod',
              padding: '30px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.05)'
            }}>
              📂 No projects yet. Add your first project!
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display projects
  return (
    <section className="projects" id="projects">
      <h2 className="my-projects">My Projects</h2>
      <div className="projects-container">
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;