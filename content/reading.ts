/** Bookshelf data for the /about page. */

export type BookState = "Reading" | "Re-reading" | "Finished" | "Up next";

export interface Book {
  title: string;
  author: string;
  state: BookState;
  /** Optional link (publisher, bookshop.org, etc.). */
  href?: string;
}

/**
 * Empty until Jeremy populates. The bookshelf section on /about
 * renders an empty-state when this is empty.
 */
export const reading: Book[] = [];
