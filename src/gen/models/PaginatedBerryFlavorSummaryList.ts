/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { BerryFlavorSummary } from './BerryFlavorSummary.ts'

export type PaginatedBerryFlavorSummaryList = {
  /**
   * @type integer | undefined
   */
  count?: number | undefined
  /**
   * @type string, uri
   */
  next?: (string | null) | undefined
  /**
   * @type string, uri
   */
  previous?: (string | null) | undefined
  /**
   * @type array | undefined
   */
  results?: BerryFlavorSummary[] | undefined
}