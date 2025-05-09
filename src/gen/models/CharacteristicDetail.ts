/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { CharacteristicDescription } from './CharacteristicDescription.ts'
import type { StatSummary } from './StatSummary.ts'

export type CharacteristicDetail = {
  /**
   * @type integer
   */
  readonly id: number
  /**
   * @type integer
   */
  gene_modulo: number
  /**
   * @type array
   */
  readonly possible_values: number[]
  /**
   * @type object
   */
  highest_stat: StatSummary
  /**
   * @type array
   */
  readonly descriptions: CharacteristicDescription[]
}