import "./Contact.css";
import contactData from "./ContactData";

function Contact() {
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
                            <span>📧</span>
                            <p>{contactData.email}</p>
                        </div>

                        <div className="contact-item">
                            <span>📱</span>
                            <p>{contactData.phone}</p>
                        </div>

                        <div className="contact-item">
                            <span>📍</span>
                            <p>{contactData.location}</p>
                        </div>

                    </div>

                </div>


                <form className="contact-form">

                    <input
                        type="text"
                        placeholder="Your Name"
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                    />

                    <input
                        type="text"
                        placeholder="Subject"
                    />

                    <textarea
                        placeholder="Your Message"
                        rows="6"
                    ></textarea>

                    <button type="submit">
                        Send Message
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Contact;