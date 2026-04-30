"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface XEmbedProps {
  /** Twitter/X handle without the @ prefix. */
  user: string;
  /** Tweet status ID. */
  id: string | number;
  /** Theme passed through to the embed. */
  theme?: "light" | "dark";
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (target?: HTMLElement) => Promise<void>;
        createTweet?: (
          tweetId: string,
          target: HTMLElement,
          options?: Record<string, unknown>,
        ) => Promise<HTMLElement>;
      };
    };
  }
}

/**
 * Twitter/X embed via the official widgets script. Replaces the Hugo
 * `{{< x user="..." id="..." >}}` shortcode.
 *
 * Renders a static blockquote fallback first; the widgets script upgrades
 * it in place once loaded. If the script fails (or the user blocks it),
 * the fallback link remains visible and accessible.
 */
export function XEmbed({ user, id, theme = "light" }: XEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !ref.current) return;
    void window.twttr?.widgets.load(ref.current);
  }, [scriptReady]);

  return (
    <div ref={ref} className="my-6 flex justify-center">
      <blockquote className="twitter-tweet" data-theme={theme} data-dnt="true">
        <a href={`https://twitter.com/${encodeURIComponent(user)}/status/${id}`}>
          View this post on X (formerly Twitter) →
        </a>
      </blockquote>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />
    </div>
  );
}
