
const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">

            <div className="project-image">
                <img src={project.image} alt={project.title}/>
            </div>
            <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tools">
                    {project.tools.map((tool, index) => (
                        <span key={index}>
                            {tool}
                        </span>
                    ))}
                </div>
                <div className="project-buttons">
                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                        View Project
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noreferrer" >
                        Source Code
                    </a>
                     </div>

            </div>

        </div>
    );
};

export default ProjectCard;