/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { PokemonShapeRetrieveQueryResponse, PokemonShapeRetrievePathParams } from '../../models/pokemonController/PokemonShapeRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getPokemonShapeRetrieveUrl(id: PokemonShapeRetrievePathParams['id']) {
  return `https://pokeapi.co//api/v2/pokemon-shape/${id}/` as const
}

/**
 * @description Shapes used for sorting Pokémon in a Pokédex.
 * @summary Get pokemon shape
 * {@link /api/v2/pokemon-shape/:id/}
 */
export async function pokemonShapeRetrieve(id: PokemonShapeRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PokemonShapeRetrieveQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getPokemonShapeRetrieveUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}