const yearEl = document.getElementById("year");
const navToggle = document.getElementById("nav-toggle");
const navPanel = document.getElementById("nav-panel");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const siteHeader = document.querySelector(".site-header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const agentRoot = document.querySelector("[data-portfolio-agent]");
const agentLauncher = document.getElementById("agent-launcher");
const agentPanel = document.getElementById("agent-panel");
const agentClose = document.getElementById("agent-close");
const agentFeed = document.getElementById("agent-feed");
const agentForm = document.getElementById("agent-form");
const agentInput = document.getElementById("agent-input");
const agentSend = document.getElementById("agent-send");
const agentPrompts = Array.from(document.querySelectorAll("[data-agent-prompt]"));

const agentState = {
  hasWelcomed: false,
  isOpen: false,
  isSending: false,
  messages: [],
};

const agentApiEndpoint =
  agentRoot instanceof HTMLElement
    ? agentRoot.dataset.agentEndpoint || "/api/portfolio-agent"
    : "/api/portfolio-agent";

const agentWelcomeMessage =
  "I am Wai Hyn's Agent. Ask me about his background, role fit, delivery style, and business impact. If needed, I can ask deeper follow-up questions to assess team fit or profit potential.";

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

const scrollAgentFeedToBottom = () => {
  if (!(agentFeed instanceof HTMLElement)) {
    return;
  }

  window.requestAnimationFrame(() => {
    agentFeed.scrollTop = agentFeed.scrollHeight;
  });
};

const createAgentMessageElement = (role, content, options = {}) => {
  const messageEl = document.createElement("article");
  const roleEl = document.createElement("span");
  const bubbleEl = document.createElement("div");

  messageEl.className = "agent-message";
  messageEl.dataset.role = role;
  roleEl.className = "agent-message-role";
  bubbleEl.className = "agent-bubble";
  roleEl.textContent = role === "assistant" ? "Wai Hyn's Agent" : "You";
  bubbleEl.textContent = content;

  if (options.loading) {
    messageEl.classList.add("is-loading");
  }

  messageEl.append(roleEl, bubbleEl);

  return messageEl;
};

const appendAgentMessage = (role, content, options = {}) => {
  if (!(agentFeed instanceof HTMLElement)) {
    return null;
  }

  const messageEl = createAgentMessageElement(role, content, options);
  agentFeed.append(messageEl);
  scrollAgentFeedToBottom();
  return messageEl;
};

const ensureAgentWelcome = () => {
  if (agentState.hasWelcomed) {
    return;
  }

  appendAgentMessage("assistant", agentWelcomeMessage);
  agentState.hasWelcomed = true;
};

const updateAgentControls = () => {
  const isDisabled = agentState.isSending;

  if (agentInput instanceof HTMLTextAreaElement) {
    agentInput.disabled = isDisabled;
  }

  if (agentSend instanceof HTMLButtonElement) {
    agentSend.disabled = isDisabled;
  }

  agentPrompts.forEach((promptButton) => {
    promptButton.disabled = isDisabled;
  });
};

const resizeAgentInput = () => {
  if (!(agentInput instanceof HTMLTextAreaElement)) {
    return;
  }

  agentInput.style.height = "auto";
  agentInput.style.height = `${Math.min(agentInput.scrollHeight, 144)}px`;
};

const setAgentOpen = (isOpen) => {
  if (
    !(agentLauncher instanceof HTMLButtonElement) ||
    !(agentPanel instanceof HTMLElement)
  ) {
    return;
  }

  agentState.isOpen = isOpen;
  agentLauncher.setAttribute("aria-expanded", String(isOpen));
  agentPanel.classList.toggle("is-open", isOpen);
  agentPanel.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    ensureAgentWelcome();
    resizeAgentInput();
    if (agentInput instanceof HTMLTextAreaElement) {
      window.requestAnimationFrame(() => agentInput.focus());
    }
  }
};

const extractErrorMessage = async (response) => {
  try {
    const data = await response.json();
    if (data && typeof data.error === "string" && data.error.trim()) {
      return data.error.trim();
    }
  } catch (error) {
    return null;
  }

  return null;
};

const sendAgentMessage = async (message) => {
  const trimmedMessage = message.trim();
  if (!trimmedMessage || agentState.isSending) {
    return;
  }

  ensureAgentWelcome();
  setAgentOpen(true);

  agentState.isSending = true;
  updateAgentControls();

  appendAgentMessage("user", trimmedMessage);
  agentState.messages.push({ role: "user", content: trimmedMessage });

  if (agentInput instanceof HTMLTextAreaElement) {
    agentInput.value = "";
    resizeAgentInput();
  }

  const loadingMessageEl = appendAgentMessage(
    "assistant",
    "Working on that...",
    { loading: true },
  );

  try {
    const response = await fetch(agentApiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: agentState.messages,
      }),
    });

    if (!response.ok) {
      const errorMessage =
        (await extractErrorMessage(response)) ||
        "Wai Hyn's Agent is not configured yet. Add the OpenAI server endpoint and try again.";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const reply =
      data && typeof data.reply === "string" && data.reply.trim()
        ? data.reply.trim()
        : "I couldn't generate a reply from Wai Hyn's Agent.";

    if (loadingMessageEl instanceof HTMLElement) {
      loadingMessageEl.classList.remove("is-loading");
      const bubbleEl = loadingMessageEl.querySelector(".agent-bubble");
      if (bubbleEl instanceof HTMLElement) {
        bubbleEl.textContent = reply;
      }
    }

    agentState.messages.push({ role: "assistant", content: reply });
  } catch (error) {
    const fallbackReply =
      error instanceof Error && error.message.trim()
        ? error.message.trim()
        : "Wai Hyn's Agent request failed.";

    if (loadingMessageEl instanceof HTMLElement) {
      loadingMessageEl.classList.remove("is-loading");
      const bubbleEl = loadingMessageEl.querySelector(".agent-bubble");
      if (bubbleEl instanceof HTMLElement) {
        bubbleEl.textContent = fallbackReply;
      }
    }

    agentState.messages.push({
      role: "assistant",
      content: fallbackReply,
    });
  } finally {
    agentState.isSending = false;
    updateAgentControls();
    scrollAgentFeedToBottom();
    if (agentInput instanceof HTMLTextAreaElement && agentState.isOpen) {
      agentInput.focus();
    }
  }
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

if (
  agentRoot instanceof HTMLElement &&
  agentLauncher instanceof HTMLButtonElement &&
  agentPanel instanceof HTMLElement
) {
  agentLauncher.addEventListener("click", () => {
    setAgentOpen(!agentState.isOpen);
  });

  agentClose?.addEventListener("click", () => {
    setAgentOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!agentState.isOpen) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && !agentRoot.contains(target)) {
      setAgentOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && agentState.isOpen) {
      setAgentOpen(false);
    }
  });

  agentPrompts.forEach((promptButton) => {
    promptButton.addEventListener("click", () => {
      const promptText = promptButton.dataset.agentPrompt || "";
      void sendAgentMessage(promptText);
    });
  });

  agentInput?.addEventListener("input", () => {
    resizeAgentInput();
  });

  agentInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!(agentInput instanceof HTMLTextAreaElement)) {
        return;
      }

      void sendAgentMessage(agentInput.value);
    }
  });

  agentForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(agentInput instanceof HTMLTextAreaElement)) {
      return;
    }

    void sendAgentMessage(agentInput.value);
  });

  resizeAgentInput();
  updateAgentControls();
}

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
