/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { ItemRetrieveQueryResponse, ItemRetrievePathParams } from '../../models/itemsController/ItemRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { itemRetrieve } from '../../clients/itemsController/itemRetrieve.ts'

export const itemRetrieveQueryKey = (id: ItemRetrievePathParams['id']) => [{ url: '/api/v2/item/:id/', params: { id: id } }] as const

export type ItemRetrieveQueryKey = ReturnType<typeof itemRetrieveQueryKey>

export function itemRetrieveQueryOptions(id: ItemRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return itemRetrieve(id, config)
    },
  }
}

/**
 * @description An item is an object in the games which the player can pick up, keep in their bag, and use in some manner. They have various uses, including healing, powering up, helping catch Pokémon, or to access a new area.
 * @summary Get item
 * {@link /api/v2/item/:id/}
 */
export function useItemRetrieve(
  id: ItemRetrievePathParams['id'],
  options: {
    query?: Parameters<typeof useSWR<ItemRetrieveQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = itemRetrieveQueryKey(id)

  return useSWR<ItemRetrieveQueryResponse, ResponseErrorConfig<Error>, ItemRetrieveQueryKey | null>(shouldFetch ? queryKey : null, {
    ...itemRetrieveQueryOptions(id, config),
    ...queryOptions,
  })
}