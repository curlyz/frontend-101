/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { SuperContestEffectDetail } from '../SuperContestEffectDetail.ts'

export type SuperContestEffectRetrievePathParams = {
  /**
   * @description This parameter can be a string or an integer.
   * @type string
   */
  id: string
}

export type SuperContestEffectRetrieve200 = SuperContestEffectDetail

export type SuperContestEffectRetrieveQueryResponse = SuperContestEffectRetrieve200

export type SuperContestEffectRetrieveQuery = {
  Response: SuperContestEffectRetrieve200
  PathParams: SuperContestEffectRetrievePathParams
  Errors: any
}