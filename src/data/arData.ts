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
    },
    {
      id: "s8",
      title: "حلول جواز السفر الرقمي للمنتج (DPP)",
      description: "هندسة نظم تتبع آمنة وقابلة للتطوير للتوافق مع متطلبات DPP للاتحاد الأوروبي. بناء جوازات سفر رقمية مفعلة برمز QR للشركات B2B.",
      iconName: "QrCode"
    },
    {
      id: "s9",
      title: "أتمتة الذكاء الاصطناعي وتنسيق المحركات",
      description: "تصميم وكلاء ذكاء اصطناعي مستقلين ومتعددي المراحل ومحركات اتخاذ القرار الإدراكي. تنسيق خطوط النماذج المتقدمة، والأتمتة القائمة على LLM، وفهرسة المتجهات ومهام العمل ذاتية الإصلاح بدون تأخير.",
      iconName: "Cpu"
    }
  ],
  projects: [
    {
      id: "p7",
      title: "نظام المؤسسات B2B",
      description: "بنية برمجية متكاملة كخدمة (SaaS) لتنظيم الأذونات متعددة المستأجرين، الهياكل التنظيمية المتقدمة، الترخيص التلقائي، سير العمل الديناميكي، ولوحات معلومات الأداء العميقة.",
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
      title: "نظام DPP (جواز السفر الرقمي للمنتج)",
      description: "شبكة تتبع آمنة ومتوافقة مع متطلبات DPP للاتحاد الأوروبي لمراقبة دورة حياة المواد للشركات B2B. مدعومة بتفعيل رمز QR وسجلات أمان مستوحاة من البلوكشين لتتبع مقاييس البصمة الكربونية.",
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
      title: "أتمتة الذكاء الاصطناعي وتنسيق المحركات",
      description: "محرك إدراكي مستقل يحاكي تنسيق خطوط الأنابيب متعددة الوكلاء. يدمج نماذج جيميناي لتوجيه اللغة الطبيعية، والتنفيذ الآمن للأدوات، وعمليات البحث الديناميكية في RAG، ومهام العمل ذاتية الإصلاح.",
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
      description: "نظام إدارة البيئة (EMS) المصمم لتتبع الاستدامة في المؤسسات والمصانع. يتميز بمراقبة انبعاثات الكربون في الوقت الفعلي، وتحليل إدارة النفايات، وتدقيق الامتثال التلقائي.",
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
      title: "تصميم بروتوكول الاقتصاد الدائري DPP للاتحاد الأوروبي",
      year: "2024",
      description: "تصميم ونشر شبكة تتبع آمنة وجاهزة للإنتاج لـ جواز السفر الرقمي للمنتج (DPP) باستخدام التفعيل برمز QR وسجلات النزاهة لتدقيق دائرية سلاسل التوريد والامتثال لمعايير الاستدامة والحوكمة (ESG) للمؤسسات الصناعية الأوروبية."
    },
    {
      id: "a2",
      title: "ابتكار خط تشخيصي طبي معزز بالذكاء الاصطناعي",
      year: "2023",
      description: "هندسة مصنفات رؤية حاسوبية للتعلم العميق فائقة الدقة بالذكاء الاصطناعي القابل للتفسير (XAI) لطب أمراض الدم، مما خفض زمن انتقال تقارير التشخيص السريري بنسبة 65٪ مع توفير خرائط ميزات شفافة رياضياً."
    },
    {
      id: "a3",
      title: "تطوير محرك تنسيق الأنظمة للمؤسسات",
      year: "2022 - الحالي",
      description: "بناء محرك اتخاذ قرار إدراكي مستقل متعدد الوكلاء يستفيد من فهرسة RAG المخصصة، وتوجيه الوظائف، ومهام عمل خطوط الأنابيب ذاتية الإصلاح لأتمتة عمليات أنظمة B2B الحساسة."
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "كبير مهندسي الحلول المتكاملة وهندسة النظم",
      company: "الحلول النخبوية والأنظمة المستقلة",
      duration: "2020 - الحالي",
      description: [
        "تصميم وهندسة تطبيقات ويب B2B عالية الإنتاجية، وحزم البرمجيات المؤسسية متعددة المستأجرين (ERP)، وتطبيقات الأجهزة المحمولة متعددة المنصات للشركات العالمية الحساسة.",
        "تطوير طوبولوجيات تعلم عميق متطورة للرؤية الحاسوبية لأمراض شبكية العين والتشخيص الطبي، باستخدام أطر الذكاء الاصطناعي القابل للتفسير (XAI) لقابلية تفسير عالية المخاطر.",
        "نشر خدمات مصغرة قوية ومستضافة داخل حاويات (Docker)، وإعداد بيئات CI/CD الآلية، محققاً نسبة تشغيل مستمرة 99.99٪ وتدفق تحميل للصفحات أقل من ثانية."
      ],
      techStack: ["React", "TypeScript", "Python", "Node.js", "Docker", "PyTorch"]
    },
    {
      id: "e2",
      role: "كبير مهندسي الأنظمة والواجهات الخلفية",
      company: "الحلول التقنية المتقدمة",
      duration: "2018 - 2020",
      description: [
        "تصميم وتحسين وصيانة واجهات برمجة تطبيقات (REST و GraphQL) مرنة وقوية تعمل عبر بنى خدمات مصغرة عالية القابلية للتطوير.",
        "تحسين محركات الاستعلام لقواعد البيانات العلاقية وغير العلاقية (PostgreSQL, MongoDB)، مما قلل زمن استجابة الاستعلامات المعقدة بنسبة 45٪ والقضاء على الاختناقات عبر طبقات التخزين المؤقت في Redis.",
        "تأسيس معايير الحاويات ومسارات بناء ونشر برمجية مؤتمتة بالكامل (CI/CD)، لتبسيط عمليات النشر التدريجي دون توقف للخدمة."
      ],
      techStack: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Docker"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "بكالوريوس العلوم في علوم وهندسة الحاسوب",
      institution: "جامعة دافوديل الدولية",
      duration: "2018 - 2022",
      description: "تخرج مع مرتبة الشرف. متخصص في الخوارزميات المتقدمة، وبنية الأنظمة الموزعة، وطوبولوجيا تعلم الآلة، والشبكات العصبية الاصطناعية."
    },
    {
      id: "edu2",
      degree: "شهادة الثانوية العامة العليا",
      institution: "كلية نوتردام",
      duration: "2016 - 2018",
      description: "شعبة العلوم مع تركيز صارم على الرياضيات العليا، الفيزياء، والمنطق التحليلي الدقيق."
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "سارة جينكينز",
      role: "المدير التقني في TechNova",
      feedback: "فيصل هو أحد المهندسين النادرين الذين يفهمون بعمق هندسة النظم وتجربة المستخدم في آنٍ واحد. لقد ارتقى بمنتجنا إلى مستوى لم نكن نعتقد أنه ممكن من الناحية التقنية.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "ماركوس تشين",
      role: "قائد المنتج في Innovate",
      feedback: "العمل مع فيصل كان بمثابة دورة تدريبية متقدمة في هندسة النظم والحلول الكاملة. إن اهتمامه بالسلامة الهيكلية وقدرته الفائقة على تقديم الميزات المعقدة دون شائبة لا مثيل لها.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "إيلينا رودريغيز",
      role: "مديرة التصميم",
      feedback: "أخيرًا، مهندس يحترم حقًا قيود التصميم عالية الدقة والواقعية. لقد ترجم فيصل متطلباتنا التفاعلية المعقدة إلى واقع ملموس مثالي بكسل بكسل، ومكتمل بحركات انسيابية عالية الأداء.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  ],
  ui: {
    navAbout: "نبذة",
    navSkills: "المهارات",
    navExperience: "الخبرة",
    navProjects: "المشاريع",
    navInsights: "الرؤى",
    navPerformance: "الأداء",
    navServices: "الخدمات",
    navAchievements: "الإنجازات",
    navContact: "اتصل بي",
    letsTalk: "دعنا نتحدث",
    downloadResume: "السيرة الذاتية",
    themeCenter: "مركز المظهر والإعدادات",
    online: "نشط",
    offline: "غير متصل",
    aboutTitle: "القدرات الأساسية",
    aboutSubtitle: "مقدمة موجزة عن هويتي المهنية ونطاق أعمالي.",
    skillsTitle: "الخبرات الجوهرية",
    skillsSubtitle: "مصفوفة الكفاءة الفنية والتقنية العميقة",
    experienceTitle: "الخط الزمني المهني",
    experienceSubtitle: "تاريخ نخبة هندسة النظم والبرمجيات",
    projectsTitle: "عمليات نشر عالية الأداء",
    projectsSubtitle: "مشاريع برمجية مستقلة وحلول SaaS سحابية",
    servicesTitle: "الخدمات النخبوية",
    servicesSubtitle: "حلول هندسة نظم برمجية احترافية ومتطورة",
    achievementsTitle: "المحطات المهنية",
    achievementsSubtitle: "الإنجازات النخبوية الرئيسية والبروتوكولات القابلة للتحقق",
    testimonialsTitle: "شهادات العملاء",
    testimonialsSubtitle: "آراء موثوقة من قيادات قطاعات التكنولوجيا والابتكار",
    contactTitle: "دعنا نبني شيئاً استثنائياً.",
    contactSubtitle: "متاح حالياً لقبول مشاريع جديدة وفرص عمل بدوام كامل. سواء كان لديك استفسار أو تود إلقاء التحية، سأبذل قصارى جهدي للرد عليك!",
    sayHello: "أرسل رسالة",
    yearsExperience: "سنوات الخبرة",
    projectsDelivered: "المشاريع المنجزة",
    ratedTalent: "تصنيف كفاءة نخبوية",
    readTime: "دقائق للقراءة"
  }
};
