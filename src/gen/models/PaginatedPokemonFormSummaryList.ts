/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { PokemonFormSummary } from './PokemonFormSummary.ts'

export type PaginatedPokemonFormSummaryList = {
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
  results?: PokemonFormSummary[] | undefined
}