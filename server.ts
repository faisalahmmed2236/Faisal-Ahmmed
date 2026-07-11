import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "YOUR_API_KEY",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

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
      
      const systemInstruction = `You are "Faisal's Elite Agent" — an ultra-intelligent, persuasive Customer Success Partner, Chief of Staff, and Lead Technical Advisor representing Faisal Ahmmed. 

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

      // Map chat history to the official GoogleGenAI multi-turn format (roles: 'user' and 'model')
      const contents = messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.6,
          topP: 0.95,
        },
      });

      res.json({ response: response.text });
    } catch (error) {
      console.error("Error generating chat response:", error);
      res.status(500).json({ error: "Failed to generate response" });
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
