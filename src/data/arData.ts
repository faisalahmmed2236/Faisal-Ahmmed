import { PortfolioData } from '../types';

export const arData: PortfolioData = {
  profile: {
    name: "فيصل أحمد",
    role: "مهندس كمبيوتر وبرمجيات",
    tagline: "تصميم أنظمة عالية الأداء وتحويل المشاكل المعقدة إلى حلول برمجية أنيقة وقابلة للتطوير.",
    bio: "أنا مهندس برمجيات وكمبيوتر شغوف ولدي خبرة عميقة في التطوير الشامل، وهندسة الأنظمة، والخوارزميات. أزدهر في التقاطع بين منطق الواجهة الخلفية القوي والواجهات الأمامية المثالية بكسل بكسل، وإنشاء تجارب رقمية وظيفية وجميلة في نفس الوقت.",
    image: "https://github.com/faisalahmmed2236.png?size=800",
    typewriterWords: [
      "أنا فيصل أحمد",
      "مهندس كمبيوتر وبرمجيات",
      "ويب، موبايل وحلول",
      "تحويل البيانات إلى رؤى"
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
      category: "الذكاء الاصطناعي والتعلم العميق",
      items: [
        { name: "Python / XAI", level: 90 },
        { name: "TensorFlow / PyTorch", level: 85 },
        { name: "الرؤية الحاسوبية", level: 80 },
        { name: "نشر النماذج", level: 75 }
      ]
    },
    {
      category: "الواجهة الأمامية والويب",
      items: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 85 }
      ]
    },
    {
      category: "الواجهة الخلفية والأنظمة",
      items: [
        { name: "Node.js / Express", level: 85 },
        { name: "Django / FastAPI", level: 85 },
        { name: "PostgreSQL / MongoDB", level: 85 },
        { name: "هندسة الأنظمة", level: 80 }
      ]
    },
    {
      category: "الأدوات وعمليات التطوير (DevOps)",
      items: [
        { name: "Git / GitHub", level: 90 },
        { name: "Docker / الحاويات", level: 80 },
        { name: "AWS / السحابة", level: 75 },
        { name: "CI/CD مسارات", level: 80 }
      ]
    }
  ],
  services: [
    {
      id: "s1",
      title: "تطبيقات ويب متكاملة",
      description: "تطوير تطبيقات ويب قابلة للتطوير، آمنة وعالية الأداء (React, Next.js, Node.js, Django).",
      iconName: "Code"
    },
    {
      id: "s2",
      title: "الذكاء الاصطناعي وتعلم الآلة",
      description: "بناء نماذج ذكاء اصطناعي مخصصة للتحليلات التنبؤية، ومعالجة اللغات الطبيعية، والرؤية الحاسوبية.",
      iconName: "BrainCircuit"
    },
    {
      id: "s3",
      title: "عمليات التطوير وهندسة السحابة",
      description: "إعداد مسارات CI/CD، وحاويات Docker، وإدارة بنية تحتية موثوقة في AWS، GCP.",
      iconName: "Cloud"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "نظام ERP للمؤسسات",
      description: "نظام شامل لتخطيط موارد المؤسسات يدمج وحدات الموارد البشرية، والتمويل، وسلسلة التوريد.",
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
      title: "منصة EMS الأساسية",
      description: "نظام إدارة الموظفين مصمم للمؤسسات الكبيرة، يشمل الرواتب وتتبع الأداء.",
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
      title: "لوحة تحكم MIS العالمية",
      description: "نظام معلومات إدارية لتصور البيانات الهامة عبر الرسوم البيانية الديناميكية لدعم اتخاذ القرارات.",
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
      title: "متجر ألعاب نيكسوس",
      description: "متجر رقمي عالي الأداء لألعاب الكمبيوتر مع وضع ليلي متحرك بشكل جميل.",
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
      title: "الذكاء الاصطناعي لأمراض الشبكية",
      description: "نظام متطور للتعلم العميق مصمم لتحليل صور الشبكية واكتشاف الأمراض بدقة عالية.",
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
      title: "قيادة إعادة هيكلة الواجهة الأمامية",
      year: "2023",
      description: "تم نقل تطبيق React متآلف بنجاح إلى بنية Next.js المعيارية، مما أدى إلى تحسين أوقات التحميل بنسبة 40٪."
    },
    {
      id: "a2",
      title: "متحدث في React Advanced",
      year: "2022",
      description: "قدمت حديثًا حول 'هندسة الواجهة الأمامية المصغرة على نطاق واسع' لجمهور يزيد عن 1000 مطور."
    },
    {
      id: "a3",
      title: "مساهم في مفتوح المصدر",
      year: "2021 - الحالي",
      description: "مساهم رئيسي في العديد من مكتبات React الشهيرة التي تم تنزيلها أكثر من 50 ألف مرة أسبوعياً."
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "مهندس برمجيات متكامل (Full-Stack)",
      company: "مستقل / عمل حر",
      duration: "2020 - الحالي",
      description: [
        "بناء تطبيقات ويب وتطبيقات هواتف محمولة متكاملة للعديد من العملاء.",
        "تطوير نماذج ذكاء اصطناعي لأمراض الشبكية.",
        "تنفيذ الذكاء الاصطناعي القابل للتفسير (XAI)."
      ],
      techStack: ["React", "Python", "Node.js", "TensorFlow", "React Native"]
    },
    {
      id: "e2",
      role: "مهندس نظم وواجهة خلفية",
      company: "Tech Solutions Inc.",
      duration: "2018 - 2020",
      description: [
        "تصميم واجهات برمجة تطبيقات (API) قابلة للتطوير باستخدام Python و Django.",
        "تحسين استعلامات قواعد البيانات، مما أدى إلى زيادة أداء النظام بنسبة 40٪."
      ],
      techStack: ["Python", "Django", "PostgreSQL", "Docker"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "بكالوريوس في علوم وهندسة الكمبيوتر",
      institution: "جامعة دافوديل الدولية",
      duration: "2018 - 2022",
      description: "تخرج بمرتبة الشرف. التركيز على الخوارزميات وهندسة النظم والتعلم الآلي."
    },
    {
      id: "edu2",
      degree: "الشهادة الثانوية العليا",
      institution: "كلية مدينة دكا",
      duration: "2016 - 2018",
      description: "قسم العلوم مع التركيز على الرياضيات والفيزياء."
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "سارة جينكينز",
      role: "المدير التقني، TechNova",
      feedback: "أليكس هو أحد المهندسين النادرين الذين يفهمون بعمق البنية التقنية وتجربة المستخدم.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "ماركوس تشين",
      role: "قائد المنتج، Innovate",
      feedback: "العمل مع أليكس كان كدورة متقدمة في تطوير الواجهة الأمامية. اهتمامه بالتفاصيل لا مثيل له.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "إيلينا رودريغيز",
      role: "مديرة التصميم",
      feedback: "أخيرًا مهندس يحترم عملية التصميم حقًا. لقد ترجم ملفات Figma الخاصة بنا إلى واقع مذهل.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  ]
};
