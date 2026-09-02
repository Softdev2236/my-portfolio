
import './skills.css';
import skillsData from './SkillsData';
import SkillCard from './SkillCard'; 

function Skills(){
    return(
        <section className='skills' id='skills'>
            <h2 className='my-skills'>My Skills</h2>
            <div className='skills-container'>
                {skillsData.map((skill) => (
    <SkillCard
        key={skill.id}
        skill={skill}
    />
))}
                
            </div>
        </section>
    )
}
export default Skills;