import { useEffect, useRef, useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  CAPABILITIES,
  CERTIFICATES,
  CONFIDENTIAL_TAGS,
  CONTACT_CARDS,
  EXPERIENCES,
  HERO_POINTS,
  METRICS,
  NAV_ITEMS,
  PROJECTS,
  SHOWCASES,
  STORY_ITEMS,
  TRUST_ITEMS,
  WORK_ITEMS,
} from "./portfolioData";

const TELEGRAM_ENDPOINT = "https://portfolio.waihynhtun1994.workers.dev";
const SLIDER_MODULES = [A11y, Keyboard, Navigation, Pagination];

const asset = (path) => `${process.env.PUBLIC_URL}/${path}`;

function Reveal({ as: Tag = "div", className = "", children, ...props }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          setIsVisible(true);
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", isVisible ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
}

function App() {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [quickMessage, setQuickMessage] = useState({
    name: "",
    message: "",
  });
  const [messageStatus, setMessageStatus] = useState({
    text: "",
    type: "",
    sending: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(
        document.querySelectorAll("main section[id]"),
      );
      const offset = window.scrollY + 160;
      const currentSection = sections.reduce((currentId, section) => {
        if (offset >= section.offsetTop) {
          return section.id;
        }

        return currentId;
      }, sections[0]?.id || "home");

      setActiveSection(currentSection);
      setIsScrolled(window.scrollY > 12);
    };

    const handleResize = () => {
      if (window.innerWidth > 991) {
        setExpanded(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", expanded);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [expanded]);

  const handleQuickMessageSubmit = async (event) => {
    event.preventDefault();

    const name = quickMessage.name.trim();
    const message = quickMessage.message.trim();

    if (!name || !message || messageStatus.sending) {
      return;
    }

    setMessageStatus({
      text: "Sending...",
      type: "",
      sending: true,
    });

    try {
      const response = await fetch(TELEGRAM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setQuickMessage({
        name: "",
        message: "",
      });
      setMessageStatus({
        text: "Message sent.",
        type: "is-success",
        sending: false,
      });
    } catch (error) {
      setMessageStatus({
        text: "Failed to send. Please email me directly.",
        type: "is-error",
        sending: false,
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
        <Container fluid className="container-shell">
          <Navbar
            expand="lg"
            expanded={expanded}
            className="site-nav"
            onToggle={(nextExpanded) => setExpanded(nextExpanded)}
          >
            <Navbar.Brand className="brand-mark" href="#home">
              <span className="brand-dot" aria-hidden="true"></span>
              <span className="brand-name">
                <span className="brand-name-main">Wai Hyn</span>
                <span className="brand-name-accent">Htun</span>
              </span>
            </Navbar.Brand>

            <Navbar.Toggle
              aria-controls="nav-panel"
              aria-label="Open navigation"
              className="nav-toggle"
            >
              <span></span>
              <span></span>
            </Navbar.Toggle>

            <Navbar.Collapse id="nav-panel" className="nav-panel">
              <Nav className="ms-auto nav-links">
                {NAV_ITEMS.map((item) => (
                  <Nav.Link
                    key={item.id}
                    href={`#${item.id}`}
                    className={[
                      "nav-link",
                      item.accent ? "nav-link-accent" : "",
                      activeSection === item.id ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setExpanded(false)}
                  >
                    {item.label}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>

      <main className="site-main">
        <section id="home" className="hero-section">
          <Container fluid className="container-shell">
            <Row className="hero-row align-items-end g-4 g-xl-5">
              <Col lg={7}>
                <Reveal className="hero-copy">
                  <p className="eyebrow">
                    Lead Full-Stack Engineer · Python/Django · React · 12+ years
                  </p>
                  <h1 className="hero-title">
                    Lead-level full-stack execution for scalable product systems.
                  </h1>
                  <p className="hero-lead">
                    I am Wai Hyn Htun, a lead-level full-stack engineer with
                    12+ years of experience across Python/Django, React,
                    Node.js, and PHP. I build scalable product systems, support
                    high-availability workflows, and stay hands-on from
                    technical direction through production delivery.
                  </p>

                  <div className="hero-signal-grid" aria-label="Profile summary">
                    <div>
                      <span>Current focus</span>
                      <strong>Lead full-stack roles</strong>
                    </div>
                    <div>
                      <span>Core stack</span>
                      <strong>Python/Django + React</strong>
                    </div>
                    <div>
                      <span>Availability</span>
                      <strong>Bangkok / ICT</strong>
                    </div>
                  </div>

                  <div className="hero-actions">
                    <a className="button button-primary" href="#contact">
                      <i className="bi bi-envelope"></i>
                      <span>Discuss a Role</span>
                    </a>
                    <a className="button button-secondary" href="#work">
                      <i className="bi bi-grid-1x2"></i>
                      <span>Review Work</span>
                    </a>
                    <a
                      className="button button-secondary"
                      href={asset("wai-hyn-htun-resume.docx")}
                      download="wai-hyn-htun-resume.docx"
                    >
                      <i className="bi bi-download"></i>
                      <span>Download Resume</span>
                    </a>
                  </div>

                  <div className="hero-credentials">
                    <article className="hero-credential">
                      <p className="panel-label">Role focus</p>
                      <p>
                        Technical Lead and senior full-stack roles where
                        architecture, delivery ownership, and implementation
                        quality matter.
                      </p>
                    </article>
                    <article className="hero-credential">
                      <p className="panel-label">Current base</p>
                      <p>
                        Based in Bangkok, Thailand and available for weekday
                        interviews after 6 PM ICT, with weekend availability by
                        arrangement.
                      </p>
                    </article>
                  </div>
                </Reveal>
              </Col>

              <Col lg={5}>
                <Reveal as="aside" className="hero-panel">
                  <div className="profile-card">
                    <img
                      src={asset("profile.jpg")}
                      alt="Portrait of Wai Hyn Htun"
                    />
                    <div className="profile-copy">
                      <p className="panel-label">Based in Bangkok, Thailand</p>
                      <h2>Wai Hyn Htun</h2>
                      <p>
                        Lead-level engineer trusted across social impact,
                        enterprise mobility, and high-traffic platform systems.
                      </p>
                    </div>
                  </div>

                  <div className="metric-grid">
                    {METRICS.map((metric) => (
                      <article key={metric.value} className="metric-card">
                        <span className="metric-value">{metric.value}</span>
                        <p className="metric-copy">{metric.copy}</p>
                      </article>
                    ))}
                  </div>

                  <div className="hero-panel-foot">
                    <p className="panel-label">Selected proof points</p>
                    <ul
                      className="hero-points"
                      aria-label="Professional highlights"
                    >
                      {HERO_POINTS.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="trust-section">
          <Container fluid className="container-shell">
            <Reveal className="section-header">
              <p className="section-kicker">Lead-Level Fit</p>
              <h2>Hands-on leadership across architecture, delivery, and scale.</h2>
              <p className="section-copy">
                I work best in lead full-stack roles where teams need strong
                implementation judgment, clear technical communication, and
                reliable delivery in production.
              </p>
            </Reveal>

            <Reveal className="section-card-grid section-card-grid-3">
              {TRUST_ITEMS.map((item) => (
                <article key={item.title} className="value-card">
                  <span className="card-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </Reveal>
          </Container>
        </section>

        <section id="about" className="about-section">
          <Container fluid className="container-shell">
            <Row className="g-4 g-xl-5 align-items-start">
              <Col lg={5}>
                <Reveal className="section-header section-header-left">
                  <p className="section-kicker">About</p>
                  <h2>Built for teams that need a technical lead who still ships.</h2>
                  <p className="section-copy">
                    I work best with teams that need one senior engineer to
                    bridge frontend delivery, backend systems, and technical
                    decision-making without losing execution pace.
                  </p>
                </Reveal>

                <Reveal className="about-panel">
                  <p className="panel-label">Working style</p>
                  <ul className="detail-list">
                    <li>
                      Clear communication with recruiters, managers, and product
                      stakeholders.
                    </li>
                    <li>
                      Practical architecture choices that keep delivery moving.
                    </li>
                    <li>
                      Hands-on implementation quality without unnecessary
                      complexity.
                    </li>
                  </ul>
                </Reveal>
              </Col>

              <Col lg={7}>
                <Reveal className="story-grid">
                  {STORY_ITEMS.map((item) => (
                    <article key={item.title} className="story-card">
                      <p className="panel-label">{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </article>
                  ))}
                </Reveal>
              </Col>
            </Row>
          </Container>
        </section>

        <section id="work" className="work-section">
          <Container fluid className="container-shell">
            <Reveal className="section-header section-header-dark">
              <p className="section-kicker">Selected Work</p>
              <h2>Production systems that back the profile.</h2>
              <p className="section-copy">
                The profile is backed by production engineering responsibility,
                real users, and delivery in environments where reliability and
                scale matter.
              </p>
            </Reveal>

            <Reveal className="work-grid">
              {WORK_ITEMS.map((item) => (
                <article
                  key={item.title}
                  className={`case-study${item.featured ? " is-featured" : ""}`}
                >
                  <div className="case-study-head">
                    <div>
                      <p className="work-tag">{item.tag}</p>
                      <h3>{item.title}</h3>
                    </div>
                    {item.impact ? <p className="impact-pill">{item.impact}</p> : null}
                  </div>
                  <p className="case-study-body">{item.body}</p>
                  <ul className="detail-list">
                    {item.list.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </Reveal>
          </Container>
        </section>

        <section id="experience" className="experience-section">
          <Container fluid className="container-shell">
            <Reveal className="section-header">
              <p className="section-kicker">Experience</p>
              <h2>Lead-level delivery across multiple production environments.</h2>
            </Reveal>

            <Reveal className="section-card-grid section-card-grid-2">
              {EXPERIENCES.map((experience) => (
                <article key={experience.company} className="timeline-card">
                  <div className="timeline-meta">
                    <p className="timeline-period">{experience.period}</p>
                    <p className="timeline-role">{experience.role}</p>
                  </div>
                  <h3>{experience.company}</h3>
                  <p>{experience.copy}</p>
                  <div className="tag-row">
                    {experience.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </Reveal>
          </Container>
        </section>

        <section id="skills" className="capabilities-section">
          <Container fluid className="container-shell">
            <Reveal className="section-header">
              <p className="section-kicker">Core Strengths</p>
              <h2>The areas I bring to lead full-stack delivery.</h2>
            </Reveal>

            <Reveal className="section-card-grid section-card-grid-3">
              {CAPABILITIES.map((capability) => (
                <article key={capability.title} className="capability-card">
                  <span className="card-icon">
                    <i className={`bi ${capability.icon}`}></i>
                  </span>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                  <div className="tag-row">
                    {capability.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </Reveal>
          </Container>
        </section>

        <section id="projects" className="projects-section">
          <Container fluid className="container-shell">
            <Reveal className="section-header section-header-dark">
              <p className="section-kicker">Product Demos</p>
              <h2>Supplementary demos that show product thinking and mobile execution.</h2>
              <p className="section-copy">
                These examples support the broader profile. They are presented
                one at a time so the interaction work stays readable on both
                desktop and mobile.
              </p>
            </Reveal>

            <Reveal>
              <Swiper
                className="section-swiper section-swiper-detail"
                modules={SLIDER_MODULES}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                grabCursor
                spaceBetween={21}
                slidesPerView={1}
              >
                {PROJECTS.map((project) => (
                  <SwiperSlide key={project.title}>
                    <article className="project-card project-card-single">
                      <div className="device-stage">
                        <div className="iphone-frame iphone-frame-project">
                          <div className="iphone-notch">
                            <div className="iphone-dynamic-island"></div>
                          </div>
                          <div className="iphone-screen">
                            <iframe
                              src={project.frameUrl}
                              title={project.frameTitle}
                              loading="lazy"
                              allow="accelerometer; gyroscope"
                              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            ></iframe>
                          </div>
                          <div className="iphone-home-bar"></div>
                          <div className="iphone-button iphone-button-power"></div>
                          <div className="iphone-button iphone-button-vol-up"></div>
                          <div className="iphone-button iphone-button-vol-down"></div>
                        </div>
                      </div>

                      <div className="project-copy">
                        <div className="project-head">
                          <span className="card-icon">
                            <i className={`bi ${project.icon}`}></i>
                          </span>
                          <p className="panel-label">{project.label}</p>
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.copy}</p>
                        <ul className="detail-list">
                          {project.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                        <a
                          className="button button-primary"
                          href={project.frameUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                          <span>{project.cta}</span>
                        </a>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          </Container>
        </section>

        <section id="certificates" className="certificates-section">
          <Container fluid className="container-shell">
            <Reveal className="certificates-shell">
              <div className="certificates-top">
                <div className="section-header section-header-left section-header-tight">
                  <p className="section-kicker">Certificates</p>
                  <h2>Verified training records and academic documents.</h2>
                  <p className="section-copy">
                    The archive is presented as a proper slider for quick
                    review. Open any record in full size when you need the
                    original scan.
                  </p>
                </div>

                <div
                  className="certificate-counter"
                  role="status"
                  aria-live="polite"
                >
                  <span>{String(activeCertificate + 1).padStart(2, "0")}</span>
                  <span className="certificate-counter-divider"></span>
                  <span>{String(CERTIFICATES.length).padStart(2, "0")}</span>
                </div>
              </div>

              <Swiper
                className="certificate-swiper"
                modules={[A11y, Keyboard, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                spaceBetween={21}
                slidesPerView={1}
                onSlideChange={(swiper) =>
                  setActiveCertificate(swiper.activeIndex)
                }
              >
                {CERTIFICATES.map((certificate) => (
                  <SwiperSlide key={certificate.title}>
                    <article className="certificate-slide">
                      <a
                        className="certificate-media"
                        href={asset(certificate.image)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={certificate.aria}
                      >
                        <img
                          src={asset(certificate.image)}
                          alt={certificate.alt}
                          loading="lazy"
                        />
                      </a>
                      <div className="certificate-copy">
                        <div>
                          <p className="panel-label">{certificate.type}</p>
                          <h3>{certificate.title}</h3>
                          <p>{certificate.copy}</p>
                        </div>
                        <a
                          className="button button-secondary"
                          href={asset(certificate.image)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Open Record</span>
                          <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          </Container>
        </section>

        <section id="showcase" className="showcase-section">
          <Container fluid className="container-shell">
            <Reveal className="section-header">
              <p className="section-kicker">Live Products</p>
              <h2>Live product examples with real delivery context.</h2>
              <p className="section-copy">
                The live examples stay one at a time so each product remains
                readable, responsive, and easy to review across screen sizes.
              </p>
            </Reveal>

            <Reveal>
              <Swiper
                className="section-swiper section-swiper-detail"
                modules={SLIDER_MODULES}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                grabCursor
                spaceBetween={21}
                slidesPerView={1}
              >
                {SHOWCASES.map((showcase) => (
                  <SwiperSlide key={showcase.title}>
                    <article className="showcase-card showcase-card-single">
                      <div className="showcase-device">
                        {showcase.type === "mobile" ? (
                          <div className="showcase-mobile-wrap">
                            <div className="iphone-frame iphone-frame-showcase">
                              <div className="iphone-notch">
                                <div className="iphone-dynamic-island"></div>
                              </div>
                              <div className="iphone-screen">
                                <iframe
                                  src={showcase.frameUrl}
                                  title={showcase.frameTitle}
                                  loading="lazy"
                                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                ></iframe>
                              </div>
                              <div className="iphone-home-bar"></div>
                              <div className="iphone-button iphone-button-power"></div>
                              <div className="iphone-button iphone-button-vol-up"></div>
                              <div className="iphone-button iphone-button-vol-down"></div>
                            </div>
                            <p className="device-caption">{showcase.note}</p>
                          </div>
                        ) : (
                          <div className="macbook-frame">
                            <div className="macbook-lid">
                              <div className="macbook-bezel">
                                <div className="macbook-camera"></div>
                                <div className="macbook-viewport">
                                  <iframe
                                    src={showcase.frameUrl}
                                    title={showcase.frameTitle}
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                  ></iframe>
                                </div>
                              </div>
                            </div>
                            <div className="macbook-base">
                              <div className="macbook-notch"></div>
                            </div>
                            <div className="macbook-bottom"></div>
                          </div>
                        )}
                      </div>

                      <div className="showcase-copy">
                        <p className="panel-label">{showcase.label}</p>
                        <h3>{showcase.title}</h3>
                        <p>{showcase.copy}</p>
                        <a
                          className="button button-primary"
                          href={showcase.frameUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                          <span>{showcase.cta}</span>
                        </a>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>

            <Reveal className="confidential-panel">
              <div className="confidential-mark">
                <i className="bi bi-shield-lock"></i>
              </div>
              <div>
                <p className="panel-label">Additional enterprise work</p>
                <h3>Internal software shipped under NDA.</h3>
                <p>
                  I have also built internal platforms for inventory management,
                  stock control, KPI reporting, HR workflows, and operational
                  dashboards. The product details are confidential, but the
                  engineering responsibilities were substantial.
                </p>
                <div className="tag-row">
                  {CONFIDENTIAL_TAGS.map((tag) => (
                    <span key={tag.label}>
                      <i className={`bi ${tag.icon}`}></i>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="contact" className="contact-section">
          <Container fluid className="container-shell">
            <Row className="g-4 g-xl-5 align-items-start">
              <Col lg={7}>
                <Reveal className="section-header section-header-left section-header-tight">
                  <p className="section-kicker">Contact</p>
                  <h2>
                    Open to lead-level full-stack opportunities where technical
                    depth and delivery ownership matter.
                  </h2>
                  <p className="section-copy">
                    If the role needs Python/Django, React, enterprise-grade
                    systems thinking, and calm hands-on leadership, I am open to
                    discussing the scope.
                  </p>
                </Reveal>

                <Reveal className="contact-actions">
                  <a
                    className="button button-primary"
                    href="mailto:waihynhtun90s@gmail.com"
                  >
                    <i className="bi bi-envelope"></i>
                    <span>Email Me</span>
                  </a>
                  <a
                    className="button button-secondary"
                    href={asset("wai-hyn-htun-resume.docx")}
                    download="wai-hyn-htun-resume.docx"
                  >
                    <i className="bi bi-download"></i>
                    <span>Download Resume</span>
                  </a>
                  <a
                    className="button button-secondary"
                    href="https://linkedin.com/in/wai-hyn-htun-67180b115/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-linkedin"></i>
                    <span>View LinkedIn</span>
                  </a>
                </Reveal>

                <Reveal
                  as="form"
                  className="contact-form"
                  onSubmit={handleQuickMessageSubmit}
                >
                  <label className="panel-label" htmlFor="quick-message-name">
                    Send a direct message
                  </label>
                  <input
                    id="quick-message-name"
                    name="name"
                    type="text"
                    required
                    maxLength="100"
                    placeholder="Your name"
                    value={quickMessage.name}
                    onChange={(event) =>
                      setQuickMessage((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                  />
                  <textarea
                    id="quick-message-input"
                    name="quick-message"
                    rows="4"
                    required
                    maxLength="1200"
                    placeholder="Share the role, team scope, and preferred timeline."
                    value={quickMessage.message}
                    onChange={(event) =>
                      setQuickMessage((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                  ></textarea>
                  <div className="contact-form-footer">
                    <button
                      className="button button-primary"
                      type="submit"
                      disabled={messageStatus.sending}
                    >
                      <i className="bi bi-send"></i>
                      <span>Send Message</span>
                    </button>
                    <p
                      className={`contact-message-status ${messageStatus.type}`.trim()}
                    >
                      {messageStatus.text}
                    </p>
                  </div>
                </Reveal>
              </Col>

              <Col lg={5}>
                <div className="contact-panel">
                  {CONTACT_CARDS.map((card) => (
                    <Reveal key={card.label} className="contact-card">
                      <p className="panel-label">{card.label}</p>
                      {card.lines ? (
                        <div className="contact-card-links">
                          {card.lines.map((line) => (
                            <a
                              key={line.text}
                              href={line.href}
                              target={line.external ? "_blank" : undefined}
                              rel={
                                line.external ? "noopener noreferrer" : undefined
                              }
                            >
                              {line.text}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="contact-card-text">{card.text}</p>
                      )}
                    </Reveal>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <footer className="site-footer">
        <Container fluid className="container-shell footer-shell">
          <p>&copy; {currentYear} Wai Hyn Htun</p>
          <p>Lead Full-Stack Engineer · Python/Django · React · Scalable Systems</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
