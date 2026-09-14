import {
  FaReact,
  FaPaintBrush,
  FaVideo,
  FaRobot,
  FaFileExcel,
  FaCode,
  FaMobile,
  FaPalette,
  FaCamera,
  FaChartLine
} from 'react-icons/fa';

// Map icon names (strings from MongoDB) to actual React components
const iconMap = {
  FaReact: <FaReact />,
  FaPaintBrush: <FaPaintBrush />,
  FaVideo: <FaVideo />,
  FaRobot: <FaRobot />,
  FaFileExcel: <FaFileExcel />,
  FaCode: <FaCode />,
  FaMobile: <FaMobile />,
  FaPalette: <FaPalette />,
  FaCamera: <FaCamera />,
  FaChartLine: <FaChartLine />,
  // Default fallback
  default: <FaCode />
};

const ServiceCard = ({ service }) => {
  // Get the icon component from the map, or use fallback
  const iconComponent = iconMap[service.icon] || iconMap.default;

  return (
    <div className="service-card">
      <div className="service-icon">
        {iconComponent}
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
};

export default ServiceCard;