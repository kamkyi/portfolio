export const PROFILE = {
  name: "Wai Hyn Htun",
  role: "Technical Lead · Python / Django & React",
  subRole: "Senior Full Stack Developer · 12+ years",
  location: "Bangkok, Thailand",
  email: "waihynhtun90s@gmail.com",
  phone: "+66 94 712 4485",
  whatsapp: "https://wa.me/66947124485",
  linkedin: "https://linkedin.com/in/waihynhtun",
  github: "https://github.com/kamkyi",
};

export const NAV_ITEMS = [
  { id: "snapshot", label: "Role Fit" },
  { id: "stack", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Impact" },
  { id: "certificates", label: "Credentials" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact", accent: true },
];

export const HERO_STACK = [
  "Python",
  "Django",
  "Django REST",
  "React.js",
  "TypeScript",
  "REST APIs",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "CI/CD",
  "Linux",
  "WorkOS AuthKit",
];

export const HERO_POINTS = [
  "Translate business requirements into secure, maintainable Python and React solutions",
  "Lead architecture, code review, testing, release planning, and production support",
  "Simplify complex workflows through APIs, automation, integrations, and data performance work",
];

export const METRICS = [
  {
    value: "12+",
    unit: "Years",
    copy: "Hands-on software delivery across enterprise and high-traffic platforms.",
  },
  {
    value: "50,000+",
    unit: "Users served",
    copy: "Golden Dreams platform users supported across Southeast Asia.",
  },
  {
    value: "20-30%",
    unit: "Faster APIs",
    copy: "High-traffic Django APIs improved through profiling, caching, and indexing.",
  },
  {
    value: "3-5",
    unit: "Engineers led",
    copy: "Engineers supported through review, standards, planning, and technical guidance.",
  },
];

export const HIRING_SNAPSHOT = [
  {
    icon: "bi-person-badge",
    label: "Target role",
    value: "Technical Lead / Senior Full Stack Developer",
    note: "Corporate tooling, internal platforms, and process automation",
  },
  {
    icon: "bi-code-square",
    label: "Core delivery stack",
    value: "Python / Django · React / TypeScript",
    note: "Backend, frontend, APIs, and production ownership",
  },
  {
    icon: "bi-clock-history",
    label: "Leadership scope",
    value: "Architecture through release",
    note: "Requirements, design, review, CI/CD, support, and documentation",
  },
  {
    icon: "bi-speedometer2",
    label: "Scale and reliability",
    value: "50,000+ users · measurable API gains",
    note: "Performance tuning, secure access, and incident response",
  },
  {
    icon: "bi-mortarboard",
    label: "Education",
    value: "B.C.Sc., Computer Science",
    note: "University of Computer Studies, Mandalay",
  },
  {
    icon: "bi-geo-alt",
    label: "Location",
    value: "Bangkok, Thailand",
    note: "Open to Singapore / Southeast Asia relocation and global remote roles",
  },
];

export const TRUST_ITEMS = [
  {
    icon: "bi-arrow-repeat",
    title: "Process to product",
    copy: "I turn operational requirements into clear workflows, system designs, APIs, and maintainable user interfaces.",
  },
  {
    icon: "bi-patch-check",
    title: "Quality and governance",
    copy: "I bring code review, automated testing, CI/CD, release controls, documentation, and disciplined change planning.",
  },
  {
    icon: "bi-diagram-3",
    title: "Systems thinking",
    copy: "I design secure integrations, improve data performance, modernize inherited systems, and stay accountable after release.",
  },
];

export const CORE_STACK = [
  {
    icon: "bi-filetype-py",
    name: "Python / Django",
    level: "Primary",
    years: "8+ years",
    lead: true,
    copy: "Production APIs, service design, ORM profiling, Redis caching, RBAC, secure authentication, and workflow automation.",
    tags: [
      "Django",
      "Django REST Framework",
      "Python 3",
      "ORM optimization",
      "Redis caching",
      "OpenAI API",
      "Pytest",
    ],
  },
  {
    icon: "bi-filetype-tsx",
    name: "React.js / TypeScript",
    level: "Primary",
    years: "7+ years",
    lead: true,
    copy: "Typed web applications, reusable components, API integration, responsive UI, accessibility, and shipped React Native products.",
    tags: [
      "React 18",
      "TypeScript",
      "Hooks & Context",
      "React Native",
      "Component systems",
      "REST integration",
      "CSS",
      "Responsive UI",
    ],
  },
  {
    icon: "bi-database-check",
    name: "Data & System Performance",
    level: "Strong",
    years: "10+ years",
    copy: "SQL tuning, indexing, N+1 removal, caching, search performance, and practical diagnosis of live-system bottlenecks.",
    tags: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "Indexing",
      "Query tuning",
    ],
  },
  {
    icon: "bi-hdd-rack",
    name: "Engineering Delivery",
    level: "Strong",
    years: "8+ years",
    copy: "Change planning, code review, unit and integration testing, CI/CD, Linux environments, release controls, and production support.",
    tags: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "AWS",
      "Linux",
      "Agile / Scrum",
      "Release management",
      "Technical documentation",
    ],
  },
];

export const WORK_ITEMS = [
  {
    featured: true,
    tag: "Current project · Issara Institute",
    title: "CASCADE platform foundation",
    body: "Contributing to a worker-voice technology and solutions platform for brands, retailers, suppliers, and recruitment agencies.",
    list: [
      "Participated in system architecture and core technical decisions",
      "Established the application foundation for ongoing product delivery",
      "Integrated WorkOS AuthKit for secure, scalable user authentication",
    ],
    impact: "System architecture · WorkOS AuthKit",
    url: "https://cascade.issarainstitute.org/",
    urlLabel: "View CASCADE",
  },
  {
    tag: "Requirements to release",
    title: "Golden Dreams marketplace delivery",
    body: "Led the design and delivery of worker-to-recruiter workflows within a multilingual platform serving 50,000+ users.",
    list: [
      "Translated product needs into architecture, secure APIs, frontend flows, and rollout plans",
      "Coordinated implementation, review, QA, release documentation, and production follow-up",
      "Added RBAC and token-based permission controls for worker and internal services",
    ],
    impact: "Python / Django · React / TypeScript",
  },
  {
    tag: "Performance and reliability",
    title: "Faster, safer production systems",
    body: "Improved inherited and high-traffic applications through evidence-led performance and release work.",
    list: [
      "Improved high-traffic Django API response times by 20-30%",
      "Reduced response times and post-release incidents by about 50% on inherited Yoma platforms",
      "Used query profiling, ORM cleanup, SQL rewrites, Redis caching, and database indexing",
    ],
    impact: "Measured production outcomes",
  },
  {
    tag: "Integrations and automation",
    title: "Business-critical workflows",
    body: "Built and supported integrations where reliability, security, and operational clarity mattered.",
    list: [
      "Payment gateways and server-to-server transaction flows",
      "OpenAI API automation for backend content and data workflows",
      "Booking, fleet, inventory, KPI, HR, and operational dashboard systems",
    ],
    impact: "REST APIs · Payments · Search · AI",
  },
];

export const EXPERIENCES = [
  {
    period: "Nov 2021 - Present",
    role: "Senior Full Stack Developer",
    company: "Issara Institute",
    current: true,
    companyUrl: "https://www.issarainstitute.org/golden-dreams",
    companyLinkLabel: "View Golden Dreams",
    copy: "Own full-stack engineering for Golden Dreams, an Issara Institute platform that helps migrant workers access information, support, and ethical job opportunities.",
    list: [
      "Lead requirements translation, architecture, implementation, code review, QA coordination, and release planning",
      "Improved high-traffic API response times by 20-30% with ORM profiling, Redis caching, and indexing",
      "Deliver secure marketplace, automation, mobile release, and internal administration workflows; contribute to CASCADE architecture and foundation work",
    ],
    tags: ["Python/Django", "React", "TypeScript", "React Native", "Redis", "CI/CD"],
  },
  {
    period: "Jul 2018 - Oct 2021",
    role: "Senior Software Engineer",
    company: "Yoma Strategic Holdings",
    companyUrl: "https://yomastrategic.com/our-businesses/",
    companyLinkLabel: "View Yoma businesses",
    copy: "Led backend engineering across mobility, rental, and property platforms within Yoma's diversified business portfolio.",
    list: [
      "Brought outsourced systems into internal ownership through codebase assessment, risk planning, and phased delivery",
      "Reduced response times and post-release incidents by about 50% through SQL tuning and engineering controls",
      "Built booking, fleet, availability, and payment workflows; introduced review, release, and documentation standards",
    ],
    tags: ["Laravel/PHP", "React.js", "REST APIs", "Payments", "MySQL", "AWS"],
  },
  {
    period: "Feb 2017 - Jun 2018",
    role: "Software Development Engineer",
    company: "Oway.com.mm",
    companyUrl: "https://www.owaytravel.com/content/about-us",
    companyLinkLabel: "View Oway",
    copy: "Built backend services for Oway's one-stop travel platform across flights, buses, hotels, cars, and payments.",
    list: [
      "Developed booking APIs, search services, and server-to-server payment flows",
      "Improved Elasticsearch and database performance through query and indexing work",
      "Implemented authentication and authorization controls for financial endpoints",
    ],
    tags: ["Laravel/PHP", "Booking APIs", "Payments", "Elasticsearch", "MongoDB", "AWS"],
  },
  {
    period: "Jan 2014 - Jan 2017",
    role: "Web Application Developer",
    company: "Myanmar Digital Solutions",
    copy: "Delivered full-stack business software for small and medium-sized clients.",
    list: [
      "Translated client requirements into POS, inventory, directory, and web applications",
      "Delivered responsive interfaces, backend workflows, SQL data models, and third-party integrations",
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
      "Django REST Framework",
      "Node.js",
      "Laravel/PHP",
      "REST APIs",
      "Workflow automation",
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
      "HTML",
      "CSS",
      "Bootstrap",
      "Responsive design",
      "Accessibility",
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
    icon: "bi-git",
    title: "Quality & Delivery",
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
      "Release planning",
      "Change controls",
      "Technical documentation",
    ],
  },
  {
    icon: "bi-cpu",
    title: "Integrations",
    tags: [
      "OpenAI API",
      "WorkOS AuthKit",
      "Workflow automation",
      "Payment gateways",
      "Elasticsearch",
      "React Native / Firebase",
      "Google Maps API",
      "Third-party integrations",
    ],
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
    stack: ["Django", "React.js", "TypeScript", "React Native"],
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
    stack: ["Django REST", "React.js", "PostgreSQL"],
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
    stack: ["Laravel", "React.js", "MySQL", "AWS"],
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
    stack: ["PHP", "Elasticsearch", "MongoDB", "Payments"],
  },
];

export const RESUMES = [
  {
    title: "Senior Full Stack Developer Resume",
    description:
      "Broad full-stack profile covering Python/Django, React, TypeScript, mobile, cloud, security, and production ownership.",
    file: "resume/Wai_Hyn_Htun_Senior_Full_Stack_Developer_Resume.docx",
    downloadName: "Wai_Hyn_Htun_Senior_Full_Stack_Developer_Resume.docx",
    primary: false,
    buttonText: "Download",
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
    title: "React / TypeScript Frontend Resume",
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
      "Best match for corporate tooling and internal-platform roles: architecture, requirements, engineering quality, release planning, and stakeholder delivery.",
    file: "resume/Wai_Hyn_Htun_Technical_Lead_Resume.docx",
    downloadName: "Wai_Hyn_Htun_Technical_Lead_Resume.docx",
    primary: true,
    buttonText: "Download Technical Lead Resume",
  },
];

/*
 * Certificates are ordered by hiring relevance.
 * The Google / Coursera Python certificate is `featured` and always renders first.
 */
export const CERTIFICATES = [
  {
    id: "google-python",
    featured: true,
    issuer: "Google",
    issuerNote: "Authorized by Google, offered through Coursera",
    type: "Verified Credential",
    title: "Crash Course on Python",
    date: "Jul 29, 2026",
    copy: "Verified Python credential covering data structures, object-oriented programming, and automation scripting.",
    image: "certificates/google-crash-course-on-python.jpg",
    file: "certificates/google-crash-course-on-python.pdf",
    credentialId: "PVQAKZYZ10G4",
    credentialUrl: "https://coursera.org/verify/PVQAKZYZ10G4",
    skills: ["Python", "OOP", "Data structures", "Automation scripting"],
    alt: "Google Crash Course on Python certificate issued to Wai Hyn Htun via Coursera",
    aria: "Open the Google Crash Course on Python certificate",
  },
  {
    id: "php-mysql",
    issuer: "Gusto Higher Education Institute",
    type: "Professional Training",
    title: "Dynamic Web Application Development with PHP & MySQL",
    date: "Jul 9, 2015",
    copy: "Dynamic web application development, server-side programming, and relational data work.",
    image: "images/img014.jpg",
    alt: "Certificate for Dynamic Web Application Development with PHP and MySQL",
    aria: "Open Dynamic Web Application Development certificate",
  },
  {
    id: "programming-fundamentals",
    issuer: "Gusto Higher Education Institute",
    type: "Professional Training",
    title: "Programming Fundamental Course",
    date: "May 9, 2014",
    copy: "Programming fundamentals and core software-development concepts.",
    image: "images/img016.jpg",
    alt: "Certificate for Programming Fundamental Course",
    aria: "Open Programming Fundamental course certificate",
  },
  {
    id: "java-solution",
    issuer: "Gusto Higher Education Institute",
    type: "Professional Training",
    title: "Software Solution with Java",
    date: "Jul 9, 2014",
    copy: "Java application development and software problem solving.",
    image: "images/img017.jpg",
    alt: "Certificate for Software Solution with Java Course",
    aria: "Open Software Solution with Java certificate",
  },
  {
    id: "web-java",
    issuer: "Gusto Higher Education Institute",
    type: "Professional Training",
    title: "Web Java Course",
    date: "Nov 9, 2014",
    copy: "Java web-development concepts and implementation.",
    image: "images/img018.jpg",
    alt: "Certificate for Web Java Course",
    aria: "Open Web Java course certificate",
  },
  {
    id: "kmd-it",
    issuer: "KMD",
    type: "Technical Education",
    title: "Information Technology Certificate of Competence",
    date: "Apr 7, 2014",
    copy: "50 hours of software engineering, Microsoft Access, and Visual Basic .NET training.",
    image: "images/img019.jpg",
    alt: "Certificate of competence in Information Technology",
    aria: "Open Information Technology certificate",
  },
  {
    id: "bcsc-en",
    issuer: "University of Computer Studies, Mandalay",
    type: "Academic Degree",
    title: "Bachelor of Computer Science (B.C.Sc.)",
    copy: "Official English-language degree document from the University of Computer Studies, Mandalay.",
    image: "images/img020.jpg",
    alt: "Bachelor of Computer Science degree document in English",
    aria: "Open Bachelor of Computer Science degree document in English",
  },
  {
    id: "bcsc-mm",
    issuer: "University of Computer Studies, Mandalay",
    type: "Academic Degree",
    title: "Bachelor of Computer Science (B.C.Sc.) — Myanmar",
    copy: "Official Myanmar-language counterpart to the B.C.Sc. degree document.",
    image: "images/img021.jpg",
    alt: "Bachelor of Computer Science degree document in Myanmar",
    aria: "Open Bachelor of Computer Science degree document in Myanmar",
  },
  {
    id: "matriculation-pass",
    issuer: "Myanmar Board of Examinations",
    type: "Academic Record",
    title: "Matriculation Examination Pass Certificate",
    date: "Nov 17, 2010",
    copy: "Official matriculation examination pass certificate.",
    image: "images/img013.jpg",
    alt: "Myanmar matriculation examination pass certificate",
    aria: "Open matriculation examination pass certificate",
  },
  {
    id: "matriculation",
    issuer: "Myanmar Board of Examinations",
    type: "Academic Record",
    title: "Matriculation Mark Record",
    copy: "Official matriculation examination mark record.",
    image: "images/matriculation-mark.jpeg",
    alt: "Matriculation mark record document",
    aria: "Open matriculation mark document",
  },
];

export const SHOWCASES = [
  {
    id: "cascade",
    type: "desktop",
    label: "Issara Institute · Current Project",
    title: "CASCADE Platform",
    copy: "A worker-voice technology and solutions platform for brands, retailers, suppliers, and recruitment agencies. I participated in system architecture, established the application foundation, and integrated WorkOS AuthKit authentication.",
    frameTitle: "CASCADE by Issara Institute",
    frameUrl: "https://cascade.issarainstitute.org/",
    cta: "Visit CASCADE",
    note: "Live web platform",
    stack: ["System Architecture", "WorkOS AuthKit", "Authentication"],
  },
  {
    id: "golden-dreams",
    type: "mobile",
    label: "Issara Institute",
    title: "Golden Dreams Mobile App",
    copy: "A live mobile-first platform supporting migrant workers through practical information and service access in production.",
    frameTitle: "Golden Dreams Mobile App",
    frameUrl: "https://app.golden-dreams.org/",
    cta: "Open Mobile App",
    note: "Live mobile product",
    stack: ["React Native", "Django", "TypeScript"],
  },
  {
    id: "oway",
    type: "desktop",
    label: "Oway Travel and Tours",
    title: "Travel Booking Platform",
    copy: "A travel platform with booking, payments, and product workflows where backend performance and reliability were important day-to-day concerns.",
    frameTitle: "Oway Travel and Tours",
    frameUrl: "https://oway.com.mm/",
    cta: "Visit Live Site",
    note: "Live web product",
    stack: ["PHP", "Elasticsearch", "Payments"],
  },
  {
    id: "yoma-fleet",
    type: "desktop",
    label: "Yoma Strategic Holdings",
    title: "Yoma Fleet Mobility Platform",
    copy: "Operational web software for fleet and mobility workflows with business logic, integrations, and real product usage requirements.",
    frameTitle: "Yoma Fleet - Yoma Strategic Holdings",
    frameUrl: "https://www.yomafleet.com/",
    cta: "Visit Live Site",
    note: "Live web product",
    stack: ["Laravel", "React.js", "MySQL"],
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
    icon: "bi-envelope",
    label: "Email",
    lines: [
      {
        href: "mailto:waihynhtun90s@gmail.com",
        text: "waihynhtun90s@gmail.com",
      },
    ],
  },
  {
    icon: "bi-telephone",
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
    icon: "bi-geo-alt",
    label: "Current Base",
    text: "Bangkok, Thailand",
  },
  {
    icon: "bi-briefcase",
    label: "Work Preference",
    text: "Open to Singapore/SEA relocation and remote global engagement.",
  },
  {
    icon: "bi-link-45deg",
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
