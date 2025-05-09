/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { AbilityChange } from './AbilityChange.ts'
import type { AbilityEffectText } from './AbilityEffectText.ts'
import type { AbilityFlavorText } from './AbilityFlavorText.ts'
import type { AbilityName } from './AbilityName.ts'
import type { GenerationSummary } from './GenerationSummary.ts'

export type AbilityDetail = {
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
   * @type boolean | undefined
   */
  is_main_series?: boolean | undefined
  /**
   * @type object
   */
  generation: GenerationSummary
  /**
   * @type array
   */
  readonly names: AbilityName[]
  /**
   * @type array
   */
  readonly effect_entries: AbilityEffectText[]
  /**
   * @type array
   */
  readonly effect_changes: AbilityChange[]
  /**
   * @type array
   */
  readonly flavor_text_entries: AbilityFlavorText[]
  /**
   * @type array
   */
  readonly pokemon: {
    /**
     * @type boolean
     */
    is_hidden: boolean
    /**
     * @type integer, int32
     */
    slot: number
    /**
     * @type object
     */
    pokemon: {
      /**
       * @type string
       */
      name: string
      /**
       * @type string, uri
       */
      url: string
    }
  }[]
}