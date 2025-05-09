/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { BerryListQueryResponse, BerryListQueryParams } from '../../models/berriesController/BerryList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { berryList } from '../../clients/berriesController/berryList.ts'

export const berryListQueryKey = (params?: BerryListQueryParams) => [{ url: '/api/v2/berry/' }, ...(params ? [params] : [])] as const

export type BerryListQueryKey = ReturnType<typeof berryListQueryKey>

export function berryListQueryOptions(params?: BerryListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return berryList(params, config)
    },
  }
}

/**
 * @description Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Berry) for greater detail.
 * @summary List berries
 * {@link /api/v2/berry/}
 */
export function useBerryList(
  params?: BerryListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<BerryListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = berryListQueryKey(params)

  return useSWR<BerryListQueryResponse, ResponseErrorConfig<Error>, BerryListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...berryListQueryOptions(params, config),
    ...queryOptions,
  })
}