import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2, X, AlertTriangle, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import metadata from "@/content/metadata.json";
import { useWebLLM } from "@/hooks/useWebLLM";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const chatbotSettings = metadata.settings?.chatbot;
  const { status, progress, error, isSupported, initialize, generate } = useWebLLM();

  const welcomeMessage = chatbotSettings?.welcomeMessage || 
    "Hi! I'm an AI assistant. Ask me anything about this portfolio!";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: welcomeMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shiver, setShiver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitializedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const toastShownRef = useRef<{ download: boolean; ready: boolean }>({
    download: false,
    ready: false,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize the LLM engine on first button click
  const handleChatButtonClick = useCallback(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      initialize();
    }
    setIsOpen((prev) => !prev);
  }, [initialize]);

  // Show toast notifications based on status changes
  useEffect(() => {
    if (status === "downloading" && !toastShownRef.current.download) {
      toastShownRef.current.download = true;
      toast.info("Downloading AI model...", {
        description: "Feel free to explore the site — it'll be ready soon!",
        duration: 5000,
      });
    }
    if (status === "ready" && toastShownRef.current.download && !toastShownRef.current.ready) {
      toastShownRef.current.ready = true;
      toast.success("AI assistant is ready!", {
        description: "Open the chat to start a conversation.",
        duration: 4000,
      });
    }
  }, [status]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Shiver animation effect — only run when chat is closed and tab is visible
  useEffect(() => {
    if (isOpen) return;

    let intervalId: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;

    const start = () => {
      intervalId = setInterval(() => {
        setShiver(true);
        timeoutId = setTimeout(() => setShiver(false), 1000);
      }, 10000);
    };

    const stop = () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };

    const handleVisibility = () => {
      if (document.hidden) stop(); else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading || status !== "ready") return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
    };

    const assistantMessageId = `assistant-${Date.now()}`;

    // Batch: add user message + empty assistant message in one update
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantMessageId, role: "assistant", content: "" },
    ]);
    setInput("");
    setIsLoading(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      // Build conversation history (exclude welcome message and empty streaming message)
      const conversationHistory = [...messages, userMessage]
        .filter((m) => m.id !== "welcome" && m.content.length > 0)
        .map((m) => ({ role: m.role, content: m.content }));

      await generate(
        conversationHistory,
        (token) => {
          // Stream each token into the assistant message
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, content: m.content + token }
                : m
            )
          );
        },
        abortController.signal
      );
    } catch (err) {
      console.error("Generation error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                content:
                  m.content || "Sorry, something went wrong. Please try again.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [input, isLoading, status, messages, generate]);

  // Don't render if disabled or WebGPU not supported
  if (chatbotSettings?.enabled === false || !isSupported) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes shiver {
            0% { transform: translateX(0); }
            10% { transform: translateX(-2px); }
            20% { transform: translateX(2px); }
            30% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            50% { transform: translateX(-2px); }
            60% { transform: translateX(2px); }
            70% { transform: translateX(-2px); }
            80% { transform: translateX(2px); }
            90% { transform: translateX(-2px); }
            100% { transform: translateX(0); }
          }
          .glow-shiver {
            box-shadow:
              0 0 16px 8px #60a5fa;
          }
        `}
      </style>
      {/* Floating Toggle Button */}
      <button
        onClick={handleChatButtonClick}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={`fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-900/90 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14 ${isOpen ? "pointer-events-none rotate-90 opacity-0" : "rotate-0 opacity-100"} ${shiver ? "animate-shiver glow-shiver" : ""}`}
        style={shiver ? { animation: "shiver 1s linear" } : {}}
      >
        <img
          src="/assets/icons/ai-icon.svg"
          alt="AI Chat"
          className="h-6 w-6 sm:h-7 sm:w-7"
        />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-50 top-0 right-0 bottom-0 left-0 p-2 sm:top-auto sm:right-6 sm:bottom-6 sm:left-auto sm:h-[550px] sm:w-[400px] sm:p-0"
          >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/95 shadow-2xl backdrop-blur-md sm:h-[550px]">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-zinc-700/50 bg-zinc-800/50 px-3 py-2 sm:px-4 sm:py-3">
            <Bot className="text-primary h-5 w-5" />
            <span className="font-mono text-xs font-medium text-zinc-200 sm:text-sm">
              Gautam's AI Assistant
            </span>
            <span className="ml-auto flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "ready" || status === "generating" ? "animate-ping bg-green-400" : status === "error" ? "bg-red-400" : "animate-ping bg-yellow-400"}`}></span>
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${status === "ready" || status === "generating" ? "bg-green-500" : status === "error" ? "bg-red-500" : "bg-yellow-500"}`}></span>
                </span>
                <span className="hidden text-xs text-zinc-500 sm:inline">
                  {status === "ready" || status === "generating" ? "Local AI" : status === "error" ? "Error" : status === "downloading" ? "Downloading" : status === "loading" ? "Loading" : "Initializing"}
                </span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-700/50 hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Model Loading State */}
              {(status === "checking" || status === "downloading" || status === "loading") && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4"
                >
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                    <span className="text-sm font-medium text-zinc-200">
                      {status === "downloading" 
                        ? "Downloading AI Model..." 
                        : status === "loading"
                        ? "Loading AI Model..."
                        : "Initializing..."}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                      <motion.div
                        className="h-full rounded-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="max-w-[75%] truncate text-xs text-zinc-500">
                        {progress.text || "Preparing..."}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {progress.progress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-zinc-500">
                    {status === "downloading"
                      ? "First time only. Model is cached for instant reload."
                      : "Loading model into GPU..."}
                  </p>
                </motion.div>
              )}

              {/* Error State */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-red-900/50 bg-red-950/30 p-4"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <span className="text-sm font-medium text-red-300">
                      Failed to load AI model
                    </span>
                  </div>
                  <p className="text-center text-xs text-red-400/80">
                    {error || "Unknown error occurred"}
                  </p>
                  <button
                    onClick={() => {
                      hasInitializedRef.current = false;
                      initialize();
                      hasInitializedRef.current = true;
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-red-900/50 px-3 py-1.5 text-xs font-medium text-red-200 transition-colors hover:bg-red-900/70"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Retry
                  </button>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex gap-2 sm:gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
                      message.role === "user"
                        ? "bg-primary/20 text-primary"
                        : "bg-zinc-700 text-zinc-300"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      message.content ? (
                        <div className="prose prose-sm prose-invert max-w-none text-xs sm:text-sm">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            // Headings
                            h1: ({ children }) => (
                              <h1 className="mb-2 mt-3 text-base font-bold text-zinc-100 sm:text-lg">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="mb-2 mt-3 text-sm font-bold text-zinc-100 sm:text-base">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="mb-1 mt-2 text-xs font-semibold text-zinc-200 sm:text-sm">
                                {children}
                              </h3>
                            ),
                            // Paragraphs
                            p: ({ children }) => (
                              <p className="mb-2 leading-relaxed text-zinc-300">
                                {children}
                              </p>
                            ),
                            // Links
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 underline transition-colors"
                              >
                                {children}
                              </a>
                            ),
                            // Lists
                            ul: ({ children }) => (
                              <ul className="mb-2 ml-4 list-disc space-y-1 text-zinc-300">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-2 ml-4 list-decimal space-y-1 text-zinc-300">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-zinc-300">{children}</li>
                            ),
                            // Code
                            code: ({ className, children }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="rounded bg-zinc-700/50 px-1 py-0.5 text-xs text-primary">
                                  {children}
                                </code>
                              ) : (
                                <code className="block overflow-x-auto rounded-lg bg-zinc-950 p-2 text-xs text-zinc-300">
                                  {children}
                                </code>
                              );
                            },
                            pre: ({ children }) => (
                              <pre className="my-2 overflow-x-auto rounded-lg bg-zinc-950 p-2 text-xs">
                                {children}
                              </pre>
                            ),
                            // Blockquote
                            blockquote: ({ children }) => (
                              <blockquote className="border-primary/50 my-2 border-l-2 pl-3 text-zinc-400 italic">
                                {children}
                              </blockquote>
                            ),
                            // Strong & Emphasis
                            strong: ({ children }) => (
                              <strong className="font-semibold text-zinc-100">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => (
                              <em className="text-zinc-300 italic">{children}</em>
                            ),
                            // Horizontal Rule
                            hr: () => (
                              <hr className="my-3 border-zinc-700" />
                            ),
                            // Table
                            table: ({ children }) => (
                              <div className="my-2 overflow-x-auto">
                                <table className="min-w-full text-xs">
                                  {children}
                                </table>
                              </div>
                            ),
                            th: ({ children }) => (
                              <th className="border border-zinc-700 bg-zinc-800 px-2 py-1 text-left text-zinc-200">
                                {children}
                              </th>
                            ),
                            td: ({ children }) => (
                              <td className="border border-zinc-700 px-2 py-1 text-zinc-300">
                                {children}
                              </td>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
                          <span className="text-xs text-zinc-400">Generating...</span>
                        </div>
                      )
                    ) : (
                      <p className="text-xs whitespace-pre-wrap sm:text-sm">
                        {message.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}


              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-zinc-700/50 bg-zinc-800/50 p-2 sm:p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                status === "ready" || status === "generating"
                  ? "Ask me anything..."
                  : status === "downloading"
                  ? "Downloading AI model..."
                  : status === "loading"
                  ? "Loading AI model..."
                  : status === "error"
                  ? "Model failed to load"
                  : "Initializing..."
              }
              disabled={isLoading || status !== "ready"}
              className="focus:border-primary focus:ring-primary flex-1 rounded-xl border border-zinc-700/50 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:ring-1 focus:outline-none disabled:opacity-50 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || status !== "ready"}
              className="group bg-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center rounded-full text-black transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send
                className="h-4 w-4 text-black transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5"
                strokeWidth={2}
              />
            </button>
          </form>
        </div>
      </motion.div>
      )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
