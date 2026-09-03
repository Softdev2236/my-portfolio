import React from "react";
import "./Navbar.css";

import {
  FaHome,
  FaCog,
  FaCode,
  FaCalendarAlt,
  FaEnvelope,
  FaFolder,
} from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
    const [active, setActive] = useState("HOME");

    const links = [
    { name: "HOME", icon: <FaHome />, target: "home" },
    { name: "Services", icon: <FaCog />, target: "services" },
    { name: "Skills", icon: <FaCode />, target: "skills" },
    { name: "PROJECTS", icon: <FaFolder />, target: "projects" },
    { name: "Experience", icon: <FaCalendarAlt />, target: "experience" },
    { name: "Contact", icon: <FaEnvelope />, target: "contact" },
];

const handleScroll = (target) => {
    const section = document.getElementById(target);
    const navbar = document.querySelector(".navbar");

    if (!section || !navbar) return;

    const navbarHeight = navbar.offsetHeight;
    const gap = 20;

    const start = window.pageYOffset;
    const end =
        section.getBoundingClientRect().top +
        start -
        navbarHeight -
        gap;

    const distance = end - start;

    const duration = 500;
    let startTime = null;

    const animateScroll = (currentTime) => {
        if (!startTime) startTime = currentTime;

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const ease =
            progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(
            0,
            start + distance * ease
        );

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    };

    requestAnimationFrame(animateScroll);
};

    return (
        <nav className="navbar">
            <div className="logo-box">
  <span className="logo">ALIKHAN</span>
</div>

            <ul className="nav-links">
                {links.map((link) => (
   <li
    key={link.name}
    className={active === link.name ? "active" : ""}
    onClick={() => {
        setActive(link.name);
         handleScroll(link.target);
    }}
>
    {link.icon}
    <span>{link.name}</span>
</li>
                ))}
            </ul>

            <div className="logo-box">
  <span className="logo">PORTFOLIO</span>
</div>
        </nav>
    );
};
export default Navbar;