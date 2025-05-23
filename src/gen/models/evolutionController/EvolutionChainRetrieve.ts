/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { EvolutionChainDetail } from '../EvolutionChainDetail.ts'

export type EvolutionChainRetrievePathParams = {
  /**
   * @description This parameter can be a string or an integer.
   * @type string
   */
  id: string
}

export type EvolutionChainRetrieve200 = EvolutionChainDetail

export type EvolutionChainRetrieveQueryResponse = EvolutionChainRetrieve200

export type EvolutionChainRetrieveQuery = {
  Response: EvolutionChainRetrieve200
  PathParams: EvolutionChainRetrievePathParams
  Errors: any
}