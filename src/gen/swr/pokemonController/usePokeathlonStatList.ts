/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { PokeathlonStatListQueryResponse, PokeathlonStatListQueryParams } from '../../models/pokemonController/PokeathlonStatList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { pokeathlonStatList } from '../../clients/pokemonController/pokeathlonStatList.ts'

export const pokeathlonStatListQueryKey = (params?: PokeathlonStatListQueryParams) =>
  [{ url: '/api/v2/pokeathlon-stat/' }, ...(params ? [params] : [])] as const

export type PokeathlonStatListQueryKey = ReturnType<typeof pokeathlonStatListQueryKey>

export function pokeathlonStatListQueryOptions(params?: PokeathlonStatListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return pokeathlonStatList(params, config)
    },
  }
}

/**
 * @description Pokeathlon Stats are different attributes of a Pokémon's performance in Pokéathlons. In Pokéathlons, competitions happen on different courses; one for each of the different Pokéathlon stats. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9athlon) for greater detail.
 * @summary List pokeathlon stats
 * {@link /api/v2/pokeathlon-stat/}
 */
export function usePokeathlonStatList(
  params?: PokeathlonStatListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<PokeathlonStatListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = pokeathlonStatListQueryKey(params)

  return useSWR<PokeathlonStatListQueryResponse, ResponseErrorConfig<Error>, PokeathlonStatListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...pokeathlonStatListQueryOptions(params, config),
    ...queryOptions,
  })
}