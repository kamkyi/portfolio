// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.3)";
    navbar.style.boxShadow = "0 4px 25px rgba(0, 0, 0, 0.2)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.25)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  }
});

// Contact Modal functionality
const contactModal = document.getElementById("contact-modal");
const contactBtn = document.getElementById("contact-btn");
const closeModalBtn = document.getElementById("close-modal");

// Open modal
if (contactBtn) {
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });
}

// Close modal
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    contactModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// Close modal when clicking outside
if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && contactModal.classList.contains("active")) {
    contactModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Contact form handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Reset form
      contactForm.reset();

      // Show success message
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = "linear-gradient(135deg, #10b981, #06d6a0)";

      // Close modal and reset after 2 seconds
      setTimeout(() => {
        contactModal.classList.remove("active");
        document.body.style.overflow = "auto";
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
      }, 2000);
    }, 2000);
  });
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe timeline items and skill categories
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const skillCategories = document.querySelectorAll(".skill-category");

  [...timelineItems, ...skillCategories].forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(item);
  });
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", () => {
  const subtitle = document.querySelector(".hero-subtitle");
  if (subtitle) {
    const text = subtitle.textContent;
    setTimeout(() => {
      typeWriter(subtitle, text, 80);
    }, 1000);
  }

  // Update copyright year automatically
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }
});

// Add active nav link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Skills hover animation
document.addEventListener("DOMContentLoaded", () => {
  const skillTags = document.querySelectorAll(".skill-tag");
  const techItems = document.querySelectorAll(".tech-item");

  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "translateY(-2px) scale(1.05)";
    });

    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "translateY(0) scale(1)";
    });
  });

  // Animate skill progress bars when they come into view
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");
          setTimeout(() => {
            progressBar.style.width = width + "%";
          }, 200);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });
});
