const yearEl = document.getElementById("year");
const navToggle = document.getElementById("nav-toggle");
const navPanel = document.getElementById("nav-panel");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const siteHeader = document.querySelector(".site-header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const closeNav = () => {
  if (!navToggle || !navPanel) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  navPanel.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

const openNav = () => {
  if (!navToggle || !navPanel) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "true");
  navPanel.classList.add("is-open");
  document.body.classList.add("nav-open");
};

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeNav();
      return;
    }

    openNav();
  });
}

document.addEventListener("click", (event) => {
  if (!navToggle || !navPanel) {
    return;
  }

  const target = event.target;
  if (
    target instanceof Node &&
    !navPanel.contains(target) &&
    !navToggle.contains(target)
  ) {
    closeNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

const setActiveLink = () => {
  if (!sections.length) {
    return;
  }

  const offset = window.scrollY + 140;
  let currentSectionId = sections[0].id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("is-active", isMatch);
  });
};

const updateHeaderState = () => {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
};

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -48px 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const initCertificateSlider = () => {
  const sliderRoot = document.querySelector("[data-certificate-slider]");
  if (!(sliderRoot instanceof HTMLElement)) {
    return;
  }

  const stageEl = sliderRoot.querySelector("[data-slider-stage]");
  const prevButton = sliderRoot.querySelector("[data-slider-prev]");
  const nextButton = sliderRoot.querySelector("[data-slider-next]");
  const dotsRoot = sliderRoot.querySelector("[data-slider-dots]");
  const currentEl = sliderRoot.querySelector("[data-slider-current]");
  const totalEl = sliderRoot.querySelector("[data-slider-total]");
  const progressEl = sliderRoot.querySelector("[data-slider-progress]");
  const slides = Array.from(sliderRoot.querySelectorAll("[data-slide]"));

  if (!(stageEl instanceof HTMLElement) || !slides.length) {
    return;
  }

  const totalSlides = slides.length;
  const dots = [];
  const swipeThreshold = 48;
  let activeIndex = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let hasPointerStart = false;

  const formatNumber = (value) => String(value).padStart(2, "0");
  const clampIndex = (value) => (value + totalSlides) % totalSlides;

  slides.forEach((slide, index) => {
    slide.dataset.slideIndex = String(index);
  });

  if (dotsRoot instanceof HTMLElement) {
    dotsRoot.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot";
      dot.dataset.index = String(index);
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Show certificate ${index + 1}`);
      dotsRoot.append(dot);
      dots.push(dot);
    });
  }

  const syncSliderUI = () => {
    const prevIndex = clampIndex(activeIndex - 1);
    const nextIndex = clampIndex(activeIndex + 1);
    const progress = (activeIndex + 1) / totalSlides;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      const isPrev = index === prevIndex;
      const isNext = index === nextIndex;

      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-prev", isPrev);
      slide.classList.toggle("is-next", isNext);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
      dot.tabIndex = isActive ? 0 : -1;
    });

    if (currentEl instanceof HTMLElement) {
      currentEl.textContent = formatNumber(activeIndex + 1);
    }

    if (totalEl instanceof HTMLElement) {
      totalEl.textContent = formatNumber(totalSlides);
    }

    if (progressEl instanceof HTMLElement) {
      progressEl.style.transform = `scaleX(${progress})`;
    }
  };

  const moveTo = (nextIndex) => {
    activeIndex = clampIndex(nextIndex);
    syncSliderUI();
  };

  prevButton?.addEventListener("click", () => {
    moveTo(activeIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    moveTo(activeIndex + 1);
  });

  if (dotsRoot instanceof HTMLElement) {
    dotsRoot.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const dotEl = target.closest(".slider-dot");
      if (!(dotEl instanceof HTMLButtonElement)) {
        return;
      }

      const targetIndex = Number(dotEl.dataset.index);
      if (!Number.isNaN(targetIndex)) {
        moveTo(targetIndex);
      }
    });
  }

  stageEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(activeIndex - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(activeIndex + 1);
    }
  });

  stageEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const slideEl = target.closest("[data-slide]");
    if (!(slideEl instanceof HTMLElement)) {
      return;
    }

    const targetIndex = Number(slideEl.dataset.slideIndex);
    if (Number.isNaN(targetIndex) || targetIndex === activeIndex) {
      return;
    }

    event.preventDefault();
    moveTo(targetIndex);
  });

  if ("PointerEvent" in window) {
    stageEl.addEventListener("pointerdown", (event) => {
      hasPointerStart = true;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
    });

    stageEl.addEventListener("pointerup", (event) => {
      if (!hasPointerStart) {
        return;
      }

      hasPointerStart = false;

      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

      if (!isHorizontalSwipe || Math.abs(deltaX) < swipeThreshold) {
        return;
      }

      moveTo(activeIndex + (deltaX > 0 ? -1 : 1));
    });

    stageEl.addEventListener("pointercancel", () => {
      hasPointerStart = false;
    });

    stageEl.addEventListener("pointerleave", () => {
      hasPointerStart = false;
    });
  }

  syncSliderUI();
};

initCertificateSlider();

window.addEventListener("scroll", () => {
  updateHeaderState();
  setActiveLink();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeNav();
  }
});

updateHeaderState();
setActiveLink();
