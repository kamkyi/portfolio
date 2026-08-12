import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ARCHIVED_RESUMES,
  CERTIFICATES,
  CONFIDENTIAL_TAGS,
  CONTACT_CARDS,
  CORE_STACK,
  EXPERIENCES,
  HERO_POINTS,
  HERO_STACK,
  HIRING_SNAPSHOT,
  METRICS,
  NAV_ITEMS,
  PROFILE,
  RESUMES,
  SHOWCASES,
  SKILL_GROUPS,
  TRUST_ITEMS,
  WORK_ITEMS,
} from "./portfolioData";

const TELEGRAM_ENDPOINT = "https://portfolio.waihynhtun1994.workers.dev";

/* GitHub Pages serves the app from /portfolio, so every static asset goes through PUBLIC_URL. */
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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

/* Google's four-color "G". Brand guidelines require the mark to keep its own
   colors on a light field, so it always renders on a white disc instead of
   inheriting the surrounding tint the way an icon-font glyph would. */
function GoogleMark({ className = "" }) {
  return (
    <span className={`google-mark ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          fill="#4285F4"
          d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
        />
      </svg>
    </span>
  );
}

function SectionHeading({ index, kicker, title, copy, align = "center" }) {
  return (
    <Reveal className={`section-heading is-${align}`}>
      <p className="section-kicker">
        {index ? <span className="section-index">{index}</span> : null}
        {kicker}
      </p>
      <h2>{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </Reveal>
  );
}

function CertificateCard({ certificate, onOpen }) {
  const isFeatured = Boolean(certificate.featured);

  return (
    <article className={`cert-card${isFeatured ? " is-featured" : ""}`}>
      <button
        type="button"
        className="cert-thumb"
        onClick={() => onOpen(certificate)}
        aria-label={certificate.aria}
      >
        <img src={asset(certificate.image)} alt={certificate.alt} loading="lazy" />
        <span className="cert-thumb-hint">
          <i className="bi bi-arrows-fullscreen" aria-hidden="true"></i>
          View full size
        </span>
      </button>

      <div className="cert-body">
        <div className="cert-meta">
          <span className={`cert-issuer${isFeatured ? " is-google" : ""}`}>
            {isFeatured ? <GoogleMark className="is-sm" /> : null}
            {certificate.issuer}
          </span>
          <span className="cert-type">
            {certificate.type}
            {certificate.date ? ` · ${certificate.date}` : ""}
          </span>
        </div>

        <h3>{certificate.title}</h3>
        <p>{certificate.copy}</p>

        {certificate.skills ? (
          <div className="chip-row">
            {certificate.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        ) : null}

        <div className="cert-actions">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => onOpen(certificate)}
          >
            <i className="bi bi-eye" aria-hidden="true"></i>
            <span>Preview</span>
          </button>

          {certificate.credentialUrl ? (
            <a
              className="btn btn-primary btn-sm"
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-patch-check" aria-hidden="true"></i>
              <span>Verify credential</span>
            </a>
          ) : null}

          {certificate.file ? (
            <a
              className="btn btn-ghost btn-sm"
              href={asset(certificate.file)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-filetype-pdf" aria-hidden="true"></i>
              <span>PDF</span>
            </a>
          ) : null}
        </div>

        {certificate.credentialId ? (
          <p className="cert-credential">
            Credential ID <strong>{certificate.credentialId}</strong>
            {certificate.date ? ` · Issued ${certificate.date}` : ""}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function App() {
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [activeShowcase, setActiveShowcase] = useState(SHOWCASES[0].id);
  const [quickMessage, setQuickMessage] = useState({ name: "", message: "" });
  const [messageStatus, setMessageStatus] = useState({
    text: "",
    type: "",
    sending: false,
  });

  const primaryResume = useMemo(
    () => RESUMES.find((resume) => resume.primary),
    [],
  );
  const featuredCertificate = useMemo(
    () => CERTIFICATES.find((certificate) => certificate.featured),
    [],
  );
  const otherCertificates = useMemo(
    () => CERTIFICATES.filter((certificate) => !certificate.featured),
    [],
  );
  const showcase = useMemo(
    () => SHOWCASES.find((item) => item.id === activeShowcase) || SHOWCASES[0],
    [activeShowcase],
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll("main section[id]"));
      const offset = window.scrollY + 180;
      const currentSection = sections.reduce(
        (currentId, section) =>
          offset >= section.offsetTop ? section.id : currentId,
        sections[0]?.id || "home",
      );

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      setActiveSection(currentSection);
      setIsScrolled(window.scrollY > 12);
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 1100px)").matches) {
      return;
    }

    const activeLink = navRef.current?.querySelector(
      `[data-nav-id="${activeSection}"]`,
    );

    activeLink?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", Boolean(lightbox));

    return () => document.body.classList.remove("is-locked");
  }, [lightbox]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) {
      return undefined;
    }

    const handleKey = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, closeLightbox]);

  const handleQuickMessageSubmit = async (event) => {
    event.preventDefault();

    const name = quickMessage.name.trim();
    const message = quickMessage.message.trim();

    if (!name || !message || messageStatus.sending) {
      return;
    }

    setMessageStatus({ text: "Sending...", type: "", sending: true });

    try {
      const response = await fetch(TELEGRAM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setQuickMessage({ name: "", message: "" });
      setMessageStatus({
        text: "Message sent. I will reply by email shortly.",
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
    <div className="app-shell">
      <a className="skip-link" href="#snapshot">
        Skip to hiring snapshot
      </a>

      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
        <div className="scroll-progress" style={{ width: `${progress}%` }} />

        <div className="shell header-inner">
          <a className="brand" href="#home">
            <span className="brand-badge">WH</span>
            <span className="brand-text">
              <strong>{PROFILE.name}</strong>
              <span>{PROFILE.role}</span>
            </span>
          </a>

          <nav
            ref={navRef}
            id="primary-nav"
            className="primary-nav"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                data-nav-id={item.id}
                href={`#${item.id}`}
                className={[
                  "nav-link",
                  item.accent ? "is-accent" : "",
                  activeSection === item.id ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="btn btn-primary btn-sm nav-cta"
            href={asset(primaryResume.file)}
            download={primaryResume.downloadName}
          >
            <i className="bi bi-download" aria-hidden="true"></i>
            <span>Resume</span>
          </a>
        </div>
      </header>

      <main className="site-main">
        {/* ---------------- HERO ---------------- */}
        <section id="home" className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid-lines" aria-hidden="true" />

          <div className="shell hero-inner">
            <Reveal className="hero-copy">
              <p className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                Open to technical lead and senior full-stack roles
              </p>

              <h1 className="hero-title">
                I build <span className="hl-python">Python</span> platforms that{" "}
                <span className="hl-count">50,000+</span> people rely on.
              </h1>

              <p className="hero-lead">
                Technical lead and hands-on full-stack developer with 12+ years
                delivering internal platforms, secure APIs, workflow automation,
                and high-traffic products.
              </p>

              <p className="hero-sub">
                Python/Django and React/TypeScript are my core stack. I take work
                from requirements and system design through testing, release,
                documentation, and production support.
              </p>

              <div className="hero-stack" aria-label="Primary technologies">
                {HERO_STACK.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href={asset(primaryResume.file)}
                  download={primaryResume.downloadName}
                >
                  <i className="bi bi-download" aria-hidden="true"></i>
                  <span>Download Resume</span>
                </a>
                <a className="btn btn-outline" href="#experience">
                  <i className="bi bi-briefcase" aria-hidden="true"></i>
                  <span>View Experience</span>
                </a>
                <a className="btn btn-ghost" href="#contact">
                  <i className="bi bi-send" aria-hidden="true"></i>
                  <span>Contact Me</span>
                </a>
              </div>
            </Reveal>

            <Reveal as="aside" className="hero-card">
              <div className="hero-card-top">
                <img
                  className="hero-avatar"
                  src={asset("profile.jpg")}
                  alt={`Portrait of ${PROFILE.name}`}
                />
                <div>
                  <h2>{PROFILE.name}</h2>
                  <p className="hero-card-role">{PROFILE.subRole}</p>
                  <p className="hero-card-loc">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                    {PROFILE.location}
                  </p>
                </div>
              </div>

              <ul className="hero-points">
                {HERO_POINTS.map((point) => (
                  <li key={point}>
                    <i className="bi bi-check2" aria-hidden="true"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {featuredCertificate?.credentialUrl ? (
                <a
                  className="hero-credential"
                  href={featuredCertificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoogleMark />
                  <span className="hero-credential-text">
                    <strong>{featuredCertificate.issuer}-verified Python credential</strong>
                    <span>
                      {featuredCertificate.title} · ID {featuredCertificate.credentialId}
                    </span>
                  </span>
                  <i className="bi bi-patch-check-fill" aria-hidden="true"></i>
                </a>
              ) : null}

              <div className="hero-card-links">
                <a href={`mailto:${PROFILE.email}`}>
                  <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                  Email
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin" aria-hidden="true"></i>
                  LinkedIn
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-github" aria-hidden="true"></i>
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>

          <div className="shell">
            <Reveal className="metric-strip">
              {METRICS.map((metric) => (
                <article key={metric.unit} className="metric">
                  <p className="metric-value">{metric.value}</p>
                  <p className="metric-unit">{metric.unit}</p>
                  <p className="metric-copy">{metric.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------------- HIRING SNAPSHOT ---------------- */}
        <section id="snapshot" className="section section-snapshot">
          <div className="shell">
            <SectionHeading
              index="01"
              kicker="Role fit"
              title="Built for complex, business-critical work."
              copy="A concise view of the experience, delivery scope, and working style I bring."
            />

            <Reveal className="snapshot-grid">
              {HIRING_SNAPSHOT.map((item) => (
                <article key={item.label} className="snapshot-card">
                  <span className="snapshot-icon">
                    <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                  </span>
                  <p className="snapshot-label">{item.label}</p>
                  <p className="snapshot-value">{item.value}</p>
                  <p className="snapshot-note">{item.note}</p>
                </article>
              ))}
            </Reveal>

            <Reveal className="trust-row">
              {TRUST_ITEMS.map((item) => (
                <article key={item.title} className="trust-card">
                  <span className="trust-icon">
                    <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------------- CORE STACK ---------------- */}
        <section id="stack" className="section section-stack">
          <div className="shell">
            <SectionHeading
              index="02"
              kicker="Technical expertise"
              title="Hands-on across application, data, and delivery."
              copy="Focused on the tools and practices I use in real production systems."
            />

            <Reveal className="stack-grid">
              {CORE_STACK.map((item) => (
                <article
                  key={item.name}
                  className={`stack-card${item.lead ? " is-lead" : ""}`}
                >
                  <div className="stack-head">
                    <span className="stack-icon">
                      <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                    </span>
                    <div>
                      <h3>{item.name}</h3>
                      <p className="stack-meta">
                        <span
                          className={`level-badge${item.lead ? " is-lead" : ""}`}
                        >
                          {item.level}
                        </span>
                        <span>{item.years}</span>
                      </p>
                    </div>
                  </div>
                  <p className="stack-copy">{item.copy}</p>
                  <div className="chip-row">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </Reveal>

            <Reveal className="skills-panel">
              <p className="panel-label">Supporting capabilities</p>
              <div className="skills-grid">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.title} className="skill-group">
                    <h4>
                      <i className={`bi ${group.icon}`} aria-hidden="true"></i>
                      {group.title}
                    </h4>
                    <div className="chip-row">
                      {group.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- EXPERIENCE ---------------- */}
        <section id="experience" className="section section-experience">
          <div className="shell">
            <SectionHeading
              index="03"
              kicker="Experience"
              title="A clear record of increasing ownership."
              copy="12+ years across social impact, mobility, travel, and business software."
            />

            <div className="timeline">
              {EXPERIENCES.map((experience) => (
                <Reveal
                  as="article"
                  key={experience.company}
                  className={`timeline-item${experience.current ? " is-current" : ""}`}
                >
                  <div className="timeline-marker" aria-hidden="true">
                    <span />
                  </div>

                  <div className="timeline-card">
                    <div className="timeline-head">
                      <div>
                        <h3>{experience.role}</h3>
                        <p className="timeline-company">{experience.company}</p>
                      </div>
                      <p className="timeline-period">
                        {experience.current ? (
                          <span className="current-tag">Current</span>
                        ) : null}
                        {experience.period}
                      </p>
                    </div>

                    <p className="timeline-copy">{experience.copy}</p>

                    <ul className="bullet-list">
                      {experience.list.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="chip-row">
                      {experience.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {experience.companyUrl ? (
                      <a
                        className="text-link"
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {experience.companyLinkLabel}
                        <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SELECTED WORK ---------------- */}
        <section id="work" className="section section-work">
          <div className="shell">
            <SectionHeading
              index="04"
              kicker="Selected impact"
              title="What I will bring to the team."
              copy="Direct evidence across architecture, automation, engineering quality, and production delivery."
            />

            <div className="work-grid">
              {WORK_ITEMS.map((item) => (
                <Reveal
                  as="article"
                  key={item.title}
                  className={`work-card${item.featured ? " is-featured" : ""}`}
                >
                  <div className="work-head">
                    <p className="work-tag">{item.tag}</p>
                    <p className="work-impact">{item.impact}</p>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="work-body">{item.body}</p>
                  <ul className="bullet-list">
                    {item.list.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {item.url ? (
                    <a
                      className="text-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.urlLabel}
                      <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                    </a>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CERTIFICATES ---------------- */}
        <section id="certificates" className="section section-certificates">
          <div className="shell">
            <SectionHeading
              index="05"
              kicker="Credentials"
              title="Qualifications with visible proof."
              copy="Professional training and academic records are available in full; the Google Python credential is independently verifiable."
            />

            {featuredCertificate ? (
              <Reveal className="cert-featured-wrap">
                <p className="featured-flag">
                  <i className="bi bi-star-fill" aria-hidden="true"></i>
                  Featured credential — issued by Google
                </p>
                <CertificateCard
                  certificate={featuredCertificate}
                  onOpen={setLightbox}
                />
              </Reveal>
            ) : null}

            <Reveal className="cert-grid">
              {otherCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onOpen={setLightbox}
                />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------------- LIVE PRODUCTS ---------------- */}
        <section id="showcase" className="section section-showcase">
          <div className="shell">
            <SectionHeading
              index="06"
              kicker="Production portfolio"
              title="Live systems, including CASCADE."
              copy="Public products that show the environments and workflows behind my experience."
            />

            <Reveal className="showcase-tabs" role="tablist" aria-label="Live products">
              {SHOWCASES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={item.id === showcase.id}
                  className={`showcase-tab${item.id === showcase.id ? " is-active" : ""}`}
                  onClick={() => setActiveShowcase(item.id)}
                >
                  <i
                    className={`bi ${item.type === "mobile" ? "bi-phone" : "bi-display"}`}
                    aria-hidden="true"
                  ></i>
                  <span>{item.title}</span>
                </button>
              ))}
            </Reveal>

            <Reveal className="showcase-panel">
              <div className={`device device-${showcase.type}`}>
                {showcase.type === "mobile" ? (
                  <div className="phone-frame">
                    <div className="phone-island" aria-hidden="true" />
                    <div className="phone-screen">
                      <iframe
                        key={showcase.id}
                        src={showcase.frameUrl}
                        title={showcase.frameTitle}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    </div>
                    <div className="phone-bar" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="laptop-frame">
                    <div className="laptop-lid">
                      <div className="laptop-screen">
                        <iframe
                          key={showcase.id}
                          src={showcase.frameUrl}
                          title={showcase.frameTitle}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                      </div>
                    </div>
                    <div className="laptop-base" aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="showcase-copy">
                <p className="panel-label">{showcase.label}</p>
                <h3>{showcase.title}</h3>
                <p>{showcase.copy}</p>
                <div className="chip-row">
                  {showcase.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a
                  className="btn btn-primary"
                  href={showcase.frameUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                  <span>{showcase.cta}</span>
                </a>
              </div>
            </Reveal>

            <Reveal className="nda-panel">
              <span className="nda-icon">
                <i className="bi bi-shield-lock" aria-hidden="true"></i>
              </span>
              <div>
                <p className="panel-label">Additional enterprise work</p>
                <h3>Internal software shipped under NDA.</h3>
                <p>
                  I have also built internal platforms for inventory management,
                  stock control, KPI reporting, HR workflows, and operational
                  dashboards. Product details are confidential, but the work
                  involved real production maintenance and business workflows.
                </p>
                <div className="chip-row">
                  {CONFIDENTIAL_TAGS.map((tag) => (
                    <span key={tag.label}>
                      <i className={`bi ${tag.icon}`} aria-hidden="true"></i>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- RESUME ---------------- */}
        <section id="resume" className="section section-resume">
          <div className="shell">
            <SectionHeading
              index="07"
              kicker="Resume"
              title="One current resume, kept up to date."
              copy="Earlier role-specific versions are archived below for reference."
            />

            <Reveal className="resume-primary">
              <div>
                <p className="panel-label">
                  Current
                  {primaryResume.updated ? ` · Updated ${primaryResume.updated}` : ""}
                </p>
                <h3>{primaryResume.title}</h3>
                <p>{primaryResume.description}</p>
              </div>
              <a
                className="btn btn-primary btn-lg"
                href={asset(primaryResume.file)}
                download={primaryResume.downloadName}
              >
                <i className="bi bi-download" aria-hidden="true"></i>
                <span>{primaryResume.buttonText}</span>
              </a>
            </Reveal>

            <Reveal as="details" className="resume-archive">
              <summary>
                <i className="bi bi-archive" aria-hidden="true"></i>
                <span>
                  Archived versions ({ARCHIVED_RESUMES.length})
                </span>
              </summary>
              <p className="resume-archive-note">
                These versions are superseded by the current resume and are kept
                for reference only.
              </p>
              <ul className="resume-archive-list">
                {ARCHIVED_RESUMES.map((resume) => (
                  <li key={resume.title}>
                    <div>
                      <h3>{resume.title}</h3>
                      <p>{resume.description}</p>
                      <p className="resume-archive-tag">{resume.archivedNote}</p>
                    </div>
                    <a
                      className="btn btn-ghost btn-sm"
                      href={asset(resume.file)}
                      download={resume.downloadName}
                    >
                      <i className="bi bi-download" aria-hidden="true"></i>
                      <span>Download</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="section section-contact">
          <div className="shell contact-inner">
            <div className="contact-main">
              <SectionHeading
                index="08"
                kicker="Contact"
                title="Let's discuss the role."
                copy="Open to technical lead, corporate tooling, internal platform, and senior full-stack opportunities in Bangkok, Singapore/SEA, or remote."
                align="left"
              />

              <Reveal as="form" className="contact-form" onSubmit={handleQuickMessageSubmit}>
                <label className="field-label" htmlFor="quick-message-name">
                  Your name
                </label>
                <input
                  id="quick-message-name"
                  name="name"
                  type="text"
                  required
                  maxLength="100"
                  placeholder="Recruiter or hiring manager name"
                  value={quickMessage.name}
                  onChange={(event) =>
                    setQuickMessage((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />

                <label className="field-label" htmlFor="quick-message-input">
                  Message
                </label>
                <textarea
                  id="quick-message-input"
                  name="quick-message"
                  rows="5"
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
                />

                <div className="contact-form-foot">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={messageStatus.sending}
                  >
                    <i className="bi bi-send" aria-hidden="true"></i>
                    <span>Send Message</span>
                  </button>
                  <p
                    className={`form-status ${messageStatus.type}`.trim()}
                    role="status"
                    aria-live="polite"
                  >
                    {messageStatus.text}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="contact-aside">
              {CONTACT_CARDS.map((card) => (
                <Reveal as="article" key={card.label} className="contact-card">
                  <span className="contact-icon">
                    <i className={`bi ${card.icon}`} aria-hidden="true"></i>
                  </span>
                  <div>
                    <p className="panel-label">{card.label}</p>
                    {card.lines ? (
                      <div className="contact-links">
                        {card.lines.map((line) => (
                          <a
                            key={line.text}
                            href={line.href}
                            target={line.external ? "_blank" : undefined}
                            rel={line.external ? "noopener noreferrer" : undefined}
                          >
                            {line.text}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="contact-text">{card.text}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <p>
            &copy; {currentYear} {PROFILE.name}
          </p>
          <p className="footer-role">
            Technical Lead · Python / Django &amp; React · Bangkok, Thailand
          </p>
          <div className="footer-links">
            <a href={`mailto:${PROFILE.email}`}>Email</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {lightbox ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={closeLightbox}
        >
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-head">
              <div>
                <p className="panel-label">{lightbox.issuer}</p>
                <h3>{lightbox.title}</h3>
              </div>
              <button
                type="button"
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close certificate preview"
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>

            <img src={asset(lightbox.image)} alt={lightbox.alt} />

            <div className="lightbox-foot">
              <a
                className="btn btn-ghost btn-sm"
                href={asset(lightbox.file || lightbox.image)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                <span>Open original</span>
              </a>
              {lightbox.credentialUrl ? (
                <a
                  className="btn btn-primary btn-sm"
                  href={lightbox.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-patch-check" aria-hidden="true"></i>
                  <span>Verify credential</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
