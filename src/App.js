import { useEffect, useRef, useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
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

  const sliderPointerRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll("main section[id]"));
      const offset = window.scrollY + 140;
      const currentSection = sections.reduce((currentId, section) => {
        if (offset >= section.offsetTop) {
          return section.id;
        }

        return currentId;
      }, sections[0]?.id || "home");

      setActiveSection(currentSection);
      setIsScrolled(window.scrollY > 16);
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

  const moveToCertificate = (nextIndex) => {
    setActiveCertificate((nextIndex + CERTIFICATES.length) % CERTIFICATES.length);
  };

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
        text: "Message sent to Telegram!",
        type: "is-success",
        sending: false,
      });
    } catch (error) {
      setMessageStatus({
        text: "Failed to send. Please try again.",
        type: "is-error",
        sending: false,
      });
    }
  };

  const currentYear = new Date().getFullYear();
  const previousCertificate =
    (activeCertificate - 1 + CERTIFICATES.length) % CERTIFICATES.length;
  const nextCertificate = (activeCertificate + 1) % CERTIFICATES.length;
  const progress = (activeCertificate + 1) / CERTIFICATES.length;

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

      <main>
        <section id="home" className="hero-section">
          <Container fluid className="container-shell">
            <Row className="align-items-center g-4 g-xl-5">
              <Col lg={7}>
                <Reveal className="hero-copy">
                  <p className="eyebrow">
                    Senior full-stack engineer — Python · React · Node.js · PHP ·
                    TypeScript
                  </p>
                  <h1 className="hero-title">
                    I engineer products that perform at scale and convert.
                  </h1>
                  <p className="hero-lead">
                    I am Wai Hyn Htun — a senior full-stack engineer with 12+ years of
                    production experience across Python, PHP, Node.js, React, and
                    TypeScript. I have shipped platforms serving 2M+ users, optimized
                    performance under real traffic, and delivered pixel-perfect
                    responsive UIs that drive engagement. When your team needs someone
                    who can own the full stack from database to deploy, I deliver.
                  </p>

                  <div className="hero-actions">
                    <a className="button button-primary" href="#contact">
                      <i className="bi bi-envelope"></i>
                      <span>Start a Conversation</span>
                    </a>
                    <a className="button button-secondary" href="#work">
                      <i className="bi bi-grid-1x2"></i>
                      <span>See Selected Work</span>
                    </a>
                    <a
                      className="button button-secondary"
                      href={asset("mr-wai-hyn-htun-cv.pdf")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-file-earmark-text"></i>
                      <span>View CV</span>
                    </a>
                  </div>

                  <ul className="hero-points" aria-label="Professional highlights">
                    {HERO_POINTS.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              </Col>

              <Col lg={5}>
                <Reveal as="aside" className="hero-panel">
                  <div className="profile-card">
                    <img src={asset("profile.jpg")} alt="Portrait of Wai Hyn Htun" />
                    <div className="profile-copy">
                      <p className="panel-label">Based in Thailand</p>
                      <h2>Senior Full-Stack Engineer</h2>
                      <p>
                        Performance-obsessed, delivery-proven, and built to own every
                        layer from responsive UI to scalable backend.
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
                </Reveal>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="trust-section">
          <Container fluid className="container-shell">
            <Reveal className="section-intro">
              <p className="section-kicker">Why Me</p>
              <h2>Your next hire should reduce risk, not add it.</h2>
              <p className="section-copy">
                I bring 12+ years of shipping real products at real scale. Every
                section below is backed by production numbers, not tutorial projects.
                When you hire me, you get an engineer who has already solved the
                problems your team is about to face.
              </p>
            </Reveal>

            <Row className="section-card-row g-4">
              {TRUST_ITEMS.map((item) => (
                <Col key={item.title} lg={4}>
                  <Reveal as="article" className="trust-card h-100">
                    <i className={`bi ${item.icon}`}></i>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </Reveal>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section id="about" className="story-section">
          <Container fluid className="container-shell">
            <Row className="align-items-start g-4 g-xl-5">
              <Col lg={6}>
                <Reveal className="section-intro section-intro-left">
                  <p className="section-kicker">About</p>
                  <h2>
                    An engineer who owns the full stack and delivers under pressure.
                  </h2>
                  <p className="section-copy">
                    My 12+ years span Python backends, PHP business platforms,
                    Node.js microservices, React frontends, and TypeScript-driven
                    applications. I do not just write code — I optimize performance,
                    architect for scale, and build responsive interfaces that convert
                    visitors into users.
                  </p>
                  <p className="section-copy">
                    I am the engineer you bring in when your product needs to handle
                    more users, load faster, look sharper on every screen size, and
                    ship on time. I have done it across nonprofit, enterprise,
                    mobility, and travel industries.
                  </p>
                </Reveal>
              </Col>

              <Col lg={6}>
                <div className="story-stack">
                  {STORY_ITEMS.map((item) => (
                    <Reveal key={item.title} as="article" className="story-card">
                      <p className="panel-label">{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </Reveal>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section id="work" className="work-section">
          <Container fluid className="container-shell">
            <Reveal className="section-intro">
              <p className="section-kicker">Selected Work</p>
              <h2>
                Products with real users, real traffic, and real business outcomes.
              </h2>
            </Reveal>

            <Row className="section-card-row g-4">
              {WORK_ITEMS.map((item) => (
                <Col key={item.title} xs={12} lg={item.featured ? 12 : 6}>
                  <Reveal
                    as="article"
                    className={`work-card h-100${item.featured ? " work-card-featured" : ""}`}
                  >
                    <div className="work-header">
                      <p className="work-tag">{item.tag}</p>
                      <h3>{item.title}</h3>
                    </div>
                    <p className="work-body">{item.body}</p>
                    <ul className="work-list">
                      {item.list.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {item.impact ? <p className="impact-note">{item.impact}</p> : null}
                  </Reveal>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section id="experience" className="experience-section">
          <Container fluid className="container-shell">
            <Reveal className="section-intro">
              <p className="section-kicker">Experience</p>
              <h2>12+ years of shipping. Not concepts — production.</h2>
            </Reveal>

            <div className="timeline">
              {EXPERIENCES.map((experience) => (
                <Reveal key={experience.company} as="article" className="timeline-card">
                  <div className="timeline-meta">
                    <p className="timeline-period">{experience.period}</p>
                    <p className="timeline-role">{experience.role}</p>
                  </div>
                  <h3>{experience.company}</h3>
                  <p>{experience.copy}</p>
                  <div className="timeline-tags">
                    {experience.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="skills" className="capabilities-section">
          <Container fluid className="container-shell">
            <Reveal className="section-intro">
              <p className="section-kicker">Capabilities</p>
              <h2>
                Five core strengths. One engineer who delivers across all of them.
              </h2>
            </Reveal>

            <Row className="section-card-row g-4">
              {CAPABILITIES.map((capability) => (
                <Col key={capability.title} xs={12} md={6} xl={4}>
                  <Reveal as="article" className="capability-card h-100">
                    <i className={`bi ${capability.icon}`}></i>
                    <h3>{capability.title}</h3>
                    <p>{capability.copy}</p>
                    <div className="capability-tags">
                      {capability.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </Reveal>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section id="projects" className="projects-section">
          <Container fluid className="container-shell">
            <Reveal className="section-intro">
              <p className="section-kicker">My Projects</p>
              <h2>Mobile product demos presented at real phone scale.</h2>
              <p className="section-copy">
                Three touch-first builds shown inside phone frames so the layout,
                spacing, and interaction feel closer to the actual mobile product.
                Open any app directly to review the full experience.
              </p>
            </Reveal>

            <div className="project-showcase">
              {PROJECTS.map((project) => (
                <Reveal key={project.title} as="article" className="project-app-card">
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

                  <div className="project-info-card project-info-card-split">
                    <div className="project-info-head">
                      <i className={`bi ${project.icon}`}></i>
                      <p className="panel-label">{project.label}</p>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.copy}</p>
                    <ul className="project-info-list">
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
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="certificates" className="certificates-section">
          <Container fluid className="container-shell">
            <Reveal className="section-intro">
              <p className="section-kicker">Certificates</p>
              <h2>
                Training records and academic documents that shaped my foundation.
              </h2>
              <p className="section-copy">
                This gallery includes technical course certificates, formal
                academic records, and early credentials that reflect the path
                behind my current engineering work.
              </p>
            </Reveal>

            <Reveal className="certificate-slider">
              <div className="certificate-slider-top">
                <div className="certificate-slider-heading" role="status" aria-live="polite">
                  <p className="panel-label">Curated Archive</p>
                  <h3 className="certificate-slider-title">
                    Verified learning milestones and academic records.
                  </h3>
                  <p className="certificate-slider-summary">
                    Browse the archive like a focused document carousel. Open any
                    record in full size when you need the original scan.
                  </p>
                  <p className="certificate-slider-index">
                    <span>{String(activeCertificate + 1).padStart(2, "0")}</span>
                    <span className="certificate-slider-divider" aria-hidden="true"></span>
                    <span>{String(CERTIFICATES.length).padStart(2, "0")}</span>
                  </p>
                </div>

                <div className="certificate-slider-actions" aria-label="Certificate navigation">
                  <button
                    className="slider-button"
                    type="button"
                    onClick={() => moveToCertificate(activeCertificate - 1)}
                    aria-label="Show previous certificate"
                  >
                    <i className="bi bi-arrow-left"></i>
                  </button>
                  <button
                    className="slider-button"
                    type="button"
                    onClick={() => moveToCertificate(activeCertificate + 1)}
                    aria-label="Show next certificate"
                  >
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div
                className="certificate-slider-stage"
                tabIndex="0"
                aria-label="Certificate showcase"
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    moveToCertificate(activeCertificate - 1);
                  }

                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    moveToCertificate(activeCertificate + 1);
                  }
                }}
                onPointerDown={(event) => {
                  sliderPointerRef.current = {
                    active: true,
                    startX: event.clientX,
                    startY: event.clientY,
                  };
                }}
                onPointerUp={(event) => {
                  const pointer = sliderPointerRef.current;

                  if (!pointer.active) {
                    return;
                  }

                  sliderPointerRef.current.active = false;
                  const deltaX = event.clientX - pointer.startX;
                  const deltaY = event.clientY - pointer.startY;

                  if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 48) {
                    return;
                  }

                  moveToCertificate(activeCertificate + (deltaX > 0 ? -1 : 1));
                }}
                onPointerCancel={() => {
                  sliderPointerRef.current.active = false;
                }}
                onPointerLeave={() => {
                  sliderPointerRef.current.active = false;
                }}
              >
                {CERTIFICATES.map((certificate, index) => {
                  const slideClassName = [
                    "certificate-slide",
                    index === activeCertificate ? "is-active" : "",
                    index === previousCertificate ? "is-prev" : "",
                    index === nextCertificate ? "is-next" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <article
                      key={certificate.title}
                      className={slideClassName}
                      aria-hidden={index === activeCertificate ? "false" : "true"}
                      onClick={() => {
                        if (index !== activeCertificate) {
                          moveToCertificate(index);
                        }
                      }}
                    >
                      <div className="certificate-slide-shell">
                        <a
                          className="certificate-slide-media"
                          href={asset(certificate.image)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={certificate.aria}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <img
                            src={asset(certificate.image)}
                            alt={certificate.alt}
                            loading="lazy"
                          />
                        </a>
                        <div className="certificate-slide-copy">
                          <div className="certificate-slide-meta">
                            <p className="certificate-type">{certificate.type}</p>
                            <h3>{certificate.title}</h3>
                            <p>{certificate.copy}</p>
                          </div>
                          <div className="certificate-slide-actions">
                            <a
                              className="button button-secondary certificate-slide-link"
                              href={asset(certificate.image)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <span>Open Record</span>
                              <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                            {index === activeCertificate ? (
                              <p className="certificate-slide-note">
                                Swipe, use arrows, or tap the side cards.
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="certificate-slider-bottom">
                <div className="certificate-slider-progress" aria-hidden="true">
                  <span style={{ transform: `scaleX(${progress})` }}></span>
                </div>
                <div className="certificate-slider-dots" role="tablist" aria-label="Select certificate">
                  {CERTIFICATES.map((certificate, index) => (
                    <button
                      key={certificate.title}
                      type="button"
                      className={`slider-dot${index === activeCertificate ? " is-active" : ""}`}
                      role="tab"
                      aria-label={`Show certificate ${index + 1}`}
                      aria-selected={index === activeCertificate}
                      tabIndex={index === activeCertificate ? 0 : -1}
                      onClick={() => moveToCertificate(index)}
                    ></button>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="showcase" className="showcase-section">
          <Container fluid className="container-shell">
            <Reveal className="section-intro">
              <p className="section-kicker">Live Products</p>
              <h2>Production platforms I helped build and ship.</h2>
              <p className="section-copy">
                Real products running in production — explored in device previews
                that match how each product is actually used.
              </p>
            </Reveal>

            <div className="showcase-grid">
              {SHOWCASES.map((showcase) => (
                <Reveal key={showcase.title} as="article" className="showcase-item">
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
                      <p className="showcase-device-note">{showcase.note}</p>
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

                  <div className="showcase-info">
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
                </Reveal>
              ))}
            </div>

            <Reveal className="showcase-confidential">
              <div className="showcase-confidential-icon">
                <i className="bi bi-shield-lock"></i>
              </div>
              <div className="showcase-confidential-copy">
                <h3>In-House Enterprise Software</h3>
                <p>
                  Beyond public-facing products, I have extensive experience
                  building internal enterprise systems — including inventory
                  management dashboards, stock management platforms, KPI tracking
                  tools, and HR management software. These projects remain
                  confidential under NDA, but the engineering depth they demanded
                  is reflected across every system I ship.
                </p>
                <div className="showcase-confidential-tags">
                  {CONFIDENTIAL_TAGS.map((tag) => (
                    <span key={tag.label}>
                      <i className={`bi ${tag.icon}`}></i> {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="contact" className="contact-section">
          <Container fluid className="container-shell">
            <Row className="align-items-start g-4 g-xl-5">
              <Col lg={7}>
                <Reveal className="contact-copy">
                  <p className="section-kicker">Contact</p>
                  <h2>
                    If you need someone who can ship across web, mobile, and backend,
                    let&apos;s talk.
                  </h2>
                  <p className="section-copy">
                    I am open to product engineering roles, freelance work, and
                    collaborations where strong delivery and clear thinking matter.
                  </p>
                  <div className="contact-actions">
                    <a className="button button-primary" href="mailto:waihynhtun90s@gmail.com">
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
                      href="https://t.me/kamkyi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-telegram"></i>
                      <span>Telegram Me</span>
                    </a>
                  </div>

                  <form className="contact-message-form" onSubmit={handleQuickMessageSubmit}>
                    <label className="panel-label" htmlFor="quick-message-name">
                      Send me a message via Telegram
                    </label>
                    <input
                      className="contact-message-name"
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
                      className="contact-message-input"
                      id="quick-message-input"
                      name="quick-message"
                      rows="4"
                      required
                      maxLength="1200"
                      placeholder="Share your role, project scope, timeline, and expected outcomes."
                      value={quickMessage.message}
                      onChange={(event) =>
                        setQuickMessage((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                    ></textarea>
                    <div className="contact-message-footer">
                      <button
                        className="button button-primary contact-message-send"
                        type="submit"
                        disabled={messageStatus.sending}
                      >
                        <i className="bi bi-telegram"></i>
                        <span>Send to Telegram</span>
                      </button>
                      <p className={`contact-message-status ${messageStatus.type}`.trim()}>
                        {messageStatus.text}
                      </p>
                    </div>
                  </form>
                </Reveal>
              </Col>

              <Col lg={5}>
                <div className="contact-panel">
                  {CONTACT_CARDS.map((card) => (
                    <Reveal key={card.label} className="contact-card">
                      <p className="panel-label">{card.label}</p>
                      {card.lines
                        ? card.lines.map((line) => (
                            <a
                              key={line.text}
                              href={line.href}
                              target={line.external ? "_blank" : undefined}
                              rel={line.external ? "noopener noreferrer" : undefined}
                            >
                              {line.text}
                            </a>
                          ))
                        : <p>{card.text}</p>}
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
          <p>
            Senior Full-Stack Engineer — Python · React · Node.js · PHP ·
            TypeScript
          </p>
        </Container>
      </footer>
    </>
  );
}

export default App;
