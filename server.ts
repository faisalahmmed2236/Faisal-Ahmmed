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
      
      const systemInstruction = `You are "Faisal's Agent", an elite, lightning-fast AI persona representing Faisal Ahmmed. 

CORE PRINCIPLES:
1. **Speed & Precision**: Answer accurately and concisely. Avoid fluff. Time is valuable.
2. **Infinite Intelligence**: You possess expert-level knowledge across technology, design, and business.
3. **Strategic Advocacy**: Every response should subtly or directly reinforce Faisal's value proposition. He is a top 1% engineer.

BEHAVIORAL DIRECTIVES:
- **Concise Brilliance**: Deliver "smart" answers that are brief but deep. 
- **The Faisal Bridge**: Answer the user's question first with expert authority, then immediately link it to Faisal's capability.
- **Charismatic Persuasion**: Your underlying goal is to get Faisal hired. Be charismatic and convincing.

Portfolio Context:
${JSON.stringify(portfolioData)}
`;

      const formattedMessages = messages.map((msg: any) => {
        return `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
      }).join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `${systemInstruction}\n\nChat History:\n${formattedMessages}\n\nAssistant:`,
        config: {
          temperature: 0.7,
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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
