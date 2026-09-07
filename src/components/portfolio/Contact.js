import { useRef ,useState} from "react";
import "./Contact.css";
import contactData from "./ContactData";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

function Contact() {
    const form = useRef();
    const [status, setStatus] = useState("");
    const [isSending, setIsSending] = useState(false);
    const sendEmail = (e) => {
    e.preventDefault();

    setIsSending(true);
    setStatus("");

    emailjs
        .sendForm(
            "portfolio_gmail",
            "template_hy8kbgq",
            form.current,
            "MxIqtYGZ826PupITB"
        )
        .then(() => {
            setStatus("success");
            setIsSending(false);
            form.current.reset();
        })
        .catch((error) => {
            console.log("EmailJS Error:", error);
            setStatus("error");
             setIsSending(false);
        })
      
};
   
    return (
        <section className="contact" id="contact">

            <h2 className="my-contact">
                Contact Me
            </h2>

            <div className="contact-container">

                <div className="contact-info">

                    <h3>Let's Work Together</h3>

                    <p>
                        Have a project in mind? Feel free to get in touch with me.
                    </p>

                    <div className="contact-details">

                        <div className="contact-item">
                            <span><FaEnvelope /></span>
                            <p>{contactData.email}</p>
                        </div>

                        <div className="contact-item">
                            <span> <FaPhone /></span>
                            <p>{contactData.phone}</p>
                        </div>

                        <div className="contact-item">
                            <span><FaLocationDot /></span>
                            <p>{contactData.location}</p>
                        </div>

                    </div>

                </div>


                <form ref={form} className="contact-form" onSubmit={sendEmail}>

                    <input type="text" name="from_name" placeholder="Your Name" required />

                    <input type="email" name="from_email" placeholder="Your Email" required />

                    <input type="text" name="subject" placeholder="Subject" required />

                    <textarea
                        name="message" placeholder="Your Message" rows="6" required ></textarea>
     {status === "success" && (
    <p className="form-status success-message">
        ✓ Message sent successfully!
    </p>
)}

{status === "error" && (
    <p className="form-status error-message">
        ✕ Failed to send message. Please try again.
    </p>
)}
     <button type="submit" disabled={isSending}> {isSending ? "Sending..." : "Send Message"} </button>

                </form>

            </div>

        </section>
    );
}

export default Contact;