import { PortfolioData } from '../types';
import { portfolioData as enData } from './portfolioData';
import { bnData } from './bnData';
import { arData } from './arData';

export const esData: PortfolioData = {
  profile: {
    name: "Faisal Ahmmed",
    role: "Ingeniero de Software y Computación",
    tagline: "Diseñando sistemas de alto rendimiento y convirtiendo problemas complejos en soluciones de software elegantes y escalables.",
    bio: "Soy un Ingeniero de Software y Computación apasionado con profunda experiencia en desarrollo full-stack, arquitectura de sistemas y algoritmos. Prospero en la intersección de una lógica backend robusta e interfaces frontend perfectas al píxel, creando experiencias digitales que son tan funcionales como hermosas.",
    image: "https://github.com/faisalahmmed2236.png?size=800",
    typewriterWords: [
      "Soy Faisal Ahmmed",
      "Ingeniero de Software y Computación",
      "Web, Móvil y Soluciones",
      "Transformando Datos en Conocimiento"
    ],
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
    },
    {
      id: "s7",
      title: "Construcción y Despliegue de Portafolios Premium",
      description: "Diseño, desarrollo y despliegue de principio a fin de portafolios personales y sitios web de marca de élite y alto rendimiento, con agentes de IA interactivos y animaciones avanzadas en 3D o Framer Motion.",
      iconName: "Sparkles"
    },
    {
      id: "s8",
      title: "Soluciones de Pasaporte Digital de Producto (DPP)",
      description: "Ingeniería de sistemas de trazabilidad seguros y escalables para el cumplimiento de la circularidad del DPP de la UE. Creación de pasaportes activados por QR e inspirados en blockchain para B2B.",
      iconName: "QrCode"
    },
    {
      id: "s9",
      title: "Automatización de IA y Orquestación de Motores",
      description: "Diseño de agentes de IA autónomos de múltiples turnos y motores de decisión cognitiva. Orquestación de canalizaciones de modelos avanzados, automatización web basada en LLM, indexación de vectores y flujos de trabajo autocorrectivos de latencia cero.",
      iconName: "Cpu"
    }
  ],
  projects: [
    {
      id: "p7",
      title: "Sistema Empresarial B2B",
      description: "Una arquitectura SaaS integral que orquesta permisos multiinquilino, jerarquías organizativas avanzadas, licencias automatizadas, flujos de trabajo dinámicos y paneles de rendimiento detallados.",
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
      title: "Sistema DPP (Pasaporte Digital de Producto)",
      description: "Una red segura de trazabilidad y cumplimiento de economía circular para el seguimiento del ciclo de vida del material B2B. Impulsado por la activación de QR y libros de integridad de tipo blockchain que mapean las métricas de la huella de carbono.",
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
      title: "Automatización de IA y Orquestación de Motores",
      description: "Un motor cognitivo autónomo que simula la orquestación de la canalización de múltiples agentes. Integra modelos Gemini para enrutamiento de lenguaje natural, ejecución segura de herramientas, búsquedas RAG dinámicas y flujos de trabajo de tareas autocorrectivos.",
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
      description: "Un Sistema de Gestión Ambiental (EMS) diseñado para el seguimiento de la sostenibilidad industrial y corporativa. Cuenta con monitoreo de emisiones de carbono en tiempo real, análisis de gestión de residuos y auditoría de cumplimiento automatizada.",
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
      title: "Diseñó el Protocolo de Circularidad de DPP de la UE",
      year: "2024",
      description: "Diseñó y desplegó una red segura de trazabilidad del Pasaporte Digital de Productos (DPP) de nivel de producción usando activación por QR y libros de contabilidad de integridad para auditar la circularidad de la cadena de suministro y el cumplimiento de ESG para empresas de fabricación europeas."
    },
    {
      id: "a2",
      title: "Pionero en el Flujo de Diagnóstico de IA de Patología",
      year: "2023",
      description: "Desarrolló clasificadores de visión por computadora de aprendizaje profundo de IA explicable (XAI) de alta precisión para hematología, reduciendo la latencia de informes de diagnóstico clínico en un 65% y ofreciendo mapas de características matemáticamente transparentes."
    },
    {
      id: "a3",
      title: "Ingeniería del Motor de Orquestación Empresarial",
      year: "2022 - Presente",
      description: "Diseñó un motor autónomo de decisión cognitiva de múltiples agentes utilizando indexación RAG personalizada, enrutamiento de funciones y flujos de trabajo de canalización autocorregibles para automatizar operaciones de sistemas B2B críticas."
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "Arquitecto de Sistemas y Líder Full-Stack",
      company: "Elite Systems & Freelance Solutions",
      duration: "2020 - Presente",
      description: [
        "Arquitectura e ingeniería de aplicaciones web B2B de alto rendimiento, suites ERP multiinquilino y aplicaciones móviles multiplataforma para clientes corporativos internacionales.",
        "Desarrollo de topologías avanzadas de aprendizaje profundo de visión por computadora para Patología Retiniana y diagnósticos médicos, utilizando IA explicable (XAI) para la interpretabilidad de alto riesgo.",
        "Despliegue de microservicios robustos en contenedores y entornos de staging CI/CD automatizados, logrando un 99.99% de tiempo de actividad del sistema y cargas de página inferiores a 1 segundo."
      ],
      techStack: ["React", "TypeScript", "Python", "Node.js", "Docker", "PyTorch"]
    },
    {
      id: "e2",
      role: "Ingeniero de Sistemas y Backend Senior",
      company: "Advanced Tech Solutions",
      duration: "2018 - 2020",
      description: [
        "Diseño, optimización y mantenimiento de APIs REST y GraphQL resilientes ejecutadas en arquitecturas de microservicios altamente escalables.",
        "Optimización de motores de consulta de bases de datos relacionales y no relacionales (PostgreSQL, MongoDB), reduciendo la costosa latencia de consultas en un 45% y eliminando cuellos de botella mediante almacenamiento en caché de Redis.",
        "Establecimiento de estándares de contenedorización y canalizaciones automatizadas de CI/CD, agilizando implementaciones continuas con cero tiempo de inactividad."
      ],
      techStack: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Docker"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Licenciatura en Ciencias de la Computación e Ingeniería",
      institution: "Universidad Internacional Daffodil",
      duration: "2018 - 2022",
      description: "Graduado con honores. Especializado en algoritmos avanzados, arquitectura de sistemas distribuidos, topologías de aprendizaje automático y redes neuronales artificiales."
    },
    {
      id: "edu2",
      degree: "Certificado de Secundaria Superior",
      institution: "Notre Dame College",
      duration: "2016 - 2018",
      description: "División de ciencias con riguroso énfasis en Matemáticas Superiores, Física y lógica analítica."
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sarah Jenkins",
      role: "CTO en TechNova",
      feedback: "Faisal es uno de los raros ingenieros que entiende profundamente tanto la arquitectura técnica como la experiencia del usuario. Elevó nuestro producto a un nivel que no creíamos posible.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "Marcus Chen",
      role: "Líder de Producto en Innovate",
      feedback: "Trabajar con Faisal fue una clase magistral de ingeniería de sistemas y de desarrollo full-stack. Su atención a la integridad estructural y capacidad para entregar funciones complejas sin fallas es inigualable.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "Elena Rodriguez",
      role: "Directora de Diseño",
      feedback: "Finalmente, un ingeniero que realmente respeta las restricciones de diseño de alta fidelidad. Faisal tradujo nuestros complejos requisitos interactivos a una realidad perfecta en píxeles, completa con animaciones suaves y de alto rendimiento.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  ],
  ui: {
    navAbout: "Sobre mí",
    navSkills: "Habilidades",
    navExperience: "Experiencia",
    navProjects: "Proyectos",
    navInsights: "Perspectivas",
    navPerformance: "Rendimiento",
    navServices: "Servicios",
    navAchievements: "Hitos",
    navContact: "Contacto",
    letsTalk: "Hablemos",
    downloadResume: "CV",
    themeCenter: "Centro de Configuración y Temas",
    online: "En línea",
    offline: "Desconectado",
    aboutTitle: "Capacidades Clave",
    aboutSubtitle: "Una breve introducción a quién soy y qué hago.",
    skillsTitle: "Experiencia Principal",
    skillsSubtitle: "Matriz de Competencia Técnica Profunda",
    experienceTitle: "Línea de Tiempo Profesional",
    experienceSubtitle: "Historial de Ingeniería de Sistemas de Élite",
    projectsTitle: "Despliegues de Alto Rendimiento",
    projectsSubtitle: "Orquestaciones Cognitivas y SaaS Verificables",
    servicesTitle: "Ofertas de Élite",
    servicesSubtitle: "Soluciones Profesionales de Ingeniería de Sistemas",
    achievementsTitle: "Hitos Profesionales",
    achievementsSubtitle: "Logros Clave de Élite y Protocolos Verificables",
    testimonialsTitle: "Respaldo de Clientes",
    testimonialsSubtitle: "Comentarios Verificables del Liderazgo Técnico",
    contactTitle: "Construyamos algo extraordinario.",
    contactSubtitle: "Actualmente aceptando nuevos proyectos y oportunidades a tiempo completo. Si tienes alguna pregunta o solo quieres saludar, ¡haré todo lo posible por responderte!",
    sayHello: "Saludar",
    yearsExperience: "Años de Experiencia",
    projectsDelivered: "Proyectos Entregados",
    ratedTalent: "Talento Destacado",
    readTime: "min de lectura"
  }
};

export const translations = {
  en: enData,
  es: esData,
  bn: bnData,
  ar: arData
};

export type Language = keyof typeof translations;
