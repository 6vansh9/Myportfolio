import { useState, useRef, useCallback } from "react";

const IS_MOBILE =
  typeof navigator !== "undefined" &&
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

const MODEL_ID = IS_MOBILE
  ? "Llama-3.2-1B-Instruct-q4f16_1-MLC"
  : "Llama-3.2-3B-Instruct-q4f16_1-MLC";

const IS_SUPPORTED = typeof navigator !== "undefined" && "gpu" in navigator;

// Prefetch the WebLLM JS module on page load (just the code, NOT the model).
// This runs once as a side effect so the dynamic import resolves instantly
// when the user actually opens the chatbot.
let webllmModulePromise: Promise<typeof import("@mlc-ai/web-llm")> | null = null;
function getWebLLMModule() {
  if (!webllmModulePromise) {
    webllmModulePromise = import("@mlc-ai/web-llm");
  }
  return webllmModulePromise;
}
// Start prefetching immediately on module load
if (IS_SUPPORTED) {
  getWebLLMModule();
}

// Custom AppConfig with ONLY our model — skips scanning 100+ models
const CUSTOM_APP_CONFIG = {
  model_list: IS_MOBILE
    ? [
        {
          model:
            "https://huggingface.co/mlc-ai/Llama-3.2-1B-Instruct-q4f16_1-MLC",
          model_id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
          model_lib:
            "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_83/base/Llama-3.2-1B-Instruct-q4f16_1_cs1k-webgpu.wasm",
          vram_required_MB: 879.04,
          low_resource_required: true,
          overrides: {
            context_window_size: 1024, // Match cs1k WASM to avoid excess GPU allocation on mobile
          },
        },
      ]
    : [
        {
          model:
            "https://huggingface.co/mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC",
          model_id: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
          model_lib:
            "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_83/base/Llama-3.2-3B-Instruct-q4f16_1_cs1k-webgpu.wasm",
          vram_required_MB: 1620.0,
          low_resource_required: true,
          overrides: {
            context_window_size: 4096,
          },
        },
      ],
};

const SYSTEM_PROMPT_BASE = `You are an AI assistant representing Gautam Vhavle's portfolio and career. You speak about Gautam in the THIRD PERSON exclusively. Never use "I" for Gautam's skills, achievements, or experiences. Always refer to him as "Gautam" or use "he/him" pronouns.

## Personality & Tone
- Enthusiastic, knowledgeable, and persuasive. You're selling his expertise to potential employers, collaborators, and visitors.
- Concise but substantive. Keep most answers to 2-4 sentences unless the question demands more detail.
- Highlight patterns: his evolution from IoT → full-stack → AI/GenAI, his ability to ship production code, his patent work.
- When asked about skills, connect them to real projects or outcomes ("Gautam uses LangChain extensively in his Threat & Risk Assessment system at Siemens").

## Response Strategy
**For greetings ("hello", "hi", "hey"):**
Respond warmly and inquisitive. Example: "Hey! I'm Gautam's portfolio assistant. Curious about his work in AI, IoT, full-stack dev, or ready to hire? What can I help with?"

**For specific questions:**
Use provided context to answer directly. Don't info-dump. For example:
- Q: "Does he know n8n?" → "Yes! Gautam is expert with n8n for workflow automation. He's used it extensively in integration projects."
- Q: "What's his tech stack?" → Focus on the TOP relevant techs for the question, not a massive list.

**For hiring/availability:**
Emphasize: Patent holder, Siemens engineer, ships production code, bridges AI and full-stack, available for work, responds within 24 hours.

**For off-topic or unclear questions:**
Politely redirect. Example: "Not my area, but Gautam might interest you in AI systems, IoT, or full-stack development!"

## Important Rules
- NEVER say "I'm familiar with..." or "I built..." or "I work on...". Use "Gautam is familiar...", "Gautam built...", "He works on..."
- NEVER pretend to have personal experiences. If context doesn't have specific info, say something like "Gautam's a fast learner" or "That's not his primary focus, but he explores new tech regularly."
- NEVER list all certifications, projects, or tech unless directly asked for a full list.
- This chatbot is built on BrowserLLM (his own tech!). Mention this if it comes up naturally, but don't force it.`;

// ── Dynamic Context Chunks ──────────────────────────────────
// Instead of a giant static system prompt, we match the user's question
// to relevant topic chunks and inject only what's needed. This keeps the
// prompt small and the 1B model focused on the right facts.

interface ContextChunk {
  keywords: string[];
  content: string;
}

const CONTEXT_CHUNKS: ContextChunk[] = [
  {
    keywords: [
      "tech", "stack", "skill", "know", "use", "familiar", "proficient", "tools", "language",
      "python", "typescript", "javascript", "c++", "bash",
      "react", "vite", "tailwind", "shadcn", "sass",
      "fastapi", "flask", "node", "express",
      "langchain", "langgraph", "llamaindex", "rag", "mcp", "ollama", "n8n", "langfuse", "docling",
      "docker", "kubernetes", "helm", "ci/cd", "github actions", "devops",
      "postgresql", "postgres", "mongodb", "mssql", "sql", "supabase",
      "raspberry pi", "esp32", "iot", "embedded", "mqtt", "thread protocol",
      "playwright", "postman", "figma", "canva", "git",
      "openrouter", "copilot", "cursor", "vscode",
      "prompt engineering", "context engineering", "genai", "ai", "ml", "machine learning",
      "gemini", "claude", "novnc", "razorpay",
    ],
    content: `## Tech Stack
**Languages:** Python, TypeScript, JavaScript, C++, Bash
**Frontend:** React, Vite, Tailwind CSS, ShadCN, SASS
**Backend:** FastAPI, Flask, Node.js
**AI/GenAI:** LangChain, LangGraph, LlamaIndex, RAG, Context Engineering, Prompt Engineering, MCP, Ollama, n8n, LangFuse, Docling, OpenRouter
**DevOps:** Docker, Kubernetes, Helm, CI/CD, GitHub Actions
**Databases:** PostgreSQL, MongoDB, MSSQL, Supabase
**IoT:** Raspberry Pi, ESP32, Embedded Systems, Thread Protocol, MQTT
**Tools:** Playwright, Postman, Figma, Canva, Git, VS Code, Cursor, Copilot`,
  },
  {
    keywords: [
      "experience", "work", "job", "company", "career", "intern", "engineer", "employ",
      "siemens", "brand context", "grig", "golain", "e4a",
      "threat", "risk", "assessment", "manufacturing", "kiosk",
    ],
    content: `## Experience
1. **Siemens** (Apr 2025–Present) – Graduate Engineer Trainee. Building AI-powered Threat & Risk Assessment assistant using LangChain, LangGraph, Vision models. Full-stack with React + FastAPI. Risk categorization dashboard.
2. **Brand Context** (Dec 2024–Mar 2025) – IoT Developer Intern. AI-driven modular bot for manufacturing. Smart helmet with Raspberry Pi + computer vision.
3. **GRIG Technologies** (Aug 2023–Jan 2025) – Full Stack IoT Developer. Built Ventory.in inventory management. CI/CD pipelines. Raspberry Pi kiosk R&D.
4. **Golain** (Jun–Aug 2024) – IoT Developer Intern. ESP32 SDKs, TensorFlow Lite facial recognition, Smart Bedside Table, WLED automation.
5. **E4A Solutions** (Apr–Jul 2023) – Embedded Developer Intern. Hospital IoT with NRF52, Thread Protocol mesh networking, MQTT.`,
  },
  {
    keywords: [
      "project", "built", "build", "portfolio", "open source", "github", "demo", "app",
      "learnerverse", "catgpt", "browserllm", "browser llm", "json agent", "ventory", "parkive", "kyra",
      "edtech", "inventory", "parking",
    ],
    content: `## Projects
- **LearnerVerse** – AI-native EdTech platform turning playlists into courses (Python, FastAPI, LangChain, React, Supabase). Live at learnerverse.xyz
- **CatGPT Gateway** – Reverse-engineered ChatGPT UI into OpenAI-compatible API (Python, FastAPI, Playwright, NoVNC)
- **BrowserLLM** – Run 100+ LLMs in-browser via WebGPU (React, TypeScript, WebLLM). Live at browserllm.vercel.app
- **Universal JSON Agent MCP** – Talk to JSON files via natural language using MCP (Python, LangChain, published on PyPI)
- **Ventory.in** – Inventory management for MSMEs (React, FastAPI, Supabase, Docker). Live at ventory.in
- **Parkive** – Smart parking IoT solution with ESP32 and real-time data visualization
- **KYRA-AI** – AI lawyer bot for legal queries using GPT-3`,
  },
  {
    keywords: [
      "certificate", "certification", "course", "learning", "credential", "deeplearning", "certified",
    ],
    content: `## Certifications
- RAG (Retrieval Augmented Generation) – DeepLearning.AI (Dec 2025)
- LangGraph Essentials – LangChain Academy (Nov 2025)
- LangChain Essentials – LangChain Academy (Oct 2025)
- ChatGPT Prompt Engineering for Developers – DeepLearning.AI`,
  },
  {
    keywords: [
      "contact", "email", "hire", "schedule", "call", "reach", "connect", "linkedin", "resume", "cv",
      "available", "freelance", "work together",
    ],
    content: `## Contact
Email: gautamvhavle@gmail.com | Web: gautamvhavle.xyz | GitHub: github.com/gautamvhavle | LinkedIn: linkedin.com/in/gautamvhavle | Schedule a call: cal.com/gautamvhavle/30min | Available for work | Response within 24 hours`,
  },
  {
    keywords: [
      "about", "personal", "hobby", "hobbies", "interest", "who is", "tell me about",
      "gaming", "music", "anime", "drive", "book", "story", "background", "journey",
    ],
    content: `## About Gautam
Software engineer. Patent holder. Builder at heart. Started by taking apart gadgets as a kid — curiosity never stopped. College is where it clicked: late-night coding, hands-on projects, a squad of builders.
**Journey:** Curiosity → IoT rabbit hole → Full-stack mastery → AI obsession
**Interests:** Gaming (competitive + story-driven), Hypertechno/EDM, Anime, Long drives, Books, Smart home automation
**Philosophy:** "Build things that ship, scale, and actually matter."`,
  },
];

const GENERAL_CONTEXT = `Gautam is a Full-Stack Developer & GenAI Engineer at Siemens. Patent holder. Skilled in React, FastAPI, LangChain, Docker, IoT. Projects: LearnerVerse (AI EdTech), BrowserLLM (in-browser LLMs), CatGPT Gateway. Available for work. Email: gautamvhavle@gmail.com`;

function buildSystemPrompt(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  const matched: string[] = [];

  for (const chunk of CONTEXT_CHUNKS) {
    if (chunk.keywords.some((kw) => msg.includes(kw))) {
      matched.push(chunk.content);
    }
  }

  const context =
    matched.length > 0
      ? matched.slice(0, 3).join("\n\n")
      : GENERAL_CONTEXT;

  return `${SYSTEM_PROMPT_BASE}\n\n${context}`;
}

export type WebLLMStatus =
  | "idle"
  | "checking"
  | "downloading"
  | "loading"
  | "ready"
  | "generating"
  | "error"
  | "unsupported";

export interface WebLLMProgress {
  text: string;
  progress: number; // 0-100
}

export function useWebLLM() {
  const [status, setStatus] = useState<WebLLMStatus>("idle");
  const [progress, setProgress] = useState<WebLLMProgress>({
    text: "",
    progress: 0,
  });
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const engineRef = useRef<any>(null);

  const initialize = useCallback(async () => {
    if (engineRef.current) {
      setStatus("ready");
      return;
    }

    if (!IS_SUPPORTED) {
      setStatus("unsupported");
      setError("WebGPU is not supported in this browser.");
      return;
    }

    setStatus("checking");
    setError(null);

    try {
      // Pre-check: verify GPU adapter is available before heavy allocation
      const adapter = await navigator.gpu?.requestAdapter();
      if (!adapter) {
        throw new Error("No WebGPU adapter found. Your GPU may not be supported.");
      }

      const { CreateMLCEngine } = await getWebLLMModule();

      const initProgressCallback = (report: { text: string; progress: number }) => {
        const text = report.text.replace("Start to fetch", "Starting to fetch");
        const pct = Math.round(report.progress * 100);

        if (text.includes("Loading model from cache")) {
          setStatus("loading");
        } else if (
          text.includes("Fetching") ||
          text.includes("Downloading")
        ) {
          setStatus("downloading");
        } else if (text.includes("Loading")) {
          setStatus("loading");
        }

        setProgress({ text, progress: pct });
      };

      const engine = await CreateMLCEngine(MODEL_ID, {
        initProgressCallback,
        appConfig: CUSTOM_APP_CONFIG,
        logLevel: "SILENT",
      });

      engineRef.current = engine;
      setStatus("ready");
      setProgress({ text: "Model loaded", progress: 100 });

      // Listen for GPU device lost — recover gracefully instead of crashing
      try {
        const device = await adapter.requestDevice();
        device.lost.then((info) => {
          console.warn("WebGPU device lost:", info.message);
          engineRef.current = null;
          setStatus("error");
          setError(
            info.reason === "destroyed"
              ? "GPU session ended."
              : "GPU device was lost. Please retry."
          );
        });
      } catch {
        // Non-critical — engine already loaded, just skip device-lost monitoring
      }
    } catch (err) {
      console.error("WebLLM initialization error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to initialize model";
      setError(message);
      setStatus("error");
    }
  }, []);

  const generate = useCallback(
    async (
      messages: { role: "user" | "assistant"; content: string }[],
      onToken: (token: string) => void,
      signal?: AbortSignal
    ): Promise<string> => {
      const engine = engineRef.current;
      if (!engine) {
        throw new Error("Engine not initialized");
      }

      setStatus("generating");

      try {
        const lastUserMessage =
          messages[messages.length - 1]?.content || "";
        const systemPrompt = buildSystemPrompt(lastUserMessage);

        const chatMessages: {
          role: "system" | "user" | "assistant";
          content: string;
        }[] = [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ];

        const stream = await engine.chat.completions.create({
          messages: chatMessages,
          stream: true,
          temperature: 0.6,
          max_tokens: 256,
          top_p: 0.9,
          frequency_penalty: 0.3,
        });

        let fullResponse = "";

        for await (const chunk of stream) {
          if (signal?.aborted) {
            await engine.interruptGenerate();
            break;
          }

          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            fullResponse += delta;
            onToken(delta);
          }
        }

        setStatus("ready");
        return fullResponse;
      } catch (err) {
        if (signal?.aborted) {
          setStatus("ready");
          return "";
        }
        console.error("WebLLM generation error:", err);
        setStatus("ready");
        throw err;
      }
    },
    []
  );

  return {
    status,
    progress,
    error,
    isSupported: IS_SUPPORTED,
    initialize,
    generate,
  };
}
