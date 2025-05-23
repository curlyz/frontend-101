/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { PokemonFormListQueryResponse, PokemonFormListQueryParams } from '../../models/pokemonController/PokemonFormList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { pokemonFormList } from '../../clients/pokemonController/pokemonFormList.ts'

export const pokemonFormListQueryKey = (params?: PokemonFormListQueryParams) => [{ url: '/api/v2/pokemon-form/' }, ...(params ? [params] : [])] as const

export type PokemonFormListQueryKey = ReturnType<typeof pokemonFormListQueryKey>

export function pokemonFormListQueryOptions(params?: PokemonFormListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return pokemonFormList(params, config)
    },
  }
}

/**
 * @description Some Pokémon may appear in one of multiple, visually different forms. These differences are purely cosmetic. For variations within a Pokémon species, which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
 * @summary List pokemon forms
 * {@link /api/v2/pokemon-form/}
 */
export function usePokemonFormList(
  params?: PokemonFormListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<PokemonFormListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = pokemonFormListQueryKey(params)

  return useSWR<PokemonFormListQueryResponse, ResponseErrorConfig<Error>, PokemonFormListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...pokemonFormListQueryOptions(params, config),
    ...queryOptions,
  })
}