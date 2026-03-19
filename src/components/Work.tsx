import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Project = {
  title: string;
  category: string;
  tools: string;
  description: string;
  bullets: string[];
};

const projects: Project[] = [
  {
    title: "Product Microservice",
    category: "Fintech — Multi-Tenant Service",
    tools: "Python, PostgreSQL, SQLAlchemy, GraphQL, REST APIs, Token Auth, AWS S3",
    description:
      "Designed a scalable microservice-ready backend architecture for Nife. The system uses multi-tenancy and robust database models to support complex insurance/product-like rules and operational workflows.",
    bullets: [
      "Implemented multitenancy across the Nife module for scalable architecture.",
      "Designed flexible, multi-tenant database models to log system-generated and user-uploaded files with detailed metadata (versioning, security type, permissions, file path, etc.).",
      "Implemented centralized backup of all PayU and Nife disputes in Nife’s database for reliable issue management.",
      "Designed and maintained database schemas using PostgreSQL for efficient data management.",
      "Developed robust logging, error handling, API key verification, and dynamic data filtering logic.",
      "Designed flexible, multi-tenant database models supporting Products, Taxes, Pricing Rules, Pricebooks, and Party Products with full CRUD and filtering APIs.",
      "Developed robust logging, error handling, token-based authentication, and atomic transaction flow between database logging and file upload.",
      "Implemented complex relationships (e.g., product-tax, product-pricing rules) and optimized GraphQL APIs for performance and reusability.",
      "Designed and developed an intelligent insurance recommendation system to recommend products based on user inputs, eligibility criteria, pricing, taxes, and rule combinations.",
      "Designed the system to be scalable, modular, and aligned with real-world insurance product requirements (policy management, tax calculations, pricebooks, etc.).",
    ],
  },
  {
    title: "PayU Integration",
    category: "Fintech — Payment Gateway",
    tools: "Python, FastAPI, REST APIs, Postman, Bitbucket",
    description:
      "Implemented and wired core PayU integration capabilities into Nife’s backend so internal systems could manage cards, wallets, transactions, and customer service workflows reliably.",
    bullets: [
      "Implemented key PayU functionalities including Issuance, Online Dispute Resolution (ODR), Onboarding, and Limit Management.",
      "Implemented key functionalities including card management (Get Physical Card, Link Card).",
      "Implemented wallet operations (Fetch Wallet Limit).",
      "Implemented transaction history (Transaction Statement Inquiry, Statement Inquiry).",
      "Implemented customer service workflows (Create/View Service Request, Retrieve Customer Data).",
      "Developed wrapper APIs for the PayU Integration Module to enable seamless communication between internal systems and PayU APIs.",
      "Developed a secure ABHA (Ayushman Bharat Health Account) integration service using FastAPI to enable NDHM-compliant enrollment, authentication, and management of digital health accounts.",
      "Designed and implemented RESTful APIs for public key certificate generation, Aadhaar-based OTP enrollment, and ABHA profile management with dual-layer authentication (JWT and ABHA tokens).",
      "Implemented RSA encryption to securely transmit sensitive health and identity data.",
      "Built multi-tenant database operations using SQLAlchemy for tenant-isolated access, with comprehensive error handling and audit logging.",
    ],
  },
  {
    title: "Dispute & Feedback",
    category: "Fintech — ODM System",
    tools: "Python, PostgreSQL, Email Automation",
    description:
      "Built dispute and feedback management to centralize customer issue handling. The design supports unified tracking across PayU and Nife systems while improving responsiveness through automated notifications.",
    bullets: [
      "Developed an Online Dispute Management (ODM) module supporting both PayU and Nife’s internal server using a shared database architecture for unified dispute tracking and data consistency.",
      "Ensured centralized backup of disputes in Nife’s database to improve reliability and traceability.",
      "Engineered a feedback module for Nife users, enabling streamlined feedback collection and centralized storage for analysis and action.",
      "Designed and implemented an automated email notification system to acknowledge dispute submissions and feedback.",
    ],
  },
  {
    title: "Loyalty Module",
    category: "Fintech — Rewards System",
    tools: "Python, FastAPI, PostgreSQL, Jira",
    description:
      "Implemented loyalty logic that converts user events into meaningful rewards, helping Nife deliver tiered experiences and track spending benefits over time.",
    bullets: [
      "Spearheaded the implementation and handling of the loyalty module.",
      "Assigned loyalty points to customers based on events such as referrals and purchases.",
    ],
  },
  {
    title: "RuPay Health Card",
    category: "Fintech — Prepaid Card Launch",
    tools: "Python, Postman, PostgreSQL, Bitbucket, Jira",
    description:
      "At Nife Card, I supported the launch of India's first Health & Wellness RuPay prepaid card. The platform combines secure backend payment flows with customer-focused features such as loyalty and end-to-end spending/benefit tracking.",
    bullets: [
      "Supported the launch of India's first Health & Wellness RuPay Prepaid Card.",
      "Developed wrapper APIs for PayU card, wallet, transaction, and service workflows to enable seamless prepaid transactions.",
      "Used tools and technologies including Postman, PostgreSQL, VS Code, Python, Bitbucket, and Jira.",
    ],
  },
  {
    title: "Notification System",
    category: "Fintech — Event-Driven In-App Notifications",
    tools:
      "FastAPI, Python, PostgreSQL, REST APIs, Template Variables, FCM, JWT",
    description:
      "Designed and developed a complete, event-driven notification system for Nife. The system supports reusable templates, secure device token storage, notification tracking, and reliable in-app delivery triggered by business events.",
    bullets: [
      "Designed and developed a complete notification system from scratch, including event catalog, notification templates, template variables, and notification tracking modules.",
      "Architected a flexible, event-driven notification framework that renders messages dynamically using template variables across multiple notification types.",
      "Implemented secure storage and management of FCM tokens mapped with customer data to enable reliable in-app notifications.",
      "Built the end-to-end workflow for in-app notifications: fetching customer FCM tokens and delivering real-time notifications triggered by system events.",
      "Ensured scalability and extensibility so new events, templates, and notification channels can be added without major code changes.",
    ],
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideCount = useMemo(() => projects.length, []);
  const trackContainerRef = useRef<HTMLDivElement | null>(null);
  const [trackContainerWidth, setTrackContainerWidth] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const el = trackContainerRef.current;
    if (!el) return;

    const update = () => setTrackContainerWidth(el.clientWidth);
    update();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => update());
      ro.observe(el);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToPrevTouch = useCallback(() => {
    if (currentIndex === 0) goToSlide(slideCount - 1);
    else goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide, slideCount]);

  const goToNextTouch = useCallback(() => {
    if (currentIndex === slideCount - 1) goToSlide(0);
    else goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide, slideCount]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div
            className="carousel-track-container"
            ref={trackContainerRef}
            onTouchStart={(e) => {
              const t = e.touches[0];
              touchStartX.current = t.clientX;
              touchStartY.current = t.clientY;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null || touchStartY.current === null) return;
              const t = e.changedTouches[0];
              const dx = t.clientX - touchStartX.current;
              const dy = t.clientY - touchStartY.current;
              touchStartX.current = null;
              touchStartY.current = null;

              // Only treat as a slide change if it's mostly horizontal
              if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
              if (dx < 0) goToNextTouch();
              else goToPrevTouch();
            }}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translate3d(${-currentIndex * trackContainerWidth}px, 0, 0)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>

                        <div className="carousel-work-description">
                          <p>{project.description}</p>
                          <ul className="carousel-work-bullets">
                            {project.bullets.map((b, bulletIndex) => (
                              <li key={bulletIndex}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
