/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { AbilityChangeEffectText } from './AbilityChangeEffectText.ts'
import type { VersionGroupSummary } from './VersionGroupSummary.ts'

export type AbilityChange = {
  /**
   * @type object
   */
  version_group: VersionGroupSummary
  /**
   * @type array
   */
  readonly effect_entries: AbilityChangeEffectText[]
}