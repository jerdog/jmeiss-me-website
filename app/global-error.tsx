"use client";

import Link from "next/link";
import "./globals.css";

/**
 * Root error boundary — must define its own <html> and <body> (Next.js requirement).
 * Matches root layout language so Pagefind and assistive tech see a consistent lang.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="body-shell">
        <main id="main" className="page-pad-not-found">
          <h1 className="page-title-not-found">Something went wrong.</h1>
          <p className="page-lede">
            An unexpected error occurred. You can try again, or head{" "}
            <Link href="/" className="text-link">
              home
            </Link>
            .
          </p>
          <button type="button" onClick={() => reset()} className="btn-primary mt-4">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
