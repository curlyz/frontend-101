/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { PaginatedMachineSummaryList } from '../PaginatedMachineSummaryList.ts'

export type MachineListQueryParams = {
  /**
   * @description Number of results to return per page.
   * @type integer | undefined
   */
  limit?: number | undefined
  /**
   * @description The initial index from which to return the results.
   * @type integer | undefined
   */
  offset?: number | undefined
  /**
   * @description > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)\nCase-insensitive query applied on the `name` property.
   * @type string | undefined
   */
  q?: string | undefined
}

export type MachineList200 = PaginatedMachineSummaryList

export type MachineListQueryResponse = MachineList200

export type MachineListQuery = {
  Response: MachineList200
  QueryParams: MachineListQueryParams
  Errors: any
}