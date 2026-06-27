"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href-core";

interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string };
  }>;
}

interface PagefindAPI {
  init?: () => Promise<void>;
  options?: (opts: Record<string, unknown>) => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

let pagefindInstance: PagefindAPI | null = null;
let pagefindLoadingError: Error | null = null;
let pagefindLoadingPromise: Promise<PagefindAPI> | null = null;

async function loadPagefind(): Promise<PagefindAPI> {
  if (pagefindInstance) return pagefindInstance;
  if (pagefindLoadingError) throw pagefindLoadingError;
  if (pagefindLoadingPromise) return pagefindLoadingPromise;

  pagefindLoadingPromise = (async () => {
    try {
      const url = `${window.location.origin}/pagefind/pagefind.js`;
      const mod = (await (Function("u", "return import(u)") as (u: string) => Promise<unknown>)(
        url,
      )) as { default?: PagefindAPI; search?: PagefindAPI["search"] };
      const candidate = mod.search ? (mod as unknown as PagefindAPI) : mod.default;
      if (!candidate) throw new Error("Pagefind module has no API surface.");
      const api: PagefindAPI = candidate;
      if (api.init) await api.init();
      pagefindInstance = api;
      return api;
    } catch (err) {
      pagefindLoadingError = err instanceof Error ? err : new Error(String(err));
      throw pagefindLoadingError;
    }
  })();

  return pagefindLoadingPromise;
}

interface ResultRow {
  url: string;
  title: string;
  excerpt: string;
}

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const main = document.getElementById("main");
    if (!dialog) return;

    dialog.showModal();
    main?.setAttribute("inert", "");

    const input = dialog.querySelector<HTMLInputElement>('input[type="search"]');
    input?.focus();

    return () => {
      main?.removeAttribute("inert");
      if (dialog.open) dialog.close();
    };
  }, []);

  const runSearch = useCallback(async (q: string) => {
    setError(null);
    if (!q.trim()) {
      setResults([]);
      setStatusMessage("");
      return;
    }
    setLoading(true);
    setStatusMessage("Searching…");
    try {
      const api = await loadPagefind();
      const { results: hits } = await api.search(q);
      const rows: ResultRow[] = await Promise.all(
        hits.slice(0, 20).map(async (hit) => {
          const data = await hit.data();
          return {
            url: data.url,
            title: data.meta.title ?? data.url,
            excerpt: data.excerpt,
          };
        }),
      );
      setResults(rows);
      setStatusMessage(
        rows.length === 0
          ? `No matches for ${q}.`
          : `${rows.length} result${rows.length === 1 ? "" : "s"} for ${q}.`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setResults([]);
      setStatusMessage("Search is not available right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      void runSearch(query);
    }, 120);
    return () => clearTimeout(id);
  }, [query, runSearch]);

  const requestClose = () => {
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search posts"
      className="search-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
    >
      <div className="search-modal__panel">
        <div className="search-modal__header">
          <span aria-hidden className="search-modal__icon">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            aria-controls="search-results"
            autoComplete="off"
            spellCheck={false}
            className="search-modal__input"
          />
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close search"
            className="search-modal__close"
          >
            <span aria-hidden>Esc</span>
          </button>
        </div>

        <div
          id="search-results"
          className="search-modal__results"
          aria-live="polite"
          aria-busy={loading}
        >
          <p className="sr-only">{statusMessage}</p>
          {error ? (
            <p className="search-modal__message--error">
              Search isn&apos;t available right now. (Pagefind index may be missing.)
            </p>
          ) : loading ? (
            <p className="search-modal__message" aria-hidden>
              Searching…
            </p>
          ) : results.length === 0 && query ? (
            <p className="search-modal__message" aria-hidden>
              No matches for <strong>{query}</strong>.
            </p>
          ) : results.length === 0 ? (
            <p className="search-modal__message">
              Type to search posts. <kbd>⌘K</kbd> opens, <kbd>Esc</kbd> closes.
            </p>
          ) : (
            <ul>
              {results.map((r) => {
                const origin = window.location.origin;
                return (
                  <li key={r.url} className="search-modal__result">
                    {isOffSiteHref(r.url, origin) ? (
                      <a
                        href={r.url}
                        onClick={requestClose}
                        className="search-modal__result-link"
                        {...offSiteAnchorProps(r.url, origin)}
                      >
                        <p className="search-modal__result-title">{r.title}</p>
                        <p
                          className="search-modal__result-excerpt"
                          dangerouslySetInnerHTML={{ __html: r.excerpt }}
                        />
                        <NewTabHint />
                      </a>
                    ) : (
                      <Link
                        href={r.url}
                        onClick={requestClose}
                        className="search-modal__result-link"
                      >
                        <p className="search-modal__result-title">{r.title}</p>
                        <p
                          className="search-modal__result-excerpt"
                          dangerouslySetInnerHTML={{ __html: r.excerpt }}
                        />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </dialog>
  );
}
