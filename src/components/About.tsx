import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Software Developer specializing in{" "}
          <span className="about-emphasis">Python backends for fintech</span>
          {" — "}API integrations (PayU), multi-tenant PostgreSQL, and scalable
          microservices. I’ve built REST &amp; GraphQL APIs, ODM/feedback modules
          with traceability, secure ABHA (NDHM) integration, and an event-driven
          notification system.
          <span className="about-meta">
            CSE (AI/ML) graduate (New LJIET) • IBM certified • Microsoft Azure
            Fundamentals (AZ-900)
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
