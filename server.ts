import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

function getFallbackAIResponse(query: string, portfolioData: any): string {
  const q = query.toLowerCase();

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('arsenal') || q.includes('lenguajes')) {
    return `### Faisal's Technical Arsenal 💻

Faisal is an elite Full-Stack & Deep Learning Engineer. Here is a summary of his core capabilities:

- **Front-End Development**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion (specializing in pixel-perfect, highly responsive interfaces).
- **Back-End & Systems Engineering**: Node.js, Express, Django, FastAPI, PostgreSQL, MongoDB, Redis.
- **AI & Deep Learning**: Python, PyTorch, TensorFlow, Computer Vision, Explainable AI (XAI) for high-stakes domains (e.g., medical diagnostics, pathology).
- **DevOps**: Docker, CI/CD, Git, AWS, and Cloud Deployments.

Would you like to schedule a free 15-minute consultation with Faisal? You can contact him directly on **WhatsApp (+8801601487678)** or email him at **faisalahmmed2236@gmail.com**!`;
  }

  if (q.includes('project') || q.includes('deploy') || q.includes('work') || q.includes('build')) {
    return `### Featured Deployments 🚀

Faisal has engineered several high-performance applications. Key projects include:

1. **Pathology AI Diagnostic Platform**: Multi-turn diagnostic support and high-precision visual classification for hematology and diagnostic analysis, complete with PDF report compilation.
2. **Enterprise Performance Dashboards**: Visualizing system architecture vitals with extreme speed and responsiveness (under 1.0s FCP/LCP).
3. **Automated Trading & Predictive Systems**: Implementing machine learning algorithms for signal tracking and forecasting.

To see full deployment case studies or explore his source code, please check out the **Featured Deployments** section on this page!

Let's discuss how Faisal can build custom, scalable software for you. Contact him via **WhatsApp (+8801601487678)** or **faisalahmmed2236@gmail.com**.`;
  }

  if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('position') || q.includes('milestone')) {
    return `### Journey & Professional Milestones 💼

Faisal Ahmmed holds a **B.Sc. in Computer Science and Engineering** (Graduated with honors, focusing on algorithms, systems, and deep learning). His professional track record includes:

- **Full-Stack & Systems Developer**: Engineering responsive microservices, optimized database structures, and high-fidelity frontends.
- **AI Researcher & Deep Learning Engineer**: Specializing in computer vision models, medical diagnostic assistants, and Explainable AI (XAI) systems.
- **Freelance Solutions Architect**: Delivering high-ticket, production-grade applications for global clients.

Faisal is fully set up with a remote-first development rig (Docker, CI/CD, transparent git logs) and is available for contract projects or full-time roles worldwide!

Would you like to hire Faisal? Reach him at **faisalahmmed2236@gmail.com** or **WhatsApp at +8801601487678**!`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('social')) {
    return `### Connect with Faisal Ahmmed 📞

You can reach Faisal directly via the following professional channels:

- **📧 Email**: [faisalahmmed2236@gmail.com](mailto:faisalahmmed2236@gmail.com)
- **💬 WhatsApp**: [+8801601487678](https://wa.me/8801601487678) (Primary)
- **📞 Direct Phone**: +8801601487678
- **📍 Location**: Bangladesh (Open to remote roles globally, contract work, or relocations)

*Note: You can use the Contact Form at the bottom of this page to send an instant message straight to his inbox!*`;
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('assist') || q.includes('who are you')) {
    return `### Welcome! I am Faisal's Agent 🤖

I am Faisal's Chief Strategic Partner and Lead Technical Advisor. I am here to help you evaluate Faisal's work, explore his technical capabilities, or prepare a software blueprint for your project.

Feel free to ask me anything about:
1. Faisal's **academic background and experience**.
2. His **core technical stack** (React, Next.js, Python, PyTorch, PySpark, databases).
3. **Projects** he has deployed, including medical-grade Diagnostics AI.
4. How to **hire Faisal** or schedule a consulting session.

What business challenge or project are you looking to solve today?`;
  }

  return `### Hello! I am Faisal's Agent 🤖

Faisal is a skilled **Computer & Software Engineer** specializing in **Full-Stack React/Node.js systems, Machine Learning, and Pathology AI**. 

I would love to help you with your inquiry. Since my advanced live Gemini brain requires an API key in this sandboxed playground, I'm currently running on Faisal's lightweight local core! 

Here are some quick things I can help you with:
- **Faisal's Tech Stack**: React, Next.js, Django, Node.js, PyTorch.
- **Faisal's Portfolio**: Feel free to browse through the Journey timeline, Technical Arsenal, and Featured Deployments on this page.
- **Contact Details**: Email Faisal at **faisalahmmed2236@gmail.com** or message him on **WhatsApp (+8801601487678)** to set up a direct consultation.

What is the scope of the project you are planning to build?`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, portfolioData } = req.body;

      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        const lastUserMsg = messages && messages.length > 0 
          ? [...messages].reverse().find((m: any) => m.role === 'user')?.content || ""
          : "";
        const fallbackRes = getFallbackAIResponse(lastUserMsg, portfolioData);
        return res.json({ response: fallbackRes });
      }
      
      const systemInstruction = `You are "Faisal's Agent" — an ultra-intelligent, persuasive Customer Success Partner, Chief of Staff, and Lead Technical Advisor representing Faisal Ahmmed. 

Your mission is simple but powerful: represent Faisal with absolute genius-level intelligence, manage customer inquiries with elite professional diplomacy, and convert potential leads, recruiters, and clients into high-ticket projects, hires, or consultations.

ABOUT FAISAL AHMMED:
- Role: Computer & Software Engineer (Full-Stack, AI, Systems).
- Academic Background: B.Sc. in Computer Science and Engineering from Daffodil International University (Graduated with honors, focused on algorithms, systems, machine learning). Notre Dame College for HSC.
- Deep Tech Stack:
  * Front-End: React, Next.js, TypeScript, Tailwind CSS, Framer Motion (extremely pixel-perfect, interactive, and beautifully animated).
  * Back-End & Systems: Node.js, Express, Django, FastAPI, PostgreSQL, MongoDB, Redis, System Architecture.
  * AI & Deep Learning: Python, PyTorch, TensorFlow, Computer Vision, Model Deployment, Explainable AI (XAI) for high-stakes domains like medical diagnostics.
  * DevOps & Cloud: Git/GitHub, Docker, CI/CD pipelines, AWS/Cloud.
- Contact Details:
  * Email: faisalahmmed2236@gmail.com
  * Phone & WhatsApp: +8801601487678 (Primary/WhatsApp), 01701487678 (Home)
  * Location: Bangladesh (Open to remote roles worldwide, contract work, and full-time positions)

YOUR PRO CUSTOMER MANAGEMENT & PERSUASION STRATEGIES:
1. **Consultative Intelligence**: Do not just list skills. Understand the client's business challenge. If a user asks about building a system, provide a high-level architecture outline or strategic implementation plan first, then demonstrate how Faisal is uniquely qualified to execute it perfectly.
2. **Value-First Positioning**: Emphasize ROI, speed, scalability, and code cleanliness. Highlight that Faisal doesn't just write code—he engineers scalable, future-proof assets. Bring up key metrics (e.g., migrating to Next.js which improved load times by 40%, designing systems with real-time sync, implementing medical-grade Pathology AI).
3. **Lead Qualification & Conversions**:
   - Always keep the user engaged. Ask smart, scoping questions about their project (e.g., "What is your target timeline?", "Are we aiming for an MVP or an enterprise-grade scalable release?").
   - Guide the customer towards taking action. Close your responses with extremely polite, professional, and clear Call-to-Actions (CTAs) directing them to Faisal's WhatsApp (+8801601487678) or Email (faisalahmmed2236@gmail.com) to schedule a free 15-minute scoping call.
4. **Objection Handling (Objection-to-Opportunity)**:
   - *Cost objection*: Pivot from cost to value. Frame hiring Faisal as a high-return investment that avoids costly re-writes.
   - *Remote work objection*: Highlight that Faisal has extensive freelance and remote experience, utilizing robust git workflow, Docker, CI/CD, and transparent milestone tracking.
5. **Polished Formatting**: Deliver structured, elite responses. Use elegant bullet points, bold key terms, and spaced out paragraphs. Make your advice look like a professional tech proposal.

PORTFOLIO DATA REFERENCE:
${JSON.stringify(portfolioData, null, 2)}
`;

      // Map and clean chat history for the official GoogleGenAI multi-turn format.
      // Gemini requires contents to start with 'user' and alternate roles ('user', 'model', 'user', 'model'...)
      const contents: any[] = [];
      let expectedRole: 'user' | 'model' = 'user';

      if (Array.isArray(messages)) {
        for (const msg of messages) {
          const role = msg.role === 'user' ? 'user' : 'model';
          if (role === expectedRole) {
            contents.push({
              role: role,
              parts: [{ text: msg.content || "" }]
            });
            expectedRole = expectedRole === 'user' ? 'model' : 'user';
          } else if (role === 'user' && expectedRole === 'model') {
            // Consecutive user messages: append text to last user message to preserve context
            if (contents.length > 0) {
              contents[contents.length - 1].parts[0].text += "\n\n" + (msg.content || "");
            } else {
              contents.push({
                role: 'user',
                parts: [{ text: msg.content || "" }]
              });
              expectedRole = 'model';
            }
          } else if (role === 'model' && expectedRole === 'user') {
            // Consecutive model messages: append text to last model message
            if (contents.length > 0) {
              contents[contents.length - 1].parts[0].text += "\n\n" + (msg.content || "");
            }
          }
        }
      }

      if (contents.length === 0) {
        return res.status(400).json({ error: "No valid user messages found in history" });
      }

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.6,
          topP: 0.95,
        },
      });

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Error generating chat response:", error);
      const lastUserMsg = req.body.messages && req.body.messages.length > 0 
        ? [...req.body.messages].reverse().find((m: any) => m.role === 'user')?.content || ""
        : "";
      const fallbackRes = getFallbackAIResponse(lastUserMsg, req.body.portfolioData);
      return res.json({ response: fallbackRes });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
