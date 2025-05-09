/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { ItemFlingEffectListQueryResponse, ItemFlingEffectListQueryParams } from '../../models/itemsController/ItemFlingEffectList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getItemFlingEffectListUrl() {
  return `https://pokeapi.co//api/v2/item-fling-effect/` as const
}

/**
 * @description The various effects of the move"Fling" when used with different items.
 * @summary List item fling effects
 * {@link /api/v2/item-fling-effect/}
 */
export async function itemFlingEffectList(params?: ItemFlingEffectListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ItemFlingEffectListQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getItemFlingEffectListUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}