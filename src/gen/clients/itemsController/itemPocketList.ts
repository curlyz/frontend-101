/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { ItemPocketListQueryResponse, ItemPocketListQueryParams } from '../../models/itemsController/ItemPocketList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getItemPocketListUrl() {
  return `https://pokeapi.co//api/v2/item-pocket/` as const
}

/**
 * @description Pockets within the players bag used for storing items by category.
 * @summary List item pockets
 * {@link /api/v2/item-pocket/}
 */
export async function itemPocketList(params?: ItemPocketListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ItemPocketListQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getItemPocketListUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}