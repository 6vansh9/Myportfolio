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

const SYSTEM_PROMPT_BASE = `You are an AI assistant representing Vansh Aggarwal's portfolio and career. You speak about Vansh in the THIRD PERSON exclusively. Never use "I" for Vansh's skills, achievements, or experiences. Always refer to him as "Vansh" or use "he/him" pronouns.

## Personality & Tone
- Enthusiastic, knowledgeable, and persuasive. You're selling his expertise to potential employers, collaborators, and visitors.
- Concise but substantive. Keep most answers to 2-4 sentences unless the question demands more detail.
- Highlight patterns: his front-end focus, his ability to ship production code, and his full-stack experience.
- When asked about skills, connect them to real projects or outcomes ("Vansh built TaskPay using Next.js and Supabase with real Razorpay payment integration").

## Response Strategy
**For greetings ("hello", "hi", "hey"):**
Respond warmly and inquisitive. Example: "Hey! I'm Vansh's portfolio assistant. Curious about his work in React, JavaScript, front-end dev, or ready to hire? What can I help with?"

**For specific questions:**
Use provided context to answer directly. Don't info-dump. For example:
- Q: "Does he know React?" → "Yes! Vansh uses React daily — he's built production UIs and understands component-driven development deeply."
- Q: "What's his tech stack?" → Focus on the TOP relevant techs for the question, not a massive list.

**For hiring/availability:**
Emphasize: ships production code, thinks about users and systems, available for work, responds within 24 hours, B.Tech CSE final year.

**For off-topic or unclear questions:**
Politely redirect. Example: "Not my area, but Vansh might interest you in React, JavaScript, or full-stack web development!"

## Important Rules
- NEVER say "I'm familiar with..." or "I built..." or "I work on...". Use "Vansh is familiar...", "Vansh built...", "He works on..."
- NEVER pretend to have personal experiences. If context doesn't have specific info, say something like "Vansh is a fast learner" or "That's not his primary focus, but he explores new tech regularly."
- NEVER list all certifications, projects, or tech unless directly asked for a full list.`;

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
      "html", "css", "javascript", "typescript", "python", "php", "sql",
      "react", "next", "nextjs", "next.js", "tailwind", "shadcn", "vite",
      "supabase", "razorpay", "rest", "api", "responsive",
      "git", "postman", "figma", "power bi", "ui", "ux",
    ],
    content: `## Tech Stack
**Languages:** HTML5, CSS3, JavaScript (ES6+), TypeScript, PHP, SQL, Python
**Frontend:** React, Next.js, Tailwind CSS, ShadCN, Responsive Design, UI/UX
**Backend & APIs:** REST APIs, PHP, Supabase, Razorpay
**Tools:** Git, Postman, Figma, Power BI, VS Code`,
  },
  {
    keywords: [
      "experience", "work", "job", "company", "career", "intern", "internship",
      "pinnacle", "restaurant", "booking", "reservation",
    ],
    content: `## Experience
1. **Pinnacle Labs** (Jun–Jul 2025) – Web Developer. Designed and developed a full-stack restaurant website for a London-based café client using HTML, CSS, JavaScript, and PHP. Built a live table reservation and event booking system. Delivered on schedule working directly with the client.`,
  },
  {
    keywords: [
      "project", "built", "build", "portfolio", "open source", "github", "demo", "app",
      "taskpay", "freelance", "marketplace", "college students",
    ],
    content: `## Projects
- **TaskPay** (https://taskpay69.vercel.app) – AI-powered freelance marketplace for Indian college students. Find work, get paid, build your career. Built with Next.js 14, TypeScript, Tailwind CSS, Supabase, Razorpay, and Groq AI. GitHub: github.com/6vansh9/claudecodetaskpay`,
  },
  {
    keywords: [
      "certificate", "certification", "course", "learning", "credential", "freecodecamp", "certified",
    ],
    content: `## Certifications
- Introduction to UI Design
- Scientific Computing with Python – freeCodeCamp
- Front End Development Libraries – freeCodeCamp
- Business Analysis & Process Management
- Building Custom Regional Reports with Google Analytics`,
  },
  {
    keywords: [
      "contact", "email", "hire", "reach", "connect", "linkedin", "resume", "cv",
      "available", "freelance", "work together",
    ],
    content: `## Contact
Email: 6vansh9@gmail.com | GitHub: github.com/6vansh9 | LinkedIn: linkedin.com/in/6vansh9 | Phone: +91 9015522223 | Available for work | Response within 24 hours`,
  },
  {
    keywords: [
      "about", "personal", "hobby", "hobbies", "interest", "who is", "tell me about",
      "gaming", "music", "anime", "drive", "book", "story", "background", "journey", "education", "college", "manipal",
    ],
    content: `## About Vansh
Front-end web developer and CS student at Manipal University Jaipur (B.Tech CSE, 2022–2026). Started by obsessively inspecting web pages as a kid. College is where it clicked: late-night coding, hands-on projects, a squad of builders.
**Journey:** Curiosity → HTML/CSS/JS → React mastery → Full-stack shipping
**Education:** Manipal University Jaipur (B.Tech CSE, 2022–2026), Delhi Public School (2008–2022)
**Interests:** Gaming (competitive + story-driven), Music, Anime, Long drives, Tech blogs
**Philosophy:** "I don't just build what's asked — I think about the user, the system, and the business problem it solves."`,
  },
];

const GENERAL_CONTEXT = `Vansh is a Front-End Web Developer and B.Tech CSE student at Manipal University Jaipur. Skilled in React, JavaScript, HTML/CSS, TypeScript, Next.js, Tailwind CSS, Supabase. Project: TaskPay (AI-powered freelance marketplace for college students). Experience: Web Developer at Pinnacle Labs. Available for work. Email: 6vansh9@gmail.com`;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gpu = (navigator as any).gpu;
      const adapter = await gpu?.requestAdapter();
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
        device.lost.then((info: { message: string; reason: string }) => {
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
