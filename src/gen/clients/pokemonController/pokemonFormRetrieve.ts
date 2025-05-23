/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { PokemonFormRetrieveQueryResponse, PokemonFormRetrievePathParams } from '../../models/pokemonController/PokemonFormRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getPokemonFormRetrieveUrl(id: PokemonFormRetrievePathParams['id']) {
  return `https://pokeapi.co//api/v2/pokemon-form/${id}/` as const
}

/**
 * @description Some Pokémon may appear in one of multiple, visually different forms. These differences are purely cosmetic. For variations within a Pokémon species, which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
 * @summary Get pokemon form
 * {@link /api/v2/pokemon-form/:id/}
 */
export async function pokemonFormRetrieve(id: PokemonFormRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PokemonFormRetrieveQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getPokemonFormRetrieveUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}