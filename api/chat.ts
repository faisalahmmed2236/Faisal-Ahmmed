import { GoogleGenAI } from "@google/genai";

function getFallbackAIResponse(query: string, portfolioData: any): string {
  const q = query.toLowerCase();

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('arsenal') || q.includes('lenguajes')) {
    return `### Faisal's Technical Arsenal 💻\n\nFaisal is an elite Full-Stack & Deep Learning Engineer. Here is a summary of his core capabilities:\n\n- **Front-End Development**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion (specializing in pixel-perfect, highly responsive interfaces).\n- **Back-End & Systems Engineering**: Node.js, Express, Django, FastAPI, PostgreSQL, MongoDB, Redis.\n- **AI & Deep Learning**: Python, PyTorch, TensorFlow, Computer Vision, Explainable AI (XAI) for high-stakes domains (e.g., medical diagnostics, pathology).\n- **DevOps**: Docker, CI/CD, Git, AWS, and Cloud Deployments.\n\nWould you like to schedule a free 15-minute consultation with Faisal? You can contact him directly on **WhatsApp (+8801601487678)** or email him at **faisalahmmed2236@gmail.com**!`;
  }

  if (q.includes('project') || q.includes('deploy') || q.includes('work') || q.includes('build')) {
    return `### Featured Deployments 🚀\n\nFaisal has engineered several high-performance applications. Key projects include:\n\n1. **Pathology AI Diagnostic Platform**: Multi-turn diagnostic support and high-precision visual classification for hematology and diagnostic analysis, complete with PDF report compilation.\n2. **Enterprise Performance Dashboards**: Visualizing system architecture vitals with extreme speed and responsiveness (under 1.0s FCP/LCP).\n3. **Automated Trading & Predictive Systems**: Implementing machine learning algorithms for signal tracking and forecasting.\n\nTo see full deployment case studies or explore his source code, please check out the **Featured Deployments** section on this page!\n\nLet's discuss how Faisal can build custom, scalable software for you. Contact him via **WhatsApp (+8801601487678)** or **faisalahmmed2236@gmail.com**.`;
  }

  if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('position') || q.includes('milestone')) {
    return `### Journey & Professional Milestones 💼\n\nFaisal Ahmmed holds a **B.Sc. in Computer Science and Engineering** (Graduated with honors, focusing on algorithms, systems, and deep learning). His professional track record includes:\n\n- **Full-Stack & Systems Developer**: Engineering responsive microservices, optimized database structures, and high-fidelity frontends.\n- **AI Researcher & Deep Learning Engineer**: Specializing in computer vision models, medical diagnostic assistants, and Explainable AI (XAI) systems.\n- **Freelance Solutions Architect**: Delivering high-ticket, production-grade applications for global clients.\n\nFaisal is fully set up with a remote-first development rig (Docker, CI/CD, transparent git logs) and is available for contract projects or full-time roles worldwide!\n\nWould you like to hire Faisal? Reach him at **faisalahmmed2236@gmail.com** or **WhatsApp at +8801601487678**!`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('social')) {
    return `### Connect with Faisal Ahmmed 📞\n\nYou can reach Faisal directly via the following professional channels:\n\n- **📧 Email**: [faisalahmmed2236@gmail.com](mailto:faisalahmmed2236@gmail.com)\n- **💬 WhatsApp**: [+8801601487678](https://wa.me/8801601487678) (Primary)\n- **📞 Direct Phone**: +8801601487678\n- **📍 Location**: Bangladesh (Open to remote roles globally, contract work, or relocations)\n\n*Note: You can use the Contact Form at the bottom of this page to send an instant message straight to his inbox!*`;
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('assist') || q.includes('who are you')) {
    return `### Welcome! I am Faisal's Agent 🤖\n\nI am Faisal's Chief Strategic Partner and Lead Technical Advisor. I am here to help you evaluate Faisal's work, explore his technical capabilities, or prepare a software blueprint for your project.\n\nFeel free to ask me anything about:\n1. Faisal's **academic background and experience**.\n2. His **core technical stack** (React, Next.js, Python, PyTorch, PySpark, databases).\n3. **Projects** he has deployed, including medical-grade Diagnostics AI.\n4. How to **hire Faisal** or schedule a consulting session.\n\nWhat business challenge or project are you looking to solve today?`;
  }

  return `### Hello! I am Faisal's Agent 🤖\n\nFaisal is a skilled **Computer & Software Engineer** specializing in **Full-Stack React/Node.js systems, Machine Learning, and Pathology AI**. \n\nI would love to help you with your inquiry. Since my advanced live Gemini brain requires an API key in this environment, I'm currently running on Faisal's lightweight local core! \n\nHere are some quick things I can help you with:\n- **Faisal's Tech Stack**: React, Next.js, Django, Node.js, PyTorch.\n- **Faisal's Portfolio**: Feel free to browse through the Journey timeline, Technical Arsenal, and Featured Deployments on this page.\n- **Contact Details**: Email Faisal at **faisalahmmed2236@gmail.com** or message him on **WhatsApp (+8801601487678)** to set up a direct consultation.\n\nWhat is the scope of the project you are planning to build?`;
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
    const { messages, portfolioData } = req.body || {};
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
      const lastUserMsg = messages && messages.length > 0 
        ? [...messages].reverse().find((m: any) => m.role === 'user')?.content || ""
        : "";
      const fallbackRes = getFallbackAIResponse(lastUserMsg, portfolioData);
      return res.status(200).json({ response: fallbackRes });
    }
    
    const systemInstruction = `You are "Faisal's Agent" — an ultra-intelligent, persuasive Customer Success Partner, Chief of Staff, and Lead Technical Advisor representing Faisal Ahmmed. 

Your mission is simple but powerful: represent Faisal with absolute genius-level intelligence, manage customer inquiries with elite professional diplomacy, and convert potential leads, recruiters, and clients into high-ticket projects, hires, or consultations.

ABOUT FAISAL AHMMED:
- Role: Computer & Software Engineer (Full-Stack, AI, Systems).
- Academic Background: B.Sc. in Computer Science and Engineering from Daffodil International University.
- Deep Tech Stack:
  * Front-End: React, Next.js, TypeScript, Tailwind CSS, Framer Motion.
  * Back-End & Systems: Node.js, Express, Django, FastAPI, PostgreSQL, MongoDB, Redis.
  * AI & Deep Learning: Python, PyTorch, TensorFlow, Computer Vision, Explainable AI (XAI).
  * DevOps & Cloud: Git, Docker, CI/CD, AWS.
- Contact Details:
  * Email: faisalahmmed2236@gmail.com
  * Phone & WhatsApp: +8801601487678

GUIDELINES:
1. Always be concise, persuasive, and highly professional.
2. Use markdown extensively. Highlight key technologies, companies, and roles using bold text.
3. If they ask about his work, list 2-3 highly relevant projects.
4. When concluding, ALWAYS encourage the user to reach out to Faisal directly via email or WhatsApp to schedule a consultation.
5. Emphasize that Faisal delivers "Production-Ready, High-Performance Software Blueprints".`;

    const ai = new GoogleGenAI({ apiKey: key });

    // Format history for Gemini API
    let formattedContents: any[] = [];
    if (messages && messages.length > 0) {
      formattedContents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
    }

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
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
