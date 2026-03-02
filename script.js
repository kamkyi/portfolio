// ===== Update Year =====
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Contact Modal =====
const contactBtn = document.getElementById("contact-btn");
const contactModal = document.getElementById("contact-modal");
const closeModal = document.getElementById("close-modal");

if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    if (contactModal) {
      contactModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      return;
    }

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    contactModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (contactModal && e.target === contactModal) {
    contactModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (contactModal && e.key === "Escape" && contactModal.style.display === "flex") {
    contactModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ===== Navbar Active Link =====
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Close mobile menu
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar && navbar.classList.contains("show")) {
      new bootstrap.Collapse(navbar, { toggle: true });
    }
  });
});

// Update active link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    // Loading state
    button.disabled = true;
    button.innerHTML = '<i class="bi bi-arrow-repeat icon-spin"></i> Sending...';

    // Simulate sending
    setTimeout(() => {
      // Success state
      button.innerHTML = '<i class="bi bi-check2"></i> Message Sent!';
      button.style.background = "var(--success)";

      // Reset form
      contactForm.reset();

      // Close modal
      if (contactModal) {
        setTimeout(() => {
          contactModal.style.display = "none";
          document.body.style.overflow = "auto";
        }, 1500);
      }

      // Reset button
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.background = "";
      }, 3000);
    }, 1500);
  });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Observe cards
  document
    .querySelectorAll(
      ".project-card, .skill-category, .highlight-card, .achievement",
    )
    .forEach((card) => {
      observer.observe(card);
    });
});

// ===== Parallax Effect =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-section");

  if (parallax) {
    parallax.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }
});

// ===== Mobile Menu Close on Link Click =====
document.querySelectorAll(".navbar-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarToggle = document.querySelector(".navbar-toggler");
    if (navbarToggle && window.getComputedStyle(navbarToggle).display !== "none") {
      navbarToggle.click();
    }
  });
});

// ===== Add animation class to elements on load =====
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
