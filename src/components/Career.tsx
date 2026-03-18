import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BE in CSE (AI/ML)</h4>
                <h5>Gujarat Technical University (New LJIET)</h5>
              </div>
              <h3>2020 - 05/2024</h3>
            </div>
            <p>
              Graduated in Computer Science & Engineering (AI/ML) with CGPA{" "}
              <span style={{ color: "var(--accentColor)" }}>7.6</span> and top project
              grades. Built a strong foundation in Python, machine learning, and
              data science.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer (Intern)</h4>
                <h5>Nife Card</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Worked on fintech backend development including PayU modules such
              as Issuance, Online Dispute Resolution (ODR), Onboarding, and
              Limit Management. Developed wrapper APIs for PayU card, wallet,
              transaction, and service workflows. Implemented loyalty points for
              customer events and built ODM + feedback modules with centralized
              backup and traceability across PayU and Nife systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer (FTE)</h4>
                <h5>Nife Card</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Supported the launch of India&apos;s first Health & Wellness RuPay
              Prepaid Card and strengthened multi-tenant backend architecture
              across the Nife platform. Designed flexible multi-tenant
              PostgreSQL schemas (including file logging with versioning and
              security metadata), implemented robust logging + API key
              verification, and built token-authenticated workflows for
              scalable services. Additionally, developed secure ABHA
              integration (FastAPI, RSA encryption, dual-layer auth) and an
              event-driven notification system for reliable in-app delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
