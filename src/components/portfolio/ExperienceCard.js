const ExperienceCard = ({ experience }) => {
    return (
        <div className="experience-card">

            <div className="experience-content">

                <h3>{experience.position}</h3>

                <h4>{experience.company}</h4>

                <span className="experience-duration">
                    {experience.duration}
                </span>

                <p>{experience.description}</p>

            </div>

        </div>
    );
};

export default ExperienceCard;