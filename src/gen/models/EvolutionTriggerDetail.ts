/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { EvolutionTriggerName } from './EvolutionTriggerName.ts'

export type EvolutionTriggerDetail = {
  /**
   * @type integer
   */
  readonly id: number
  /**
   * @maxLength 200
   * @type string
   */
  name: string
  /**
   * @type array
   */
  readonly names: EvolutionTriggerName[]
  /**
   * @type array
   */
  readonly pokemon_species: {
    /**
     * @type string
     */
    name: string
    /**
     * @type string, uri
     */
    url: string
  }[]
}