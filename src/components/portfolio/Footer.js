import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <h2>Ali Raxa</h2>

                <p>
                    Frontend React Developer | Graphic Designer | AI Content Creator
                </p>

                <div className="footer-links">
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#experience">Experience</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="footer-line"></div>

                <p className="copyright">
                    © 2026 Ali Raxa. All Rights Reserved.
                </p>

            </div>
        </footer>
    );
}

export default Footer;