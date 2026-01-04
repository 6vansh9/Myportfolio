import { FaRegClock } from "react-icons/fa6";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegHeart, FaRegComments, FaArrowRightLong } from "react-icons/fa6";

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogCard({ article }: { article: DevToArticle }) {
  const coverImage = article.cover_image || article.social_image;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/25 backdrop-blur-lg transition-all duration-300 hover:bg-zinc-900/40 hover:border-zinc-700/50 hover:shadow-lg hover:shadow-zinc-900/20"
    >
      {/* Cover Image */}
      {coverImage && (
        <div className="relative aspect-[2/1] w-full overflow-hidden">
          <img
            src={coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
          
          {/* Reading time badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs text-zinc-300">
            <FaRegClock className="h-3.5 w-3.5" />
            {article.reading_time_minutes} min read
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta info */}
        <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <MdOutlineCalendarToday className="h-3.5 w-3.5" />
            {formatDate(article.published_at)}
          </span>
          <span className="text-zinc-700">•</span>
          <span className="flex items-center gap-1.5">
            <FaRegHeart className="h-3.5 w-3.5" />
            {article.public_reactions_count}
          </span>
          <span className="flex items-center gap-1.5">
            <FaRegComments className="h-3.5 w-3.5" />
            {article.comments_count}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-lg font-semibold text-zinc-100 transition-colors group-hover:text-white sm:text-xl">
          {article.title}
        </h2>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-2">
          {article.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {article.tag_list.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-zinc-700/50 bg-zinc-800/40 px-2 py-1 text-xs text-zinc-400 transition-colors group-hover:border-zinc-600/50 group-hover:text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500 transition-colors group-hover:text-zinc-300">
          <span>Read on DEV.to</span>

          <FaArrowRightLong className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
}