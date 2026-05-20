import { useEffect, useState } from "react";
import { motion } from "motion/react";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogCard from "./BlogCard";
import { FaPlus, FaDev, FaArrowRightLong } from "react-icons/fa6";
import metadata from "@/content/metadata.json";

interface DevToUser {
  name: string;
  username: string;
  profile_image_90: string;
}

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  social_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  public_reactions_count: number;
  comments_count: number;
  user: DevToUser;
}

// Get username from settings
const DEV_TO_USERNAME = metadata.settings?.blogs?.devToUsername || "username";

// Check if we're in development or production
const isDev = import.meta.env.DEV;

export default function BlogsContent() {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        // In development, call Dev.to API directly
        // In production, use the serverless function for better caching
        const url = isDev
          ? `https://dev.to/api/articles?username=${DEV_TO_USERNAME}`
          : `/api/devto-articles?username=${DEV_TO_USERNAME}`;

        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch articles: ${res.status}`);
        }
        
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
          Latest Articles
        </h1>
        <p className="text-sm text-zinc-400">
          Thoughts, learnings and insights from my journey as a developer.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-xl border border-red-800/40 bg-red-900/20 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      )}

      {/* Articles Grid */}
      {!loading && !error && (
        <>
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
              >
                <BlogCard article={article} />
              </motion.div>
            ))}
          </div>

          {/* More Coming Soon */}
          <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-800/60 bg-zinc-900/10 p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/40 bg-zinc-900/40">
              <FaPlus className="h-6 w-6 text-zinc-600" />
            </div>
            <p className="text-sm font-medium text-zinc-400">
              More articles coming soon...
            </p>
            <p className="text-xs text-zinc-600">
              Stay tuned for more insights and tutorials!
            </p>
          </div>

          {/* DEV.to Follow CTA */}
          <a
            href={`https://dev.to/${DEV_TO_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-xl border border-zinc-800/40 bg-zinc-900/25 p-4 text-sm text-zinc-400 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/40 hover:text-zinc-300"
          >
            <FaDev className="h-5 w-5" />
            <span>Follow me on DEV.to for more articles</span>
            <FaArrowRightLong className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </>
      )}
    </div>
  );
}
