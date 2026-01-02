import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Gautam's AI assistant. Ask me anything about his work, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const requestBody = {
      contents: [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    try {
      const response = await fetch("https://llm-provider.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let assistantContent = "Sorry, I couldn't process that.";

      if (
        data.content &&
        Array.isArray(data.content) &&
        data.content.length > 0
      ) {
        assistantContent = data.content
          .filter((item: { type: string }) => item.type === "text")
          .map((item: { text: string }) => item.text)
          .join("\n");
      } else if (typeof data.content === "string") {
        assistantContent = data.content;
      } else if (typeof data.response === "string") {
        assistantContent = data.response;
      } else if (typeof data.message === "string") {
        assistantContent = data.message;
      } else if (typeof data.text === "string") {
        assistantContent = data.text;
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: assistantContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={`fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-900/90 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14 ${isOpen ? "pointer-events-none rotate-90 opacity-0" : "rotate-0 opacity-100"} `}
      >
        <img
          src="/assets/icons/ai-icon.svg"
          alt="AI Chat"
          className="h-6 w-6 sm:h-7 sm:w-7"
        />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        } /* Mobile: Full screen with padding */ /* Desktop: Bottom-right corner */ top-0 right-0 bottom-0 left-0 p-2 sm:top-auto sm:right-6 sm:bottom-6 sm:left-auto sm:h-[550px] sm:w-[400px] sm:p-0`}
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="hidden text-xs text-zinc-500 sm:inline">
                  Online
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
              {messages.map((message) => (
                <div
                  key={message.id}
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
                    className={`max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    <p className="text-xs whitespace-pre-wrap sm:text-sm">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-zinc-300 sm:h-8 sm:w-8">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-zinc-800 px-3 py-2 sm:px-4">
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                    <span className="text-xs text-zinc-400 sm:text-sm">
                      Thinking...
                    </span>
                  </div>
                </div>
              )}

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
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="focus:border-primary focus:ring-primary flex-1 rounded-xl border border-zinc-700/50 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:ring-1 focus:outline-none disabled:opacity-50 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="group bg-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center rounded-full text-black transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send
                className="h-4 w-4 text-black transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5"
                strokeWidth={2}
              />
            </button>
          </form>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
