/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { VersionGroupSummary } from './VersionGroupSummary.ts'
import type { VersionName } from './VersionName.ts'

/**
 * @description Should have a link to Version Group info but the Circular\ndependency and compilation order fight eachother and I\'m\nnot sure how to add anything other than a hyperlink
 */
export type VersionDetail = {
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
  readonly names: VersionName[]
  /**
   * @type object
   */
  version_group: VersionGroupSummary
}