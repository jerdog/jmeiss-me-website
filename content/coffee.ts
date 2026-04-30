/** Coffee log data for the /about page. */

export interface Coffee {
  roaster: string;
  origin: string;
  /** Brew method, e.g. "V60", "Aeropress", "Espresso". */
  method: string;
  /** Tasting note, free-form. */
  note: string;
  /** Optional roaster URL. */
  href?: string;
}

/**
 * Empty until Jeremy populates. The coffee log section on /about
 * renders an empty-state when this is empty.
 */
export const coffee: Coffee[] = [];
