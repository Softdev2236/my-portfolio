import { useState } from "react";

const SkillCard = ({ skill }) => {

    const [animate, setAnimate] = useState(false);

    const handleMouseEnter = () => {
        setAnimate(true);
    };

    const handleMouseLeave = () => {
        setAnimate(false);
    };

    return (
        <div
            className="skill-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <div className="skill-icon">
                {skill.icon}
            </div>

            <div className="skill-content">

                <div className="skill-header">
                    <h3>{skill.name}</h3>
                    <p>{skill.percentage}%</p>
                </div>

                <div className="skill-progress">

                    <div
                        className={`skill-progress-bar ${
                            animate ? "animate" : ""
                        }`}
                        style={{
                            "--skill-level": `${skill.percentage}%`
                        }}
                    ></div>

                </div>

            </div>

        </div>
    );
};

export default SkillCard;