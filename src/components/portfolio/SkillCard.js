import { useState } from "react";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaCode,
  FaGitAlt,
  FaFigma,
  FaSass,
  FaBootstrap
} from 'react-icons/fa';

// ⚠️ Map icon names (from MongoDB) to actual React components
const iconMap = {
  FaHtml5: <FaHtml5 />,
  FaCss3: <FaCss3 />,
  FaJs: <FaJs />,
  FaReact: <FaReact />,
  FaNodeJs: <FaNodeJs />,
  FaPython: <FaPython />,
  FaDatabase: <FaDatabase />,
  FaGitAlt: <FaGitAlt />,
  FaFigma: <FaFigma />,
  FaSass: <FaSass />,
  FaBootstrap: <FaBootstrap />,
  // Default fallback
  FaCode: <FaCode />
};

const SkillCard = ({ skill }) => {
  const [animate, setAnimate] = useState(false);

  const handleMouseEnter = () => {
    setAnimate(true);
  };

  const handleMouseLeave = () => {
    setAnimate(false);
  };

  // Get the icon component from the map, or use fallback
  const iconComponent = iconMap[skill.icon] || <FaCode />;

  return (
    <div
      className="skill-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="skill-icon">
        {iconComponent}
      </div>

      <div className="skill-content">
        <div className="skill-header">
          <h3>{skill.name}</h3>
          <p>{skill.percentage}%</p>
        </div>

        <div className="skill-progress">
          <div
            className={`skill-progress-bar ${animate ? "animate" : ""}`}
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