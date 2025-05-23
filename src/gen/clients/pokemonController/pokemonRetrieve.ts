/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { PokemonRetrieveQueryResponse, PokemonRetrievePathParams } from '../../models/pokemonController/PokemonRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getPokemonRetrieveUrl(id: PokemonRetrievePathParams['id']) {
  return `https://pokeapi.co//api/v2/pokemon/${id}/` as const
}

/**
 * @description Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon. Each Pokémon belongs to a specific species but may take on a variant which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
 * @summary Get pokemon
 * {@link /api/v2/pokemon/:id/}
 */
export async function pokemonRetrieve(id: PokemonRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PokemonRetrieveQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getPokemonRetrieveUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}