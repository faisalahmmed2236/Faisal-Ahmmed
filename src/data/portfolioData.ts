import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Faisal Ahmmed",
    role: "Computer & Software Engineer",
    tagline: "Architecting high-performance systems and turning complex problems into elegant, scalable software solutions.",
    bio: "I am a passionate Computer and Software Engineer with deep expertise in full-stack development, system architecture, and algorithms. I thrive at the intersection of robust backend logic and pixel-perfect frontends, creating digital experiences that are as performant as they are beautiful.",
    image: "https://github.com/faisalahmmed2236.png?size=800",
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
    }
  ],
  projects: [
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
      description: "An Employee Management System (EMS) designed for large remote organizations. Includes automated payroll generation, performance tracking, and shift scheduling algorithms.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
      techStack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
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
      title: "Led Frontend Re-architecture",
      year: "2023",
      description: "Successfully migrated a monolithic React application to a modular Next.js architecture, improving load times by 40%."
    },
    {
      id: "a2",
      title: "Speaker at React Advanced",
      year: "2022",
      description: "Presented a talk on 'Micro-frontend Architecture at Scale' to an audience of over 1000 developers."
    },
    {
      id: "a3",
      title: "Open Source Contributor",
      year: "2021 - Present",
      description: "Core contributor to several popular React ecosystem libraries with over 50k weekly downloads."
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "Full-Stack Software Engineer",
      company: "Independent / Freelance",
      duration: "2020 - Present",
      description: [
        "Architecting and developing full-stack web applications and cross-platform mobile apps for various clients.",
        "Developing AI models for Retinal Pathology and Enterprise Topology simulations.",
        "Implementing Explainable AI (XAI) for medical interpretability."
      ],
      techStack: ["React", "Python", "Node.js", "TensorFlow", "React Native"]
    },
    {
      id: "e2",
      role: "Backend & Systems Engineer",
      company: "Tech Solutions Inc.",
      duration: "2018 - 2020",
      description: [
        "Designed and maintained highly scalable REST APIs and microservices using Python and Django.",
        "Optimized database queries and improved overall system performance by 40%."
      ],
      techStack: ["Python", "Django", "PostgreSQL", "Docker"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "B.Sc. in Computer Science and Engineering",
      institution: "Daffodil International University",
      duration: "2018 - 2022",
      description: "Graduated with honors. Focused on algorithms, system architecture, and machine learning."
    },
    {
      id: "edu2",
      degree: "Higher Secondary Certificate",
      institution: "Notre Dame College",
      duration: "2016 - 2018",
      description: "Science group with a focus on Mathematics and Physics."
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sarah Jenkins",
      role: "CTO at TechNova",
      feedback: "Alex is one of the rare engineers who deeply understands both technical architecture and user experience. They elevated our product to a level we didn't think was possible.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "Marcus Chen",
      role: "Product Lead at Innovate",
      feedback: "Working with Alex was a masterclass in frontend development. Their attention to detail and ability to deliver complex features flawlessly is unmatched.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "Elena Rodriguez",
      role: "Design Director",
      feedback: "Finally, an engineer who truly respects the design process. Alex translated our Figma files into pixel-perfect reality, complete with buttery smooth animations.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  ]
};
