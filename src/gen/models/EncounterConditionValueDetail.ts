/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { EncounterConditionSummary } from './EncounterConditionSummary.ts'
import type { EncounterConditionValueName } from './EncounterConditionValueName.ts'

export type EncounterConditionValueDetail = {
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
   * @type object
   */
  condition: EncounterConditionSummary
  /**
   * @type array
   */
  readonly names: EncounterConditionValueName[]
}