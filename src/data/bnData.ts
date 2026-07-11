import { PortfolioData } from '../types';

export const bnData: PortfolioData = {
  profile: {
    name: "ফয়সাল আহমেদ",
    role: "কম্পিউটার এবং সফটওয়্যার ইঞ্জিনিয়ার",
    tagline: "উচ্চ-কর্মক্ষমতাসম্পন্ন সিস্টেম আর্কিটেকচার এবং জটিল সমস্যাগুলোকে স্কেলেবল সফটওয়্যার সমাধানে রূপান্তর করতে পারদর্শী।",
    bio: "আমি একজন সফটওয়্যার এবং কম্পিউটার ইঞ্জিনিয়ার। ফুল-স্ট্যাক ডেভেলপমেন্ট, সিস্টেম আর্কিটেকচার এবং অ্যালগরিদমে আমার গভীর দক্ষতা রয়েছে। মজবুত ব্যাকএন্ড এবং সুন্দর ফ্রন্টএন্ডের সমন্বয়ে আমি দারুণ এবং কার্যকরী ডিজিটাল অভিজ্ঞতা তৈরি করতে পছন্দ করি।",
    image: "https://github.com/faisalahmmed2236.png?size=800",
    typewriterWords: [
      "আমি ফয়সাল আহমেদ",
      "কম্পিউটার এবং সফটওয়্যার ইঞ্জিনিয়ার",
      "ওয়েব, মোবাইল এবং সলিউশন",
      "ডেটাকে ইনসাইটে রূপান্তর"
    ],
    socials: {
      github: "https://github.com/faisalahmmed2236",
      linkedin: "https://www.linkedin.com/in/faisalahmmed2236/",
      twitter: "https://twitter.com",
      email: "faisalahmmed2236@gmail.com",
      phone: "০১৬০১৪৮৭৬৭৮, ০১৭০১৪৮৭৬৭৮",
      whatsapp: "০১৬০১৪৮৭৬৭৮",
      facebook: "https://www.facebook.com/faisalahmmed2236/"
    }
  },
  skills: [
    {
      category: "এআই এবং ডিপ লার্নিং",
      items: [
        { name: "পাইথন / এক্সএআই", level: 90 },
        { name: "টেনসরফ্লো / পাইটর্চ", level: 85 },
        { name: "কম্পিউটার ভিশন", level: 80 },
        { name: "মডেল ডিপ্লয়মেন্ট", level: 75 }
      ]
    },
    {
      category: "ফ্রন্টএন্ড এবং ওয়েব",
      items: [
        { name: "রিঅ্যাক্ট / নেক্সট.জেএস", level: 95 },
        { name: "টাইপস্ক্রিপ্ট", level: 90 },
        { name: "টেইলউইন্ড সিএসএস", level: 95 },
        { name: "ফ্রেমার মোশন", level: 85 }
      ]
    },
    {
      category: "ব্যাকএন্ড এবং সিস্টেমস",
      items: [
        { name: "নোড.জেএস / এক্সপ্রেস", level: 85 },
        { name: "জ্যাঙ্গো / ফাস্টএপিআই", level: 85 },
        { name: "পোস্টগ্রেএসকিউএল / মঙ্গোডিবি", level: 85 },
        { name: "সিস্টেম আর্কিটেকচার", level: 80 }
      ]
    },
    {
      category: "টুলস এবং ডেভঅপস",
      items: [
        { name: "গিট / গিটহাব", level: 90 },
        { name: "ডকার / কন্টেইনারাইজেশন", level: 80 },
        { name: "এডব্লিউএস / ক্লাউড", level: 75 },
        { name: "সিআই/সিডি পাইপলাইন", level: 80 }
      ]
    }
  ],
  services: [
    {
      id: "s1",
      title: "ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন",
      description: "স্কেলেবল, সিকিউর এবং হাই-পারফরম্যান্স ওয়েব অ্যাপ ডেভেলপমেন্ট (React, Next.js, Node.js, Django)।",
      iconName: "Code"
    },
    {
      id: "s2",
      title: "এআই এবং মেশিন লার্নিং",
      description: "প্রেডিকটিভ অ্যানালিটিক্স, ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং, এবং কম্পিউটার ভিশনের জন্য কাস্টম এআই মডেল তৈরি।",
      iconName: "BrainCircuit"
    },
    {
      id: "s3",
      title: "ডেভঅপস এবং ক্লাউড আর্কিটেকচার",
      description: "AWS, GCP এবং Azure-এ CI/CD পাইপলাইন তৈরি, ডকার কন্টেইনারাইজেশন এবং ইনফ্রাস্ট্রাকচার ম্যানেজমেন্ট।",
      iconName: "Cloud"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "এন্টারপ্রাইজ ইআরপি স্যুট",
      description: "এইচআর, ফাইন্যান্স এবং সাপ্লাই চেইন মডিউলের সমন্বয়ে তৈরি একটি স্বয়ংসম্পূর্ণ ইআরপি সিস্টেম।",
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
      title: "কোর ইএমএস প্ল্যাটফর্ম",
      description: "বড় প্রতিষ্ঠানের জন্য ডিজাইন করা একটি এমপ্লয়ি ম্যানেজমেন্ট সিস্টেম, যেখানে পে-রোল এবং পারফরম্যান্স ট্র্যাকিং করা যায়।",
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
      title: "গ্লোবাল এমআইএস ড্যাশবোর্ড",
      description: "ডায়নামিক চার্টের মাধ্যমে গুরুত্বপূর্ণ ডেটা ভিজ্যুয়ালাইজেশনের জন্য একটি ম্যানেজমেন্ট ইনফরমেশন সিস্টেম।",
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
      title: "নেক্সাস গেমস্টোর",
      description: "পিসি গেমের জন্য তৈরি একটি হাই-পারফরম্যান্স ডিজিটাল স্টোর, যেখানে ডার্ক মোড এবং সুন্দর অ্যানিমেশন রয়েছে।",
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
      title: "রেটিনাল প্যাথলজি এআই",
      description: "রেটিনার ছবি বিশ্লেষণ এবং রোগ নির্ণয়ের জন্য একটি অত্যাধুনিক ডিপ লার্নিং সিস্টেম।",
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
      title: "ফ্রন্টএন্ড রি-আর্কিটেকচারে নেতৃত্ব প্রদান",
      year: "২০২৩",
      description: "সফলভাবে একটি মনোলিথিক রিঅ্যাক্ট অ্যাপকে নেক্সট.জেএস আর্কিটেকচারে রূপান্তর করেছি, যার ফলে লোড টাইম ৪০% উন্নত হয়েছে।"
    },
    {
      id: "a2",
      title: "রিঅ্যাক্ট অ্যাডভান্সডে স্পিকার",
      year: "২০২২",
      description: "'স্কেল অনুযায়ী মাইক্রো-ফ্রন্টএন্ড আর্কিটেকচার' বিষয়ে ১০০০-এর বেশি ডেভেলপারের সামনে বক্তব্য রেখেছি।"
    },
    {
      id: "a3",
      title: "ওপেন সোর্স কন্ট্রিবিউটর",
      year: "২০২১ - বর্তমান",
      description: "রিঅ্যাক্ট ইকোসিস্টেমের কয়েকটি জনপ্রিয় লাইব্রেরিতে কন্ট্রিবিউট করেছি, যার সাপ্তাহিক ডাউনলোড ৫০ হাজারেরও বেশি।"
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার",
      company: "ফ্রিল্যান্স / স্বাধীন",
      duration: "২০২০ - বর্তমান",
      description: [
        "বিভিন্ন ক্লায়েন্টের জন্য ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন এবং ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ তৈরি করেছি।",
        "রেটিনাল প্যাথলজি এবং বিজনেস সিমুলেশনের জন্য এআই মডেল ডেভেলপ করেছি।",
        "মেডিকেল ইন্টারপ্রেটিবিলিটির জন্য এক্সএআই (XAI) বাস্তবায়ন করেছি।"
      ],
      techStack: ["React", "Python", "Node.js", "TensorFlow", "React Native"]
    },
    {
      id: "e2",
      role: "ব্যাকএন্ড এবং সিস্টেমস ইঞ্জিনিয়ার",
      company: "টেক সলিউশনস ইনকর্পোরেটেড",
      duration: "২০১৮ - ২০২০",
      description: [
        "পাইথন এবং জ্যাঙ্গো ব্যবহার করে হাইলি স্কেলেবল রেস্ট এপিআই (REST API) এবং মাইক্রোসার্ভিস ডিজাইন করেছি।",
        "ডেটাবেস কুয়েরি অপ্টিমাইজ করেছি, যার ফলে সিস্টেমের কর্মক্ষমতা ৪০% বৃদ্ধি পেয়েছে।"
      ],
      techStack: ["Python", "Django", "PostgreSQL", "Docker"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "বি.এসসি. ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
      institution: "ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি",
      duration: "২০১৮ - ২০২২",
      description: "অনার্স সহ স্নাতক। অ্যালগরিদম, সিস্টেম আর্কিটেকচার এবং মেশিন লার্নিং-এ ফোকাস ছিল।"
    },
    {
      id: "edu2",
      degree: "হায়ার সেকেন্ডারি সার্টিফিকেট",
      institution: "ঢাকা সিটি কলেজ",
      duration: "২০১৬ - ২০১৮",
      description: "বিজ্ঞান বিভাগ, ফোকাস ছিল গণিত এবং পদার্থবিজ্ঞানে।"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "সারাহ জেনকিন্স",
      role: "সিটিও, টেকনোভা",
      feedback: "অ্যালেক্স এমন একজন অসাধারণ ইঞ্জিনিয়ার, যে টেকনিক্যাল আর্কিটেকচার এবং ইউজার এক্সপেরিয়েন্স দুটোই খুব ভালো বোঝে।",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "মার্কাস চেন",
      role: "প্রোডাক্ট লিড, ইনোভেট",
      feedback: "অ্যালেক্সের সাথে কাজ করাটা ছিল ফ্রন্টএন্ড ডেভেলপমেন্টের মাস্টারক্লাস। তার নিখুঁত কাজের প্রশংসা না করলেই নয়।",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "এলেনা রদ্রিগেজ",
      role: "ডিজাইন ডিরেক্টর",
      feedback: "অবশেষে এমন একজন ইঞ্জিনিয়ার পেলাম যে সত্যিই ডিজাইন প্রসেসকে সম্মান করে। সে আমাদের ফিগমা ফাইলগুলোকে নিখুঁতভাবে জীবন্ত করেছে।",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  ]
};
