/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { GenerationDetail } from '../GenerationDetail.ts'

export type GenerationRetrievePathParams = {
  /**
   * @description This parameter can be a string or an integer.
   * @type string
   */
  id: string
}

export type GenerationRetrieve200 = GenerationDetail

export type GenerationRetrieveQueryResponse = GenerationRetrieve200

export type GenerationRetrieveQuery = {
  Response: GenerationRetrieve200
  PathParams: GenerationRetrievePathParams
  Errors: any
}