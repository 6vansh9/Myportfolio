import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { type BundledLanguage, codeToHtml } from "shiki";
import { FiFileText, FiCode, FiCopy, FiCheck } from "react-icons/fi";

interface MarkdownViewerProps {
  content: string;
  filename?: string;
}

type ViewMode = "preview" | "code";

function ShikiCodeBlock({ code, language }: { code: string; language: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, {
      lang: language as BundledLanguage,
      theme: "one-dark-pro",
    }).then((html) => {
      if (!cancelled && containerRef.current) {
        containerRef.current.innerHTML = html;
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div
      ref={containerRef}
      className="[&>pre]:!m-0 [&>pre]:!rounded-md [&>pre]:!bg-zinc-800/50"
    />
  );
}

export default function MarkdownViewer({
  content,
  filename = "README.md",
}: MarkdownViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [copied, setCopied] = useState(false);

  const lines = content.split("\n").length;
  const bytes = new Blob([content]).size;
  const sizeDisplay =
    bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-zinc-700/50 bg-zinc-900/50 backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-700/50 bg-zinc-800/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <FiFileText className="text-zinc-400" />
          <span className="font-mono text-sm font-medium text-zinc-200">
            {filename}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700/50 bg-zinc-800/50 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
          title="Copy content"
        >
          {copied ? (
            <FiCheck className="h-4 w-4 text-green-500" />
          ) : (
            <FiCopy className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-700/50 bg-zinc-800/20 px-4 py-2">
        <div className="flex items-center gap-1">
          {/* View Mode Toggle */}
          <div className="flex overflow-hidden rounded-md border border-zinc-700/50">
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "preview"
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200"
              }`}
            >
              <FiFileText className="h-3.5 w-3.5" />
              Preview
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-1.5 border-l border-zinc-700/50 px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "code"
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200"
              }`}
            >
              <FiCode className="h-3.5 w-3.5" />
              Code
            </button>
          </div>
        </div>

        {/* File Info */}
        <div className="font-mono text-xs text-zinc-500">
          {lines} lines · {sizeDisplay}
        </div>
      </div>

      {/* Content */}
      <div className="h-full">
        {viewMode === "preview" ? (
          <article className="prose prose-invert prose-zinc max-w-none p-6 prose-headings:border-b prose-headings:border-zinc-700/50 prose-headings:pb-2 prose-headings:font-semibold prose-headings:text-zinc-100 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-zinc-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-code:rounded prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-300 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-800/50 prose-pre:border prose-pre:border-zinc-700/50 prose-ul:text-zinc-300 prose-ol:text-zinc-300 prose-li:marker:text-zinc-500 prose-hr:border-zinc-700/50 prose-blockquote:border-l-zinc-600 prose-blockquote:text-zinc-400">
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match;
                  return !isInline ? (
                    <ShikiCodeBlock
                      code={String(children).replace(/\n$/, "")}
                      language={match[1]}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="relative">
            <pre className="overflow-auto p-4 font-mono text-sm leading-relaxed text-zinc-300">
              {content.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 w-8 select-none text-right text-zinc-600">
                    {i + 1}
                  </span>
                  <span className="flex-1 whitespace-pre-wrap break-all">
                    {line || " "}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};