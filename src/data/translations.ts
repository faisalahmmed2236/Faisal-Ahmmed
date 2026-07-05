import { PortfolioData } from '../types';
import { portfolioData as enData } from './portfolioData';

export const esData: PortfolioData = {
  profile: {
    name: "Faisal Ahmmed",
    role: "Ingeniero de Software y Computación",
    tagline: "Diseñando sistemas de alto rendimiento y convirtiendo problemas complejos en soluciones de software elegantes y escalables.",
    bio: "Soy un Ingeniero de Software y Computación apasionado con profunda experiencia en desarrollo full-stack, arquitectura de sistemas y algoritmos. Prospero en la intersección de una lógica backend robusta e interfaces frontend perfectas al píxel, creando experiencias digitales que son tan funcionales como hermosas.",
    image: "https://github.com/faisalahmmed2236.png?size=800",
    socials: {
      github: "https://github.com/faisalahmmed2236",
      linkedin: "https://www.linkedin.com/in/faisalahmmed2236/",
      twitter: "https://twitter.com",
      email: "faisalahmmed2236@gmail.com",
      phone: "01601487678, 01701487678",
      whatsapp: "01601487678",
      facebook: "https://www.facebook.com/faisalahmmed2236/"
    }
  },
  skills: [
    {
      category: "IA y Deep Learning",
      items: [
        { name: "Python / XAI", level: 90 },
        { name: "TensorFlow / PyTorch", level: 85 },
        { name: "Visión por Computadora", level: 80 },
        { name: "Despliegue de Modelos", level: 75 }
      ]
    },
    {
      category: "Frontend y Web",
      items: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 85 }
      ]
    },
    {
      category: "Backend y Sistemas",
      items: [
        { name: "Node.js / Express", level: 85 },
        { name: "Django / FastAPI", level: 85 },
        { name: "PostgreSQL / MongoDB", level: 85 },
        { name: "Arquitectura de Sistemas", level: 80 }
      ]
    },
    {
      category: "Herramientas y DevOps",
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
      title: "Desarrollo Web Full-Stack",
      description: "Arquitectura y desarrollo de aplicaciones web responsivas, seguras y de alto rendimiento. Integración de interfaces frontend perfectas al píxel con arquitecturas backend robustas, APIs personalizadas y bases de datos optimizadas.",
      iconName: "Globe"
    },
    {
      id: "s2",
      title: "Soluciones de IA y Deep Learning",
      description: "Construcción de canalizaciones de aprendizaje automático modernas, topologías de visión artificial profunda, algoritmos de diagnóstico médico y sistemas transparentes utilizando marcos de IA explicable (XAI).",
      iconName: "Brain"
    },
    {
      id: "s3",
      title: "Aplicaciones Móviles Multiplataforma",
      description: "Creación de hermosas aplicaciones móviles con rendimiento nativo para iOS y Android utilizando bases de código únicas y unificadas con tecnologías modernas como Flutter y React Native.",
      iconName: "Smartphone"
    },
    {
      id: "s4",
      title: "Sistemas de Nivel Empresarial",
      description: "Diseño de arquitecturas de microservicios escalables, almacenes de datos distribuidos, diseño de sistemas de alta disponibilidad, pasarelas de pago seguras e infraestructuras de nube tolerantes a fallos.",
      iconName: "Cpu"
    },
    {
      id: "s5",
      title: "Motor de Estado Avanzado y Offline",
      description: "Desarrollo de aplicaciones móviles y de escritorio que funcionan primero sin conexión (offline-first). Ingeniería de capas de gestión de estado complejas, sistemas de sincronización en tiempo real e integraciones profundas de hardware nativo.",
      iconName: "Zap"
    },
    {
      id: "s6",
      title: "Arquitectura de Nube y DevOps",
      description: "Automatización de canalizaciones integrales de CI/CD, contenedorización con Docker y Kubernetes, y gestión de infraestructura altamente confiable y escalable en AWS, GCP y Azure.",
      iconName: "Cloud"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Suite ERP Empresarial",
      description: "Un sistema integral de Planificación de Recursos Empresariales (ERP) que integra módulos de RRHH, finanzas y cadena de suministro. Cuenta con control de acceso basado en roles y sincronización de datos en tiempo real de alto rendimiento.",
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
      title: "Plataforma Core EMS",
      description: "Un Sistema de Gestión de Empleados (EMS) diseñado para grandes organizaciones remotas. Incluye generación automatizada de nóminas, seguimiento del rendimiento y algoritmos de programación de turnos.",
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
      title: "Dashboard Global MIS",
      description: "Un Sistema de Información Gerencial (MIS) que consolida la telemetría y los KPI de las operaciones globales en gráficos interactivos y dinámicos para la toma de decisiones ejecutivas.",
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
      description: "Una tienda digital de alto rendimiento para juegos de PC con inventario en tiempo real, integración de pasarela de pago y una interfaz de usuario rica y animada que enfatiza la estética del modo oscuro.",
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
      title: "IA de Patología Retiniana",
      description: "Un avanzado sistema de Deep Learning diseñado para analizar imágenes retinianas y detectar patologías con alta precisión, aprovechando la IA Explicable (XAI) para la interpretabilidad médica.",
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
      title: "Lideró la Re-arquitectura Frontend",
      year: "2023",
      description: "Migró con éxito una aplicación React monolítica a una arquitectura modular Next.js, mejorando los tiempos de carga en un 40%."
    },
    {
      id: "a2",
      title: "Ponente en React Advanced",
      year: "2022",
      description: "Presentó una charla sobre 'Arquitectura Micro-frontend a Escala' ante una audiencia de más de 1000 desarrolladores."
    },
    {
      id: "a3",
      title: "Colaborador de Código Abierto",
      year: "2021 - Presente",
      description: "Contribuidor principal a varias bibliotecas populares del ecosistema React con más de 50 mil descargas semanales."
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "Ingeniero de Software Full-Stack",
      company: "Independiente / Freelance",
      duration: "2020 - Presente",
      description: [
        "Arquitectura y desarrollo de aplicaciones web full-stack y aplicaciones móviles multiplataforma para varios clientes.",
        "Desarrollo de modelos de IA para Patología Retiniana y simulaciones de Topología Empresarial.",
        "Implementación de IA Explicable (XAI) para la interpretabilidad médica."
      ],
      techStack: ["React", "Python", "Node.js", "TensorFlow", "React Native"]
    },
    {
      id: "e2",
      role: "Ingeniero Backend y de Sistemas",
      company: "Tech Solutions Inc.",
      duration: "2018 - 2020",
      description: [
        "Diseño y mantenimiento de APIs REST altamente escalables y microservicios utilizando Python y Django.",
        "Optimización de consultas de bases de datos, mejorando el rendimiento general del sistema en un 40%."
      ],
      techStack: ["Python", "Django", "PostgreSQL", "Docker"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Licenciatura en Ciencias de la Computación",
      institution: "Universidad Internacional Daffodil",
      duration: "2018 - 2022",
      description: "Graduado con honores. Centrado en algoritmos, arquitectura de sistemas y aprendizaje automático."
    },
    {
      id: "edu2",
      degree: "Certificado de Secundaria Superior",
      institution: "Dhaka City College",
      duration: "2016 - 2018",
      description: "Grupo de ciencias con enfoque en Matemáticas y Física."
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sarah Jenkins",
      role: "CTO en TechNova",
      feedback: "Alex es uno de los raros ingenieros que entiende profundamente tanto la arquitectura técnica como la experiencia del usuario. Elevaron nuestro producto a un nivel que no creíamos posible.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "Marcus Chen",
      role: "Líder de Producto en Innovate",
      feedback: "Trabajar con Alex fue una clase magistral de desarrollo frontend. Su atención al detalle y capacidad para entregar funciones complejas sin fallos es inigualable.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "Elena Rodriguez",
      role: "Directora de Diseño",
      feedback: "Finalmente, un ingeniero que realmente respeta el proceso de diseño. Alex tradujo nuestros archivos Figma a una realidad perfecta en píxeles, completa con animaciones suaves y sedosas.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  ]
};

export const translations = {
  en: enData,
  es: esData
};

export type Language = keyof typeof translations;
