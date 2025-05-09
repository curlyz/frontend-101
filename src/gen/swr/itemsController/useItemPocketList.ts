/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { ItemPocketListQueryResponse, ItemPocketListQueryParams } from '../../models/itemsController/ItemPocketList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { itemPocketList } from '../../clients/itemsController/itemPocketList.ts'

export const itemPocketListQueryKey = (params?: ItemPocketListQueryParams) => [{ url: '/api/v2/item-pocket/' }, ...(params ? [params] : [])] as const

export type ItemPocketListQueryKey = ReturnType<typeof itemPocketListQueryKey>

export function itemPocketListQueryOptions(params?: ItemPocketListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return itemPocketList(params, config)
    },
  }
}

/**
 * @description Pockets within the players bag used for storing items by category.
 * @summary List item pockets
 * {@link /api/v2/item-pocket/}
 */
export function useItemPocketList(
  params?: ItemPocketListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<ItemPocketListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = itemPocketListQueryKey(params)

  return useSWR<ItemPocketListQueryResponse, ResponseErrorConfig<Error>, ItemPocketListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...itemPocketListQueryOptions(params, config),
    ...queryOptions,
  })
}