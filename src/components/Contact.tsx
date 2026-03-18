import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:3690.hetshah2002official@gmail.com" data-cursor="disable">
                3690.hetshah2002official@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>+91 9913114577</p>
            <h4>Education</h4>
            <p>
              BE in CSE (AI/ML) — Gujarat Technical University (New LJIET)
              (CGPA: 7.6)
            </p>
            <h4>Location</h4>
            <p>Bangalore, India</p>
            <h4>Address</h4>
            <p>
              213, 68th Cross, 5th Block, Bhasyam Circle, Landmark - Venkat
              School, Rajaji Nagar, Bangalore 560010
            </p>
            <h4>Date of Birth</h4>
            <p>17 May 2002</p>
            <h4>Languages</h4>
            <p>English, Hindi, Gujarati</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/hetshah17"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Het Shah</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
