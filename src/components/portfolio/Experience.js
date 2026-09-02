import './Experience.css';
import experienceData from './ExperienceData';
import ExperienceCard from './ExperienceCard';
function Experience(){
    return(
        <section className='experience' id='experience'>
            <h2 className='my-experience'>My Experience</h2>
            <div className='experience-container'>

                {experienceData.map((experience)=>(
                    <ExperienceCard key={experience.id} experience={experience}/>
                ))}
            </div>
            
        </section>
    )
}
export default Experience;