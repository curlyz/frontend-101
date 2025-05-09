/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { PokedexListQueryResponse, PokedexListQueryParams } from '../../models/gamesController/PokedexList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getPokedexListUrl() {
  return `https://pokeapi.co//api/v2/pokedex/` as const
}

/**
 * @description A Pokédex is a handheld electronic encyclopedia device; one which is capable of recording and retaining information of the various Pokémon in a given region with the exception of the national dex and some smaller dexes related to portions of a region. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pokedex) for greater detail.
 * @summary List pokedex
 * {@link /api/v2/pokedex/}
 */
export async function pokedexList(params?: PokedexListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PokedexListQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getPokedexListUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}