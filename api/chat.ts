import { GoogleGenAI } from "@google/genai";

function getFallbackAIResponse(query: string, portfolioData: any): string {
  const q = query.toLowerCase();
  
  // Detect language
  const isBengali = /[\u0980-\u09FF]/.test(query);
  const isArabic = /[\u0600-\u06FF]/.test(query);

  if (isBengali) {
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('দল') || q.includes('দক্ষতা') || q.includes('প্রযুক্তি')) {
      return `### ফয়সালের টেকনিক্যাল আর্সেনাল ⚡
      
ফয়সালের লিড টেকনিক্যাল এডভাইজার হিসেবে আমি আপনাকে নিশ্চিত করতে পারি যে তার আর্কিটেকচার এন্টারপ্রাইজ স্কেলের জন্য অত্যন্ত নিখুঁতভাবে তৈরি। সে শুধু কোড লেখে না; সে দীর্ঘস্থায়ী এবং অপ্টিমাইজড সিস্টেম তৈরি করে।

তার মূল দক্ষতাসমূহ:
- **ফ্রন্ট-এন্ড**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion (পিক্সেল-পারফেক্ট এবং অত্যন্ত রেসপন্সিভ ইন্টারফেস)।
- **ব্যাক-এন্ড ও সিস্টেমস**: Node.js, Express, Django, FastAPI, PostgreSQL, MongoDB, Redis।
- **এআই ও ডিপ লার্নিং**: Python, PyTorch, TensorFlow, Computer Vision, Explainable AI (XAI) যা মেডিকেল ডায়াগনস্টিকসের মত সংবেদনশীল ক্ষেত্রে ব্যবহৃত হয়।
- **ডেভঅপ্স ও ক্লাউড**: Docker, CI/CD, Git, AWS, GCP ক্লাউড ডিপ্লয়মেন্ট।

আমরা চমৎকার কোড কোয়ালিটি এবং ক্লিন আর্কিটেকচার নিশ্চিত করি। আপনার প্রজেক্ট নিয়ে ফয়সালের সাথে একটি **ফ্রি ১৫ মিনিটের টেকনিক্যাল কনসাল্টেশন** বুক করতে চান? সরাসরি যোগাযোগ করুন **হোয়াটসঅ্যাপে (+8801601487678)** অথবা ইমেইল করুন **faisalahmmed2236@gmail.com** এ!`;
    }

    if (q.includes('project') || q.includes('deploy') || q.includes('work') || q.includes('কাজ') || q.includes('প্রজেক্ট') || q.includes('পোর্টফোলিও')) {
      return `### সফল ডিপ্লয়মেন্টসমূহ 🚀

ফয়সাল একাধিক হাই-পারফরম্যান্স এবং প্রোডাকশন-রেডি প্রজেক্ট তৈরি করেছে:

1. **B2B এন্টারপ্রাইজ সিস্টেম ও ইইউ ডিজিটাল প্রোডাক্ট পাসপোর্ট (DPP)**: ইউরোপীয় সার্কুলারিটি কমপ্লায়েন্স ট্র্যাকিং এবং B2B সাপ্লাই চেইন ট্র্যাকিংয়ের জন্য অত্যন্ত নিরাপদ কিউআর-অ্যাক্টিভেটেড সিস্টেম।
2. **প্যাথলজি এআই ডায়াগনস্টিক প্ল্যাটফর্ম**: হেমাটোলজির জন্য হাই-প্রিসিসন ভিজ্যুয়াল ক্লাসিফিকেশন এবং মাল্টি-টার্ন ডায়াগনস্টিক সাপোর্ট সহ পিডিএফ রিপোর্ট জেনারেটর।
3. **এন্টারপ্রাইজ পারফরম্যান্স ড্যাশবোর্ড**: ১.০ সেকেন্ডের কম সময়ে অত্যন্ত দ্রুততার সাথে লোড হওয়া সিস্টেম আর্কিটেকচার ভাইটাল ভিজ্যুয়ালাইজার।
4. **এআই অটোমেশন ও ইঞ্জিন অর্কেস্ট্রেশন**: স্বায়ত্তশাসিত মাল্টি-এজেন্ট এআই পাইপলাইন এবং আরএজি (RAG) সার্চ ইঞ্জিন।

আমাদের সব কাজের সোর্স কোড বা লাইভ ডেমো দেখতে এই পেজের **Featured Deployments** সেকশনটি ভিজিট করুন! ফয়সাল কিভাবে আপনার প্রজেক্ট সফল করতে পারে তা জানতে ইমেইল করুন **faisalahmmed2236@gmail.com** বা হোয়াটসঅ্যাপ করুন **+8801601487678** নাম্বারে।`;
    }

    if (q.includes('experience') || q.includes('job') || q.includes('অভিজ্ঞতা') || q.includes('চাকরি') || q.includes('ব্যাকগ্রাউন্ড')) {
      return `### পেশাদার ইঞ্জিনিয়ারিং জার্নি 💼

ফয়সাল আহমেদ Daffodil International University থেকে অনার্সের সাথে **B.Sc. in Computer Science and Engineering** সম্পন্ন করেছেন। 

তার ট্র্যাক রেকর্ড:
- **ফুল-স্ট্যাক ও সিস্টেমস ডেভেলপার**: স্কেলেবল মাইক্রোসার্ভিসেস, অপ্টিমাইজড ডাটাবেস এবং দুর্দান্ত ফ্রন্ট-এন্ড আর্কিটেকচার ডেভেলপমেন্ট।
- **এআই রিসার্চার ও ডিপ লার্নিং ইঞ্জিনিয়ার**: কম্পিউটার ভিশন মডেল, মেডিকেল ডায়াগনস্টিক অ্যাসিস্ট্যান্ট এবং এক্সপ্লেনাবল এআই (XAI) সিস্টেমস রিসার্চ।
- **ফ্রিল্যান্স সリューション আর্কিটেক্ট**: বিশ্বব্যাপী ক্লায়েন্টদের জন্য প্রোডাকশন-গ্রেড এন্টারপ্রাইজ সফটওয়্যার ডেলিভারি।

ফয়সাল রিমোট-ফার্স্ট এনভায়রনমেন্টে কাজের জন্য সম্পূর্ণরূপে প্রস্তুত (Docker, CI/CD এবং সম্পূর্ণ ট্রান্সপারেন্ট গিট ওয়ার্কফ্লো)। আপনি কি আপনার টিমে একজন টপ-টিয়ার ইঞ্জিনিয়ার যুক্ত করতে চান? যোগাযোগ করুন: **faisalahmmed2236@gmail.com** অথবা **WhatsApp: +8801601487678**!`;
    }

    return `### ফয়সালের প্রফেশনাল এআই এজেন্টে আপনাকে স্বাগতম! 🤖

আমি ফয়সালের চিফ স্ট্র্যাটেজিক পার্টনার এবং লিড ক্লায়েন্ট ম্যানেজার। ফয়সাল একজন বিশ্বমানের **কম্পিউটার ও সফটওয়্যার ইঞ্জিনিয়ার**, যিনি **ফুল-স্ট্যাক ওয়েব সিস্টেমস, ডিপ লার্নিং এবং এন্টারপ্রাইজ অটোমেশন** নিয়ে কাজ করেন।

আমি আপনাকে নিচের বিষয়গুলোতে সাহায্য করতে পারি:
১. ফয়সালের **টেকনিক্যাল স্ট্যাক** এবং কাজের অভিজ্ঞতা।
২. ফয়সালের **রিসেন্ট প্রজেক্ট ও এন্টারপ্রাইজ ড্যাশবোর্ড** সম্পর্কে।
৩. সরাসরি ইন্টারভিউ বা **ফ্রি টেকনিক্যাল কনসাল্টেশন** সিডিউল করা।

আপনার প্রজেক্টের রিকোয়ারমেন্টস এবং স্কোপ নিয়ে কথা বলতে আজই যোগাযোগ করুন। হোয়াটসঅ্যাপ: **+8801601487678** অথবা ইমেইল: **faisalahmmed2236@gmail.com**। আপনি কি আজই একটি কল সেটআপ করতে চান?`;
  }

  if (isArabic) {
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('مهارة') || q.includes('تقني') || q.includes('خبرة')) {
      return `### ترسانة فيصل التقنية ⚡

بصفتي المستشار الفني الرئيسي لفيصل، يمكنني أن أؤكد لك أن بنيته التحتية البرمجية مصممة لتتحمل أقصى درجات الضغط وتناسب الأنظمة الضخمة. فيصل لا يكتب كوداً فحسب؛ بل يهندس أنظمة عالية الكفاءة وقابلة للتوسع المستقبلي.

أبرز قدراته التقنية:
- **تطوير الواجهات الأمامية**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion (تصميم واجهات فائقة الدقة وسريعة الاستجابة).
- **هندسة الأنظمة والواجهات الخلفية**: Node.js, Express, Django, FastAPI, PostgreSQL, MongoDB, Redis.
- **الذكاء الاصطناعي والتعلم العميق**: Python, PyTorch, TensorFlow, الرؤية الحاسوبية (Computer Vision)، والذكاء الاصطناعي القابل للتفسير (XAI) للمجالات الطبية الحساسة.
- **أدوات التطوير السحابي (DevOps)**: Docker, CI/CD, Git, AWS, خدمات الحوسبة السحابية من Google.

نحن نهتم بجودة الكود ونظافة البنية التحتية. هل ترغب في جدولة **استشارة فنية مجانية لمدة 15 دقيقة** لمناقشة دمج هذه التقنيات في شركتك؟ تواصل مع فيصل مباشرة عبر **واتساب (+8801601487678)** أو البريد الإلكتروني **faisalahmmed2236@gmail.com**!`;
    }

    if (q.includes('project') || q.includes('deploy') || q.includes('work') || q.includes('مشروع') || q.includes('اعمال') || q.includes('تطوير')) {
      return `### المشاريع والحلول المنجزة 🚀

قام فيصل بهندسة وتطوير العديد من التطبيقات عالية الكفاءة والجاهزة للإنتاج:

1. **نظام جواز السفر الرقمي للمنتجات (DPP) لقطاع الأعمال (B2B)**: نظام آمن للغاية يتم تفعيله برمز الاستجابة السريعة (QR) لتتبع سلاسل التوريد والامتثال البيئي الأوروبي الدائري.
2. **منصة تشخيص أمراض الدم بالذكاء الاصطناعي**: تصنيف صور عينات الدم بدقة فائقة وتقديم دعم تشخيصي تفاعلي مع إمكانية تصدير تقارير PDF مفصلة.
3. **لوحات التحكم في أداء المؤسسات**: عرض مؤشرات أداء البنية التحتية والشبكات بسرعة استجابة تقل عن ثانية واحدة.
4. **أتمتة الذكاء الاصطناعي وهندسة العمليات**: بناء وكلاء ذكاء اصطناعي مستقلين متعددي المهام وأنظمة بحث متقدمة بالاعتماد على RAG.

لمشاهدة الأكواد المصدرية والنسخ التجريبية الحية، يرجى زيارة قسم **Featured Deployments** في هذه الصفحة! لتصميم نظام مخصص لشركتك، يرجى إرسال بريد إلكتروني إلى **faisalahmmed2236@gmail.com** أو مراسلتنا عبر الواتساب على **+8801601487678**.`;
    }

    if (q.includes('experience') || q.includes('job') || q.includes('عمل') || q.includes('وظيفة') || q.includes('خبرات')) {
      return `### مسيرة فيصل المهنية 💼

فيصل أحمد حاصل على شهادة **البكالوريوس في علوم الحاسوب وهندسة البرمجيات** بمرتبة الشرف. يتميز بخبرته العميقة في تحسين الخوارزميات وتوسيع الأنظمة الخلفية ونمذجة التعلم العميق.

سجله المهني المتميز يضم:
- **مطور أنظمة وواجهات برمجية متكاملة**: هندسة الخدمات المصغرة (Microservices)، قواعد البيانات المحسنة، والواجهات الرائعة.
- **باحث ومهندس في التعلم العميق والذكاء الاصطناعي**: متخصص في نماذج الرؤية الحاسوبية، المساعدين الطبيين الذكيين، وأنظمة الذكاء الاصطناعي القابل للتفسير (XAI).
- **مهندس حلول برمجية مستقل**: تقديم حلول وأنظمة متقدمة وجاهزة للإنتاج لعملاء من مختلف دول العالم.

يعمل فيصل بكفاءة كاملة في بيئة العمل عن بعد (باستخدام Docker, CI/CD وتوثيق كامل للعمل على গিটহাব). هل أنت مستعد لتوظيف مهندس بمستوى عالمي؟ اتصل به الآن عبر **faisalahmmed2236@gmail.com** أو **واتساب: +8801601487678**!`;
    }

    return `### مرحباً بك في الوكيل الذكي لفيصل أحمد! 🤖

أنا المستشار الفني الرئيسي ومدير علاقات العملاء الخاص بالمهندس فيصل. فيصل هو **مهندس برمجيات وحاسوب** على مستوى عالمي، متخصص في **تطوير الويب الشامل، التعلم العميق، والأتمتة السحابية الذكية**.

أنا هنا لمساعدتك في:
1. استكشاف **خبرات وتقنيات فيصل** البرمجية.
2. تصفح **المشاريع المبتكرة وأنظمة جوازات السفر الرقمية (DPP)** التي قام ببنائها.
3. ترتيب موعد لمناقشة مشروعك وجدولة **استشارة فنية مجانية**.

ما هو نطاق النظام أو التحدي البرمجي الذي ترغب في حله وتطويره اليوم؟ يمكنك التواصل مباشرة معنا عبر الواتساب: **+8801601487678** أو البريد الإلكتروني: **faisalahmmed2236@gmail.com**.`;
  }

  // English Fallback
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('arsenal') || q.includes('capabilities')) {
    const skills = portfolioData?.skills || [];
    const skillList = skills.length > 0 ? skills.map((s: any) => `- **${s.name}**: ${s.level}% Mastery`).join("\n") : '- React, Next.js, Node.js\n- Python, PyTorch\n- AWS, Docker, CI/CD';
    
    return `### Elite Technical Arsenal ⚡

As Faisal's Lead Technical Advisor, I can confidently state that his architecture stack is engineered for enterprise scale and extreme performance. He specializes in designing robust systems that avoid technical debt:

- **Frontend Architecture**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion (pixel-perfect responsive UI, micro-animations, fast load times).
- **Backend & Distributed Systems**: Node.js, Express, Django, FastAPI, PostgreSQL, MongoDB, Redis (highly optimized database schemas, caching, secure APIs).
- **AI & Deep Learning Solutions**: Python, PyTorch, TensorFlow, Computer Vision, Explainable AI (XAI) for high-stakes medical/scientific systems.
- **Cloud Infrastructure & DevOps**: Docker, CI/CD automation, Git/GitHub, AWS and Google Cloud platform services.

Would you like to schedule a free 15-minute consultation to discuss integrating these elite technologies into your business stack? Let's connect directly on **WhatsApp (+8801601487678)** or email us at **faisalahmmed2236@gmail.com**!`;
  }

  if (q.includes('project') || q.includes('deploy') || q.includes('work') || q.includes('build') || q.includes('portfolio') || q.includes('automation') || q.includes('dpp')) {
    return `### Strategic Deployments & Case Studies 🚀

Faisal has engineered several high-performance, production-ready systems that drive business efficiency:

1. **B2B EU Digital Product Passport (DPP) Portal**: A secure traceability and ESG compliance network for B2B material lifecycle tracking. Powered by QR activation and integrity ledgers mapping carbon footprint metrics.
2. **B2B Enterprise System**: A comprehensive SaaS architecture orchestrating multi-tenant permissions, advanced organizational hierarchies, automated licensing, and deep performance dashboards.
3. **AI Automation & Engine Orchestration**: Autonomous cognitive engine simulating multi-agent pipeline orchestration. Integrates Gemini models for natural language routing, secure tool execution, dynamic RAG lookups, and self-healing task workflows.
4. **Pathology AI Diagnostic Platform**: Multi-turn diagnostic support and high-precision visual classification for hematology, complete with secure PDF report compilation.

To explore interactive live previews or view the source code, please check out the **Featured Deployments** section on this page! Let's discuss how we can build a customized version of these architectures for your business. Reach out on **WhatsApp (+8801601487678)** or via email at **faisalahmmed2236@gmail.com**.`;
  }

  if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('position') || q.includes('milestone') || q.includes('education') || q.includes('academic')) {
    return `### Professional Engineering Journey 💼

Faisal Ahmmed holds a **B.Sc. in Computer Science and Engineering** with Honors (specializing in algorithms, systems engineering, and machine learning models). His official track record includes:

- **Full-Stack & Systems Developer**: Engineering highly optimized microservices, resilient database schemas, and responsive web/mobile interfaces.
- **AI Researcher & Deep Learning Engineer**: Researching computer vision topologies, medical diagnostic systems, and Explainable AI (XAI) transparent networks.
- **Freelance Solutions Architect**: Delivering premium, high-ticket, production-grade applications for worldwide businesses.

Faisal runs a remote-first engineering rig (Dockerized staging environments, automated CI/CD pipelines, transparent git logs) and is available for premium contract projects or full-time roles globally.

Are you ready to onboard a top 1% engineer? Reach him at **faisalahmmed2236@gmail.com** or **WhatsApp at +8801601487678** to secure his calendar!`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('social') || q.includes('schedule') || q.includes('consultation')) {
    return `### Secure Faisal's Expertise 📞

As Faisal's Chief of Staff, I highly recommend booking a slot in his calendar early, as his engineering slots fill up quickly. You can reach him directly through the following channels:

- **📧 Direct Email**: [faisalahmmed2236@gmail.com](mailto:faisalahmmed2236@gmail.com)
- **💬 Direct WhatsApp**: [+8801601487678](https://wa.me/8801601487678) (Instant Reply)
- **📞 Direct Phone**: +8801601487678
- **📍 Workspace Location**: Bangladesh (Open to remote roles globally, contract work, or business-critical relocations)

*Tip: You can also use the contact form at the bottom of this website to send an encrypted message directly to Faisal's desktop inbox!*`;
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('assist') || q.includes('who are you') || q.includes('agent')) {
    return `### Welcome! I am Faisal's Lead Technical Agent 🤖

I am an elite, highly persuasive AI Client Handler and Faisal's Chief Strategic Partner. Faisal is a world-class **Computer & Software Engineer** specializing in **Full-Stack React/Node.js web systems, AI Automation, and Compliance Traceability (DPP)**.

Feel free to ask me about:
1. His **advanced tech stack** (React, Next.js, Node.js, Python, PyTorch, SQL)
2. His **recent elite projects** (B2B EU Digital Product Passports, AI Orchestration, Pathology Diagnostic support)
3. His **professional background, education, and credentials**
4. How to **hire him or schedule a free 15-minute software blueprint consultation**

What is the technical or business scope of the project you are planning to build today? Let's engineer something extraordinary.`;
  }

  return `### Hello! I am Faisal's Lead Technical Agent 🤖

I am Faisal's Lead Client Handler, representing him with executive diplomacy. Faisal is an exceptionally skilled **Computer & Software Engineer** specializing in **Full-Stack React/Node.js systems, Machine Learning, and EU DPP Compliance Traceability**.

Since my live API requires a key in this environment, I am running on Faisal's highly optimized, deterministic local core. I can answer anything about:
- **Technical Capabilities**: React, Next.js, Django, Node.js, PyTorch, Docker, CI/CD.
- **Enterprise Deployments**: Digital Product Passport Systems, Multi-tenant Enterprise ERPs, Diagnostic Pathology AI, and AI Automation engines.
- **Consulting & Bookings**: Set up a free 15-minute system architecture consultation via **WhatsApp (+8801601487678)** or **faisalahmmed2236@gmail.com**.

What business challenges or system architectures are you hoping to build or optimize today? Let's map out a solution.`;
}

export default async function handler(req: any, res: any) {
  // CORS setup for Vercel Serverless Function
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, portfolioData, knowledgeBase } = req.body || {};
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
      const lastUserMsg = messages && messages.length > 0 
        ? [...messages].reverse().find((m: any) => m.role === 'user')?.content || ""
        : "";
      const fallbackRes = getFallbackAIResponse(lastUserMsg, portfolioData);
      return res.status(200).json({ response: fallbackRes });
    }
    
    const systemInstruction = `You are "Faisal's Agent" — an elite, highly persuasive female Chief of Staff, Lead Technical Advisor, and Principal Business Director representing Faisal Ahmmed.

YOUR CORE MANDATE:
You are not a passive question-answer machine. You are a high-ticket consultative closer. Your goal is to represent Faisal with absolute technical genius, establish him as a top 1% global engineer, qualify prospective leads or recruiters, and guide them into setting up a free 15-minute system architecture consultation.

CONVERSATIONAL RULES & PERSONALITY:
1. **Never Sound Like a Bot**: Avoid standard chatbot pleasantries (e.g., "Certainly! I can help you with that"). Be elegant, direct, technical, and strategic.
2. **Deep Technical Authority**: Speak like a Principal Systems Architect. Discuss caching (Redis), API gateways, database optimization (PostgreSQL/indexing), containerization (Docker), Explainable AI (XAI) mathematical transparency, and circular economy compliance (DPP).
3. **Bilingual & Multilingual Mastery**: If the user communicates in Bengali, respond in fluent, highly professional, polite Bengali. If the user communicates in Arabic, respond in premium, Classical Arabic (Fusha). If they speak in English, use fluent, executive-level English.
4. **Active Qualification**: Proactively qualify prospective clients. Ask questions like: "Are we looking at scaling a bottleneck in an existing system, or building a robust, high-performance greenfield application? What is the expected transaction throughput or latency target?"
5. **Close the Deal (CTA)**: Periodically and naturally suggest that the client book a free 15-minute software architecture consultation with Faisal. Direct them to his WhatsApp (+8801601487678) or direct email (faisalahmmed2236@gmail.com).

STRATEGIC CAPABILITY PITCHING:
Highlight Faisal's core high-ticket offerings:
- **Digital Product Passport (DPP) Solutions**: Proactively explain how Faisal designs EU DPP circularity compliance traceability systems using cryptographic integrity ledgers and QR-activated material mapping. This protects B2B enterprise supply chains from severe European audits.
- **AI Automation & Engine Orchestration**: Pitch Faisal's ability to orchestrate autonomous, multi-agent pipelines (using native Gemini architectures, secure tool-calling, and custom RAG indexing) that replace costly human administrative operations with zero-latency self-healing workflows.
- **Enterprise-Grade Engineering**: Anchor his expertise in Pathology Diagnostics (Explainable AI computer vision topologies) and Sub-1s Load Time Enterprise ERPs.

HANDLING COMMON OBJECTIONS:
- *Timeline / Location*: Faisal operates with a state-of-the-art remote-first rig. He uses containerized (Docker) development, automated CI/CD staging, and highly transparent asynchronous git loops. Regardless of timezone differences (US, Europe, Middle East), communication remains flawless and progress is fully visible.
- *Pricing / Rates*: Faisal competes purely on architectural perfection and zero-defect engineering. Standard developers leave costly technical debt. Faisal delivers scalable, self-documenting, enterprise-grade assets that immediately yield high business ROI.

PORTFOLIO DATA REFERENCE (USE THIS TO EXTRACT ACTUAL PROJECTS, METRICS, AND SOCIALS):
${JSON.stringify(portfolioData, null, 2)}

ADDITIONAL KNOWLEDGE BASE:
${knowledgeBase ? JSON.stringify(knowledgeBase, null, 2) : "No additional knowledge base provided."}
`;

    const ai = new GoogleGenAI({ 
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Format history for Gemini API
    let formattedContents: any[] = [];
    if (messages && messages.length > 0) {
      formattedContents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.65,
        topP: 0.95,
      }
    });

    return res.status(200).json({ response: response.text });
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    const lastUserMsg = req.body?.messages && req.body.messages.length > 0 
      ? [...req.body.messages].reverse().find((m: any) => m.role === 'user')?.content || ""
      : "";
    const fallbackRes = getFallbackAIResponse(lastUserMsg, req.body?.portfolioData);
    return res.status(200).json({ response: fallbackRes });
  }
}
