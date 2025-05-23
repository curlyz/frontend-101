/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { MoveDamageClassListQueryResponse, MoveDamageClassListQueryParams } from '../../models/pokemonController/MoveDamageClassList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getMoveDamageClassListUrl() {
  return `https://pokeapi.co//api/v2/move-damage-class/` as const
}

/**
 * @description Damage classes moves can have, e.g. physical, special, or non-damaging.
 * @summary List move damage classes
 * {@link /api/v2/move-damage-class/}
 */
export async function moveDamageClassList(params?: MoveDamageClassListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MoveDamageClassListQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getMoveDamageClassListUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}