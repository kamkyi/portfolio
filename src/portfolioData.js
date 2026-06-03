export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "certificates", label: "Certificates" },
  { id: "projects", label: "Projects" },
  { id: "showcase", label: "Products" },
  { id: "contact", label: "Contact", accent: true },
];

export const HERO_POINTS = [
  "12+ years building and scaling production web and mobile systems across social impact, travel, mobility, and enterprise platforms",
  "Full-stack ownership across Python/Django, React.js, TypeScript, Node.js, Laravel/PHP, PostgreSQL, MySQL, Redis, Docker, AWS, Firebase, and React Native",
  "Improved high-traffic API response times by 20-30% through query profiling, Redis caching, and database indexing",
  "Hands-on ownership of architecture, code review, CI/CD, mobile releases, API security, and production incident response",
];

export const METRICS = [
  {
    value: "12+ Years",
    copy: "Full-stack engineering experience across social impact, travel, mobility, and enterprise platforms.",
  },
  {
    value: "50,000+ Users",
    copy: "Contributed to Golden Dreams, a migrant worker support and job marketplace platform operating across Southeast Asia.",
  },
  {
    value: "20-30% Faster APIs",
    copy: "Improved high-traffic worker-facing endpoints with Django ORM cleanup, caching, and indexing.",
  },
  {
    value: "Senior Ownership",
    copy: "Led feature delivery, code review, mobile releases, incident response, and technical debt prioritization.",
  },
];

export const TRUST_ITEMS = [
  {
    icon: "bi-diagram-3",
    title: "End-to-end ownership",
    copy: "I take features from architecture and API design through frontend delivery, mobile release support, documentation, and production follow-up.",
  },
  {
    icon: "bi-speedometer2",
    title: "Measurable performance work",
    copy: "I improve slow systems through query profiling, ORM cleanup, Redis caching, indexing, SQL rewrites, and practical frontend cleanup.",
  },
  {
    icon: "bi-shield-check",
    title: "Production reliability",
    copy: "I support secure APIs, token-based authentication, RBAC, release planning, incident triage, and code review standards for live systems.",
  },
];

export const STORY_ITEMS = [
  {
    label: "Current profile",
    title: "Senior Full Stack Developer based in Bangkok.",
    copy: "I am a Senior Full Stack Developer based in Bangkok, Thailand, with 12+ years of experience across social impact, travel, mobility, and enterprise platforms.",
  },
  {
    label: "Core work",
    title: "I work across architecture, delivery, and maintenance.",
    copy: "My work usually involves backend APIs, React applications, mobile app support, database performance, secure auth flows, inherited codebase modernization, and production releases.",
  },
  {
    label: "Recent work",
    title: "I contribute to product and engineering improvements.",
    copy: "Recent work includes a 50,000+ user worker-support platform, marketplace features, OpenAI API integration, booking systems, payment flows, search improvements, and Android release ownership.",
  },
];

export const WORK_ITEMS = [
  {
    featured: true,
    tag: "Issara Institute",
    title: "Golden Dreams worker support and job marketplace platform",
    body: "Owned full-stack delivery across Golden Dreams, a Southeast Asia migrant worker support and job marketplace platform serving 50,000+ active users.",
    list: [
      "Built and maintained Django, React.js, Node.js, TypeScript, and React Native applications",
      "Architected and delivered marketplace workflows for worker-to-recruiter job applications",
      "Improved high-traffic API response times by 20-30% through query profiling, Redis caching, and database indexing",
      "Owned Android build signing, staged Google Play Store rollouts, compliance reviews, and release documentation",
      "Integrated OpenAI API for backend content processing and workflow automation",
      "Implemented RBAC, token-based authentication, authorization, and secure API permission layers",
      "Led code review and engineering standards across a team of 3-5 engineers",
    ],
    impact: "Senior Full Stack Developer · Nov 2021 - Present",
  },
  {
    tag: "Yoma Strategic Holdings",
    title: "Mobility, rental, and property platforms",
    body: "Led backend engineering for mobility, rental, and property platforms during the transition from outsourced vendors to internal engineering ownership.",
    list: [
      "Managed codebase assessment, risk planning, and phased delivery for live systems",
      "Reduced platform response times and post-release incidents by roughly 50%",
      "Built vehicle booking and fleet rental systems with real-time availability and reservation workflows",
      "Integrated payment gateways with local payment providers",
      "Eliminated N+1 query patterns, added database indexes, and rewrote inefficient SQL",
      "Established code review standards, deployment checklists, and documentation practices",
    ],
    impact: "Senior Software Engineer · Jul 2018 - Oct 2021",
  },
  {
    tag: "Oway Travels & Tours",
    title: "Travel booking backend systems",
    body: "Worked on backend systems for a travel booking platform covering airline, bus, and hotel booking workflows.",
    list: [
      "Developed and maintained backend APIs and booking workflow services",
      "Integrated Elasticsearch for real-time travel search",
      "Reduced search latency through query tuning and indexing strategies",
      "Built server-to-server payment processing flows",
      "Implemented authentication and authorization controls for financial data endpoints",
    ],
    impact: "Software Development Engineer · Feb 2017 - Jun 2018",
  },
  {
    tag: "Myanmar Digital Solutions",
    title: "Business web applications and client systems",
    body: "Built and maintained web applications for small and medium business clients.",
    list: [
      "Developed POS systems, inventory management, business directory applications, and websites",
      "Built responsive frontend interfaces with HTML, CSS, Bootstrap, and JavaScript",
      "Worked with Laravel, CodeIgniter, PHP, MySQL, and WordPress",
      "Supported frontend/backend optimization, SEO, and WordPress customization",
      "Integrated Google Maps APIs and location-based features",
    ],
    impact: "Web Application Developer · Jan 2014 - Jan 2017",
  },
];

export const EXPERIENCES = [
  {
    period: "Nov 2021 - Present",
    role: "Senior Full Stack Developer",
    company: "Issara Institute",
    copy: "Owned full-stack development for Golden Dreams, a worker support and job marketplace platform serving 50,000+ migrant workers across Southeast Asia.",
    list: [
      "Built and maintained Django, React.js, Node.js, TypeScript, and React Native applications",
      "Improved high-traffic API response times by 20-30% using Django ORM profiling, Redis caching, and database indexing",
      "Architected and delivered marketplace workflows for worker-to-recruiter job applications",
      "Owned Android build signing, staged Google Play Store rollouts, compliance reviews, and release documentation",
      "Integrated OpenAI API for backend content processing and workflow automation",
      "Implemented RBAC, token-based authentication, authorization, and secure API permission layers",
      "Led code review and engineering standards across a team of 3-5 engineers",
    ],
    tags: ["Python/Django", "React.js", "TypeScript", "React Native", "Redis", "OpenAI API"],
  },
  {
    period: "Jul 2018 - Oct 2021",
    role: "Senior Software Engineer",
    company: "Yoma Strategic Holdings",
    copy: "Led backend engineering for mobility, rental, and property platforms while bringing outsourced systems into internal engineering ownership.",
    list: [
      "Managed codebase assessment, risk planning, and phased delivery for live systems",
      "Reduced platform response times and post-release incidents by roughly 50%",
      "Built vehicle booking and fleet rental systems with real-time availability and reservation workflows",
      "Integrated payment gateways with local payment providers",
      "Eliminated N+1 query patterns, added database indexes, and rewrote inefficient SQL",
      "Established code review standards, deployment checklists, and documentation practices",
    ],
    tags: ["Laravel/PHP", "React.js", "REST APIs", "Payments", "MySQL", "AWS"],
  },
  {
    period: "Feb 2017 - Jun 2018",
    role: "Software Development Engineer",
    company: "Oway.com.mm",
    copy: "Worked on backend systems for a travel booking platform covering airline, bus, and hotel booking workflows.",
    list: [
      "Developed and maintained backend APIs and booking workflow services",
      "Integrated Elasticsearch for real-time travel search",
      "Reduced search latency through query tuning and indexing strategies",
      "Built server-to-server payment processing flows",
      "Implemented authentication and authorization controls for financial data endpoints",
    ],
    tags: ["Laravel/PHP", "Booking APIs", "Payments", "Elasticsearch", "MongoDB", "AWS"],
  },
  {
    period: "Jan 2014 - Jan 2017",
    role: "Web Application Developer",
    company: "Myanmar Digital Solutions",
    copy: "Built and maintained web applications for small and medium business clients.",
    list: [
      "Developed POS systems, inventory management, business directory applications, and websites",
      "Built responsive frontend interfaces with HTML, CSS, Bootstrap, and JavaScript",
      "Worked with Laravel, CodeIgniter, PHP, MySQL, and WordPress",
      "Supported frontend/backend optimization, SEO, and WordPress customization",
      "Integrated Google Maps APIs and location-based features",
    ],
    tags: ["PHP", "Laravel", "CodeIgniter", "WordPress", "Bootstrap"],
  },
];

export const SKILL_GROUPS = [
  {
    icon: "bi-hdd-network",
    title: "Backend",
    tags: [
      "Python/Django",
      "Node.js",
      "Laravel/PHP",
      "REST APIs",
      "API security",
      "RBAC",
      "Authentication and authorization",
    ],
  },
  {
    icon: "bi-filetype-tsx",
    title: "Frontend",
    tags: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "Vue.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "Figma",
    ],
  },
  {
    icon: "bi-database",
    title: "Database & Performance",
    tags: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "Query optimization",
      "Indexing",
      "Performance troubleshooting",
    ],
  },
  {
    icon: "bi-phone",
    title: "Mobile",
    tags: [
      "React Native",
      "Firebase",
      "Push notifications",
      "Android release management",
      "Google Play Store deployment",
    ],
  },
  {
    icon: "bi-git",
    title: "DevOps & Workflow",
    tags: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "AWS",
      "Linux",
      "Git",
      "Code review",
      "Agile/Scrum",
      "Unit and integration testing",
      "Technical documentation",
    ],
  },
  {
    icon: "bi-cpu",
    title: "AI & Integrations",
    tags: [
      "OpenAI API",
      "Workflow automation",
      "Payment gateways",
      "Google Maps API",
      "Third-party integrations",
    ],
  },
];

export const CAPABILITIES = [
  {
    icon: "bi-tools",
    title: "Application Maintenance",
    copy: "Maintaining existing systems, improving reliability, modernizing inherited codebases, and documenting practical engineering decisions.",
    tags: ["Maintenance", "Modernization", "Documentation", "Support"],
  },
  {
    icon: "bi-speedometer2",
    title: "Performance Troubleshooting",
    copy: "Improving slow workflows through query profiling, ORM cleanup, SQL rewrites, indexing, Redis caching, API review, and frontend performance cleanup.",
    tags: ["Queries", "Caching", "Indexing", "APIs"],
  },
  {
    icon: "bi-people",
    title: "Release Coordination",
    copy: "Coordinating with product, QA, DevOps, and international stakeholders on release planning, production issues, and follow-up fixes.",
    tags: ["QA", "DevOps", "Releases", "Stakeholders"],
  },
  {
    icon: "bi-code-slash",
    title: "Full-Stack Delivery",
    copy: "Building backend APIs, React interfaces, mobile app support features, secure auth flows, integrations, and internal tooling.",
    tags: ["Backend", "Frontend", "Mobile", "Security"],
  },
];

export const PROJECTS = [
  {
    icon: "bi-phone",
    label: "Issara Institute",
    title: "Golden Dreams Platform",
    copy: "A worker support and job marketplace platform serving 50,000+ migrant workers across Southeast Asia, built with Python/Django, React.js, React Native, TypeScript, and Node.js. I contributed to backend APIs, frontend features, mobile support, marketplace workflows, push notifications, surveys, analytics dashboards, OpenAI API integration, RBAC, and Google Play Store release management.",
    points: [
      "Backend APIs, RBAC, and data workflows",
      "Frontend and mobile application support",
      "Marketplace workflows, notifications, surveys, analytics, and AI-assisted automation",
    ],
  },
  {
    icon: "bi-briefcase",
    label: "Issara Institute",
    title: "Marketplace Feature",
    copy: "A job marketplace feature that allows workers to browse and apply for recruiter-posted opportunities. My work included architecture, backend API development, frontend implementation, secure data flow design, and integration with the existing Golden Dreams platform.",
    points: [
      "Worker-to-recruiter application flow",
      "API development and frontend implementation",
      "Integration with existing platform data flows",
    ],
  },
  {
    icon: "bi-car-front",
    label: "Yoma Strategic Holdings",
    title: "Vehicle Booking and Rental Systems",
    copy: "Booking and rental systems for mobility and fleet operations. My work included backend API development, reservation workflows, real-time availability, payment gateway integration, SQL optimization, inherited Laravel modernization, and release documentation.",
    points: [
      "Reservation and availability workflows",
      "Payment gateway integration",
      "SQL optimization and Laravel refactoring",
    ],
  },
  {
    icon: "bi-airplane",
    label: "Oway.com.mm",
    title: "Travel Booking Platform",
    copy: "Backend systems for airline, bus, and hotel booking workflows. My work included booking APIs, payment gateway integrations, Elasticsearch search improvements, MongoDB/MySQL data work, database performance tuning, and auth controls for financial endpoints.",
    points: [
      "Booking APIs and backend workflows",
      "Payment gateway integrations",
      "Elasticsearch and database performance improvements",
    ],
  },
];

export const RESUMES = [
  {
    title: "Senior Full Stack Developer Resume",
    description:
      "Recommended for senior full-stack, product engineering, backend, frontend, and technical lead opportunities. Covers Python/Django, React.js, TypeScript, Node.js, React Native, Laravel/PHP, cloud, CI/CD, API security, OpenAI API integration, mobile release management, and production system ownership.",
    file: "resume/Wai_Hyn_Htun_Senior_Full_Stack_Developer_Resume.docx",
    downloadName: "Wai_Hyn_Htun_Senior_Full_Stack_Developer_Resume.docx",
    primary: true,
    buttonText: "Download Main Resume",
  },
  {
    title: "Python / Django Backend Resume",
    description:
      "Focused on backend APIs, Django, database optimization, Redis caching, performance tuning, REST APIs, API security, auth/authorization, and production troubleshooting.",
    file: "resume/Wai_Hyn_Htun_Python_Django_Backend_Resume.docx",
    downloadName: "Wai_Hyn_Htun_Python_Django_Backend_Resume.docx",
    primary: false,
    buttonText: "Download",
  },
  {
    title: "React / Frontend Resume",
    description:
      "Focused on React.js, TypeScript, frontend architecture, responsive UI, API integration, Figma handoff, performance optimization, and modern web application development.",
    file: "resume/Wai_Hyn_Htun_React_Frontend_Resume.docx",
    downloadName: "Wai_Hyn_Htun_React_Frontend_Resume.docx",
    primary: false,
    buttonText: "Download",
  },
  {
    title: "Technical Lead Resume",
    description:
      "Focused on architecture decisions, code review, release planning, mobile release ownership, production incident response, stakeholder communication, and cross-functional delivery.",
    file: "resume/Wai_Hyn_Htun_Technical_Lead_Resume.docx",
    downloadName: "Wai_Hyn_Htun_Technical_Lead_Resume.docx",
    primary: false,
    buttonText: "Download",
  },
];

export const CERTIFICATES = [
  {
    type: "Professional Training",
    title: "Dynamic Web Application Development with PHP & MySQL",
    copy: "Course certificate from Gusto Higher Education Institute.",
    image: "images/img014.jpg",
    alt: "Certificate for Dynamic Web Application Development with PHP and MySQL",
    aria: "Open Dynamic Web Application Development certificate",
  },
  {
    type: "Professional Training",
    title: "Programming Fundamental Course",
    copy: "Early software development training that supported my core engineering foundation.",
    image: "images/img016.jpg",
    alt: "Certificate for Programming Fundamental Course",
    aria: "Open Programming Fundamental course certificate",
  },
  {
    type: "Professional Training",
    title: "Software Solution with Java",
    copy: "Coursework in Java-based application development and software problem solving.",
    image: "images/img017.jpg",
    alt: "Certificate for Software Solution with Java Course",
    aria: "Open Software Solution with Java certificate",
  },
  {
    type: "Professional Training",
    title: "Web Java Course",
    copy: "Training in Java-oriented web development concepts and implementation.",
    image: "images/img018.jpg",
    alt: "Certificate for Web Java Course",
    aria: "Open Web Java course certificate",
  },
  {
    type: "Technical Education",
    title: "Information Technology Certificate of Competence",
    copy: "KMD training record covering software engineering fundamentals and practical tools.",
    image: "images/img019.jpg",
    alt: "Certificate of competence in Information Technology",
    aria: "Open Information Technology certificate",
  },
  {
    type: "Academic Record",
    title: "Bachelor of Computer Science",
    copy: "University of Computer Studies, Mandalay degree documentation in English.",
    image: "images/img020.jpg",
    alt: "Bachelor of Computer Science degree document in English",
    aria: "Open Bachelor of Computer Science degree document in English",
  },
  {
    type: "Academic Record",
    title: "Bachelor of Computer Science Document",
    copy: "Myanmar-language academic record connected to my B.C.Sc. degree.",
    image: "images/img021.jpg",
    alt: "Bachelor of Computer Science degree document in Myanmar",
    aria: "Open Bachelor of Computer Science degree document in Myanmar",
  },
  {
    type: "Academic Archive",
    title: "Archived Academic Certificate",
    copy: "Early official document preserved as part of my academic background.",
    image: "images/img013.jpg",
    alt: "Archived academic certificate document",
    aria: "Open archived academic certificate",
  },
  {
    type: "Academic Archive",
    title: "Matriculation Mark Record",
    copy: "Earlier academic record included as part of my educational journey.",
    image: "images/matriculation-mark.jpeg",
    alt: "Matriculation mark record document",
    aria: "Open matriculation mark document",
  },
];

export const SHOWCASES = [
  {
    type: "mobile",
    label: "Issara Institute",
    title: "Golden Dreams Mobile App",
    copy: "A live mobile-first platform supporting migrant workers through practical information and service access in production.",
    frameTitle: "Golden Dreams Mobile App",
    frameUrl: "https://app.golden-dreams.org/",
    cta: "Open Mobile App",
    note: "Live mobile product",
  },
  {
    type: "desktop",
    label: "Oway Travel and Tours",
    title: "Travel Booking Platform",
    copy: "A travel platform with booking, payments, and product workflows where backend performance and reliability were important day-to-day concerns.",
    frameTitle: "Oway Travel and Tours",
    frameUrl: "https://oway.com.mm/",
    cta: "Visit Live Site",
  },
  {
    type: "desktop",
    label: "Yoma Strategic Holdings",
    title: "Yoma Fleet Mobility Platform",
    copy: "Operational web software for fleet and mobility workflows with business logic, integrations, and real product usage requirements.",
    frameTitle: "Yoma Fleet - Yoma Strategic Holdings",
    frameUrl: "https://www.yomafleet.com/",
    cta: "Visit Live Site",
  },
];

export const CONFIDENTIAL_TAGS = [
  { icon: "bi-box-seam", label: "Inventory Systems" },
  { icon: "bi-graph-up", label: "Stock Management" },
  { icon: "bi-speedometer2", label: "KPI Reporting" },
  { icon: "bi-people", label: "HR Workflows" },
  { icon: "bi-clipboard-data", label: "Operational Dashboards" },
];

export const CONTACT_CARDS = [
  {
    label: "Email",
    lines: [
      {
        href: "mailto:waihynhtun90s@gmail.com",
        text: "waihynhtun90s@gmail.com",
      },
    ],
  },
  {
    label: "Phone and WhatsApp",
    lines: [
      { href: "tel:+66947124485", text: "+66 94 712 4485" },
      {
        href: "https://wa.me/66947124485",
        text: "WhatsApp chat",
        external: true,
      },
    ],
  },
  {
    label: "Current Base",
    text: "Bangkok, Thailand",
  },
  {
    label: "Work Preference",
    text: "Open to Singapore/SEA relocation and remote global engagement.",
  },
  {
    label: "Current Company",
    text: "Issara Institute",
  },
  {
    label: "Interview Availability",
    text: "Weekdays after 6 PM ICT, weekends by arrangement.",
  },
  {
    label: "Profiles",
    lines: [
      {
        href: "https://linkedin.com/in/waihynhtun",
        text: "LinkedIn",
        external: true,
      },
      {
        href: "https://github.com/kamkyi",
        text: "GitHub",
        external: true,
      },
    ],
  },
];
