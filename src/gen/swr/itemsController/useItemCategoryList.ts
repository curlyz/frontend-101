/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { ItemCategoryListQueryResponse, ItemCategoryListQueryParams } from '../../models/itemsController/ItemCategoryList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { itemCategoryList } from '../../clients/itemsController/itemCategoryList.ts'

export const itemCategoryListQueryKey = (params?: ItemCategoryListQueryParams) => [{ url: '/api/v2/item-category/' }, ...(params ? [params] : [])] as const

export type ItemCategoryListQueryKey = ReturnType<typeof itemCategoryListQueryKey>

export function itemCategoryListQueryOptions(params?: ItemCategoryListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return itemCategoryList(params, config)
    },
  }
}

/**
 * @description Item categories determine where items will be placed in the players bag.
 * @summary List item categories
 * {@link /api/v2/item-category/}
 */
export function useItemCategoryList(
  params?: ItemCategoryListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<ItemCategoryListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = itemCategoryListQueryKey(params)

  return useSWR<ItemCategoryListQueryResponse, ResponseErrorConfig<Error>, ItemCategoryListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...itemCategoryListQueryOptions(params, config),
    ...queryOptions,
  })
}