import './Projects.css';
import projectData from './ProjectData';
import ProjectCard from './ProjectCard';

function Projects()
{
    return(
        <section className='projects' id='projects'>
            <h2 className= 'my-projects'>  My Projects</h2>
            <div className='projects-container'>
                {projectData.map((project)=>(
                    <ProjectCard key={project.id} project={project}/>
                )
                )}
            </div>
        </section>
    )
}
export default Projects;