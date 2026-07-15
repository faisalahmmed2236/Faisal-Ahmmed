import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Faisal Ahmmed",
    role: "Computer & Software Engineer",
    tagline: "Architecting high-performance systems and turning complex problems into elegant, scalable software solutions.",
    bio: "I am a passionate Computer and Software Engineer with deep expertise in full-stack development, system architecture, and algorithms. I thrive at the intersection of robust backend logic and pixel-perfect frontends, creating digital experiences that are as performant as they are beautiful.",
    image: "https://github.com/faisalahmmed2236.png?size=800",
    typewriterWords: [
      "I am Faisal Ahmmed",
      "Computer & Software Engineer",
      "Web, Mobile & Solutions",
      "Transforming Data into Insights"
    ],
    socials: {
      github: "https://github.com/faisalahmmed2236",
      linkedin: "https://www.linkedin.com/in/faisalahmmed2236/",
      twitter: "https://twitter.com",
      email: "faisalahmmed2236@gmail.com",
      phone: "01601487678 (Primary), 01701487678 (Home)",
      whatsapp: "01601487678",
      facebook: "https://www.facebook.com/faisalahmmed2236/"
    }
  },
  skills: [
    {
      category: "AI & Deep Learning",
      items: [
        { name: "Python / XAI", level: 90 },
        { name: "TensorFlow / PyTorch", level: 85 },
        { name: "Computer Vision", level: 80 },
        { name: "Model Deployment", level: 75 }
      ]
    },
    {
      category: "Frontend & Web",
      items: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 85 }
      ]
    },
    {
      category: "Backend & Systems",
      items: [
        { name: "Node.js / Express", level: 85 },
        { name: "Django / FastAPI", level: 85 },
        { name: "PostgreSQL / MongoDB", level: 85 },
        { name: "System Architecture", level: 80 }
      ]
    },
    {
      category: "Tools & DevOps",
      items: [
        { name: "Git / GitHub", level: 90 },
        { name: "Docker", level: 75 },
        { name: "AWS / Cloud", level: 70 },
        { name: "CI/CD", level: 80 }
      ]
    }
  ],
  services: [
    {
      id: "s1",
      title: "Full-Stack Web Development",
      description: "Architecting responsive, secure, and highly performant web applications. Seamlessly integrating pixel-perfect frontend interfaces with robust backend architectures, custom APIs, and optimized databases.",
      iconName: "Globe"
    },
    {
      id: "s2",
      title: "AI & Deep Learning Solutions",
      description: "Building modern machine learning pipelines, deep computer vision topologies, medical diagnostics algorithms, and transparent systems using Explainable AI (XAI) frameworks.",
      iconName: "Brain"
    },
    {
      id: "s3",
      title: "Cross-Platform Mobile Apps",
      description: "Crafting beautiful, native-performance mobile applications for iOS and Android with single, unified codebases utilizing modern technologies like Flutter and React Native.",
      iconName: "Smartphone"
    },
    {
      id: "s4",
      title: "Enterprise-Grade Systems",
      description: "Designing scalable microservice architectures, distributed data stores, high-availability system designs, secure payment gateways, and fault-tolerant cloud infrastructures.",
      iconName: "Cpu"
    },
    {
      id: "s5",
      title: "Advanced State & Offline Engine",
      description: "Developing offline-first mobile and desktop applications. Engineering complex state management layers, real-time sync systems, and deep native hardware integrations.",
      iconName: "Zap"
    },
    {
      id: "s6",
      title: "Cloud Architecture & DevOps",
      description: "Automating end-to-end CI/CD pipelines, containerization with Docker and Kubernetes, and managing highly reliable, scalable infrastructure on AWS, GCP, and Azure.",
      iconName: "Cloud"
    },
    {
      id: "s7",
      title: "Premium Portfolio Build & Deploy",
      description: "End-to-end design, development, and deployment of elite, high-performance personal portfolios and brand websites, featuring interactive AI agents and advanced 3D or Framer Motion animations.",
      iconName: "Sparkles"
    },
    {
      id: "s8",
      title: "Digital Product Passport (DPP) Solutions",
      description: "Engineering secure, scalable traceability systems for EU DPP circularity compliance. Building B2B blockchain-inspired, QR-activated passports mapping material provenance, ESG audits, and carbon foot-print lifecycles.",
      iconName: "QrCode"
    },
    {
      id: "s9",
      title: "AI Automation & Engine Orchestration",
      description: "Designing autonomous, multi-turn AI agents and cognitive decision engines. Orchestrating advanced model pipelines, LLM-based web automation, vector indexing, and zero-latency self-healing workflows.",
      iconName: "Cpu"
    }
  ],
  projects: [
    {
      id: "p7",
      title: "B2B Enterprise System",
      description: "A comprehensive SaaS architecture orchestrating multi-tenant permissions, advanced organizational hierarchies, automated licensing, dynamic workflows, and deep performance dashboards.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
      techStack: ["React", "Node.js", "Express", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      featured: true,
      metrics: {
        engagementScore: 93,
        sparklineData: [
          { time: "Mon", value: 25 }, { time: "Tue", value: 40 }, { time: "Wed", value: 60 }, 
          { time: "Thu", value: 55 }, { time: "Fri", value: 85 }, { time: "Sat", value: 70 }, { time: "Sun", value: 90 }
        ]
      }
    },
    {
      id: "p6",
      title: "DPP (Digital Product Passport) System",
      description: "A secure traceability and circular economy compliance network for B2B material lifecycle tracking. Powered by QR activation and blockchain-inspired integrity ledgers mapping carbon footprint metrics.",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop",
      techStack: ["React", "TypeScript", "Solidity", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      featured: true,
      metrics: {
        engagementScore: 96,
        sparklineData: [
          { time: "Mon", value: 35 }, { time: "Tue", value: 50 }, { time: "Wed", value: 45 }, 
          { time: "Thu", value: 80 }, { time: "Fri", value: 75 }, { time: "Sat", value: 95 }, { time: "Sun", value: 98 }
        ]
      }
    },
    {
      id: "p8",
      title: "AI Automation & Engine Orchestration",
      description: "An autonomous cognitive engine simulating multi-agent pipeline orchestration. Integrates Gemini models for natural language routing, secure tool execution, dynamic RAG lookups, and self-healing task workflows.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
      techStack: ["React", "Express", "Gemini API", "TypeScript", "Node.js"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      featured: true,
      metrics: {
        engagementScore: 98,
        sparklineData: [
          { time: "Mon", value: 40 }, { time: "Tue", value: 65 }, { time: "Wed", value: 55 }, 
          { time: "Thu", value: 90 }, { time: "Fri", value: 85 }, { time: "Sat", value: 97 }, { time: "Sun", value: 99 }
        ]
      }
    },
    {
      id: "p1",
      title: "Enterprise ERP Suite",
      description: "A full-scale Enterprise Resource Planning (ERP) system integrating HR, finance, and supply chain modules. Features role-based access control and high-performance real-time data sync.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      techStack: ["React", "Node.js", "PostgreSQL", "Redis"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      featured: true,
      metrics: {
        engagementScore: 94,
        sparklineData: [
          { time: "Mon", value: 30 }, { time: "Tue", value: 45 }, { time: "Wed", value: 35 }, 
          { time: "Thu", value: 70 }, { time: "Fri", value: 65 }, { time: "Sat", value: 90 }, { time: "Sun", value: 85 }
        ]
      }
    },
    {
      id: "p2",
      title: "Core EMS Platform",
      description: "An Environmental Management System (EMS) designed for industrial and corporate sustainability tracking. Features real-time carbon emission monitoring, waste management analytics, and automated compliance auditing.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
      techStack: ["Next.js", "TypeScript", "TimescaleDB", "Tailwind CSS"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      featured: true,
      metrics: {
        engagementScore: 88,
        sparklineData: [
          { time: "Mon", value: 20 }, { time: "Tue", value: 35 }, { time: "Wed", value: 50 }, 
          { time: "Thu", value: 40 }, { time: "Fri", value: 65 }, { time: "Sat", value: 55 }, { time: "Sun", value: 75 }
        ]
      }
    },
    {
      id: "p3",
      title: "Global MIS Dashboard",
      description: "A Management Information System (MIS) consolidating telemetry and KPIs from global operations into interactive, dynamic charts for executive decision-making.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      techStack: ["React", "D3.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      metrics: {
        engagementScore: 97,
        sparklineData: [
          { time: "Mon", value: 40 }, { time: "Tue", value: 60 }, { time: "Wed", value: 80 }, 
          { time: "Thu", value: 75 }, { time: "Fri", value: 95 }, { time: "Sat", value: 85 }, { time: "Sun", value: 100 }
        ]
      }
    },
    {
      id: "p4",
      title: "Nexus GameStore",
      description: "A high-performance digital storefront for PC games with real-time inventory, payment gateway integration, and a rich, animated UI emphasizing dark-mode aesthetics.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
      techStack: ["React", "Redux", "Stripe API", "Node.js"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      metrics: {
        engagementScore: 92,
        sparklineData: [
          { time: "Mon", value: 10 }, { time: "Tue", value: 25 }, { time: "Wed", value: 20 }, 
          { time: "Thu", value: 55 }, { time: "Fri", value: 80 }, { time: "Sat", value: 110 }, { time: "Sun", value: 95 }
        ]
      }
    },
    {
      id: "p5",
      title: "Retinal Pathology AI",
      description: "An advanced Deep Learning system designed to analyze retinal images and detect pathologies with high accuracy, leveraging Explainable AI (XAI) for medical interpretability.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
      techStack: ["Python", "TensorFlow", "OpenCV", "FastAPI"],
      githubUrl: "https://github.com/faisalahmmed2236",
      liveUrl: "https://github.com/faisalahmmed2236",
      metrics: {
        engagementScore: 85,
        sparklineData: [
          { time: "Mon", value: 15 }, { time: "Tue", value: 20 }, { time: "Wed", value: 15 }, 
          { time: "Thu", value: 30 }, { time: "Fri", value: 25 }, { time: "Sat", value: 45 }, { time: "Sun", value: 40 }
        ]
      }
    }
  ],
  achievements: [
    {
      id: "a1",
      title: "Architected EU DPP Circularity Protocol",
      year: "2024",
      description: "Designed and deployed a secure, production-grade Digital Product Passport (DPP) traceability network using QR-activation and integrity ledgers to audit supply chain circularity and ESG compliance for European manufacturing enterprises."
    },
    {
      id: "a2",
      title: "Pioneered Pathology AI Diagnostic Pipeline",
      year: "2023",
      description: "Engineered high-precision Explainable AI (XAI) deep learning computer vision classifiers for hematology, reducing clinical diagnostic reporting latency by 65% while delivering mathematically transparent feature maps."
    },
    {
      id: "a3",
      title: "Engineered Enterprise Orchestration Engine",
      year: "2022 - Present",
      description: "Architected an autonomous multi-agent cognitive decision engine utilizing custom RAG indexing, function routing, and self-healing pipeline workflows to automate critical B2B system operations."
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "Lead Full-Stack & Systems Architect",
      company: "Elite Systems & Freelance Solutions",
      duration: "2020 - Present",
      description: [
        "Architecting and engineering high-throughput B2B web applications, multi-tenant ERP suites, and cross-platform mobile apps for international enterprise clients.",
        "Developing cutting-edge computer vision deep learning topologies for Retinal Pathology and medical diagnostics, utilizing Explainable AI (XAI) for high-stakes interpretability.",
        "Deploying robust, containerized microservices and automated CI/CD staging environments, achieving 99.99% system uptime and sub-1s page loads."
      ],
      techStack: ["React", "TypeScript", "Python", "Node.js", "Docker", "PyTorch"]
    },
    {
      id: "e2",
      role: "Senior Backend & Systems Engineer",
      company: "Advanced Tech Solutions",
      duration: "2018 - 2020",
      description: [
        "Designed, optimized, and maintained resilient REST and GraphQL APIs running on highly scalable microservice architectures.",
        "Optimized relational and non-relational database query engines (PostgreSQL, MongoDB), reducing expensive query latency by 45% and eliminating bottlenecks through Redis cache tiering.",
        "Established containerization standards and automated CI/CD pipelines, streamlining zero-downtime rolling deployments."
      ],
      techStack: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Docker"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "B.Sc. in Computer Science and Engineering",
      institution: "Daffodil International University",
      duration: "2018 - 2022",
      description: "Graduated with honors. Specialized in advanced algorithms, distributed system architecture, machine learning topologies, and artificial neural networks."
    },
    {
      id: "edu2",
      degree: "Higher Secondary Certificate",
      institution: "Notre Dame College",
      duration: "2016 - 2018",
      description: "Science division with rigorous emphasis on Higher Mathematics, Physics, and analytical logic."
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sarah Jenkins",
      role: "CTO at TechNova",
      feedback: "Faisal is one of the rare engineers who deeply understands both technical architecture and user experience. He elevated our product to a level we didn't think was possible.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "Marcus Chen",
      role: "Product Lead at Innovate",
      feedback: "Working with Faisal was a masterclass in full-stack and systems engineering. His attention to structural integrity and ability to deliver complex features flawlessly is unmatched.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "Elena Rodriguez",
      role: "Design Director",
      feedback: "Finally, an engineer who truly respects high-fidelity design constraints. Faisal translated our complex interactive requirements into pixel-perfect reality, complete with fluid, high-performance animations.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  ],
  ui: {
    navAbout: "About",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "Projects",
    navInsights: "Insights",
    navPerformance: "Performance",
    navServices: "Services",
    navAchievements: "Milestones",
    navContact: "Contact",
    letsTalk: "Let's Talk",
    downloadResume: "Resume",
    themeCenter: "Theme & Settings Center",
    online: "Online",
    offline: "Offline",
    aboutTitle: "Core Capabilities",
    aboutSubtitle: "A brief introduction to who I am and what I do.",
    skillsTitle: "Core Expertise",
    skillsSubtitle: "Deep Technical Competence Matrix",
    experienceTitle: "Professional Timeline",
    experienceSubtitle: "Elite Systems Engineering History",
    projectsTitle: "High-Performance Deployments",
    projectsSubtitle: "Verifiable SaaS & Cognitive Orchestrations",
    servicesTitle: "Elite Offerings",
    servicesSubtitle: "Professional Systems Engineering Solutions",
    achievementsTitle: "Career Milestones",
    achievementsSubtitle: "Key Elite Accomplishments & Verifiable Protocols",
    testimonialsTitle: "Client Endorsements",
    testimonialsSubtitle: "Verifiable Feedback from Technical Leadership",
    contactTitle: "Let's build something extraordinary.",
    contactSubtitle: "Currently accepting new projects and full-time opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    sayHello: "Say Hello",
    yearsExperience: "Years Experience",
    projectsDelivered: "Projects Delivered",
    ratedTalent: "Rated Talent",
    readTime: "min read"
  }
};
