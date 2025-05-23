/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { PokedexListQueryResponse, PokedexListQueryParams } from '../../models/gamesController/PokedexList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { pokedexList } from '../../clients/gamesController/pokedexList.ts'

export const pokedexListQueryKey = (params?: PokedexListQueryParams) => [{ url: '/api/v2/pokedex/' }, ...(params ? [params] : [])] as const

export type PokedexListQueryKey = ReturnType<typeof pokedexListQueryKey>

export function pokedexListQueryOptions(params?: PokedexListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return pokedexList(params, config)
    },
  }
}

/**
 * @description A Pokédex is a handheld electronic encyclopedia device; one which is capable of recording and retaining information of the various Pokémon in a given region with the exception of the national dex and some smaller dexes related to portions of a region. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pokedex) for greater detail.
 * @summary List pokedex
 * {@link /api/v2/pokedex/}
 */
export function usePokedexList(
  params?: PokedexListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<PokedexListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = pokedexListQueryKey(params)

  return useSWR<PokedexListQueryResponse, ResponseErrorConfig<Error>, PokedexListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...pokedexListQueryOptions(params, config),
    ...queryOptions,
  })
}