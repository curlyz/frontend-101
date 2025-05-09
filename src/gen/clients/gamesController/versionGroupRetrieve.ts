/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { VersionGroupRetrieveQueryResponse, VersionGroupRetrievePathParams } from '../../models/gamesController/VersionGroupRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getVersionGroupRetrieveUrl(id: VersionGroupRetrievePathParams['id']) {
  return `https://pokeapi.co//api/v2/version-group/${id}/` as const
}

/**
 * @description Version groups categorize highly similar versions of the games.
 * @summary Get version group
 * {@link /api/v2/version-group/:id/}
 */
export async function versionGroupRetrieve(id: VersionGroupRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<VersionGroupRetrieveQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getVersionGroupRetrieveUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}