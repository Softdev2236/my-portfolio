import {
    FaReact,
    FaPaintBrush,
    FaVideo,
    FaRobot,
    FaFileExcel
} from "react-icons/fa";

const ServicesData = [
    {
        id: 1,
        title: "React Web Development",
        description:
            "I build modern, responsive and user-friendly websites using React.js.",
        icon: <FaReact />
    },
    {
        id: 2,
        title: "Graphic Design",
        description:
            "I create professional graphics, social media posts and visual designs using Canva and Photoshop.",
        icon: <FaPaintBrush />
    },
    {
        id: 3,
        title: "Video Editing",
        description:
            "I edit engaging videos for YouTube, social media and promotional content.",
        icon: <FaVideo />
    },
    {
        id: 4,
        title: "AI Content Creation",
        description:
            "I create AI-powered images, videos, scripts and creative digital content.",
        icon: <FaRobot />
    },
    {
        id: 5,
        title: "Advanced Excel",
        description:
            "I work with advanced Excel formulas, reports, dashboards and data management.",
        icon: <FaFileExcel />
    }
];

export default ServicesData;