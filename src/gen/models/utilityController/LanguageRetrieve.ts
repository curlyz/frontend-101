/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { LanguageDetail } from '../LanguageDetail.ts'

export type LanguageRetrievePathParams = {
  /**
   * @description This parameter can be a string or an integer.
   * @type string
   */
  id: string
}

export type LanguageRetrieve200 = LanguageDetail

export type LanguageRetrieveQueryResponse = LanguageRetrieve200

export type LanguageRetrieveQuery = {
  Response: LanguageRetrieve200
  PathParams: LanguageRetrievePathParams
  Errors: any
}