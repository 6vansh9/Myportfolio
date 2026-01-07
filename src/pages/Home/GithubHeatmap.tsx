"use client";

import React, { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import metadata from "@/content/metadata.json";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GithubApiResponse {
  contributions: ContributionDay[];
  total: {
    [year: string]: number;
  };
}

// Custom theme matching your portfolio's dark theme
const customTheme = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function GithubHeatmap() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  
  const { github } = metadata.home;

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const url = `https://github-contributions-api.jogruber.de/v4/${github.username}?y=${github.year}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json: GithubApiResponse = await response.json();

        if (!json.contributions || json.contributions.length === 0) {
          throw new Error("No contribution data found");
        }

        setData(json.contributions);

        const total = json.contributions.reduce((sum, day) => sum + day.count, 0);
        setTotalContributions(total);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch GitHub contributions:", err);
        setError("Failed to load GitHub contributions");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [github.username, github.year]);

  if (loading) {
    return (
      <div className="group relative backdrop-blur-xl overflow-hidden rounded-xl bg-zinc-900/30 border border-zinc-800/40 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="h-[120px] bg-zinc-800/50 rounded animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="group relative backdrop-blur-xl overflow-hidden rounded-xl bg-zinc-900/30 border border-zinc-800/40 p-4 sm:p-6">
        <div className="flex items-center gap-2 text-red-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative backdrop-blur-xl overflow-hidden rounded-xl bg-zinc-900/30 border border-zinc-800/40 p-4 sm:p-6 transition-all duration-300 hover:bg-zinc-900/35 hover:border-zinc-700/35">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <a
          href={`https://github.com/${github.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group/link"
        >
          <svg className="w-5 h-5 text-zinc-400 group-hover/link:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="text-sm font-medium text-zinc-300 group-hover/link:text-white transition-colors">
            @{github.username}
          </span>
        </a>
        <span className="text-xs text-zinc-500">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      {/* Heatmap - Using minimal props first, then adding extras */}
      <div className="overflow-x-auto scrollbar-hide">
        <ActivityCalendar
          data={data}
          theme={customTheme}
          colorScheme="dark"
          blockSize={12}
          blockMargin={4}
          blockRadius={2}
          fontSize={12}
          showWeekdayLabels={true}
          renderBlock={(block, activity) =>
            React.cloneElement(block, {
              title: `${activity.count} contribution${activity.count !== 1 ? 's' : ''} on ${formatDate(activity.date)}`,
            })
          }
        />
      </div>
    </div>
  );
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}