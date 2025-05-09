/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RegionListQueryResponse, RegionListQueryParams } from '../../models/locationController/RegionList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getRegionListUrl() {
  return `https://pokeapi.co//api/v2/region/` as const
}

/**
 * @description A region is an organized area of the Pokémon world. Most often, the main difference between regions is the species of Pokémon that can be encountered within them.
 * @summary List regions
 * {@link /api/v2/region/}
 */
export async function regionList(params?: RegionListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<RegionListQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getRegionListUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}