/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { MoveMetaAilmentName } from './MoveMetaAilmentName.ts'

export type MoveMetaAilmentDetail = {
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
  readonly moves: {
    /**
     * @type string
     */
    name: string
    /**
     * @type string, uri
     */
    url: string
  }[]
  /**
   * @type array
   */
  readonly names: MoveMetaAilmentName[]
}