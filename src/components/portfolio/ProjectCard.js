import { useState } from 'react';

const ProjectCard = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="project-card">
      <div className="project-image">
        {imageError ? (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a, #333)',
            color: 'goldenrod',
            fontSize: '56px',
            fontWeight: 'bold'
          }}>
            {project.title?.charAt(0) || '?'}
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tools">
          {project.tools?.map((tool, index) => (
            <span key={index}>{tool}</span>
          ))}
        </div>
        <div className="project-buttons">
          <a href={project.liveLink} target="_blank" rel="noreferrer">
            View Project
          </a>
          <a href={project.githubLink} target="_blank" rel="noreferrer">
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;