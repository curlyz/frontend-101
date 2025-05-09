/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { MoveLearnMethodDescription } from './MoveLearnMethodDescription.ts'
import type { MoveLearnMethodName } from './MoveLearnMethodName.ts'

export type MoveLearnMethodDetail = {
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
  readonly names: MoveLearnMethodName[]
  /**
   * @type array
   */
  readonly descriptions: MoveLearnMethodDescription[]
  /**
   * @type array
   */
  readonly version_groups: {
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