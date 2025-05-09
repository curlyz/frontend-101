/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { EggGroupRetrieveQueryResponse, EggGroupRetrievePathParams } from '../../models/pokemonController/EggGroupRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getEggGroupRetrieveUrl(id: EggGroupRetrievePathParams['id']) {
  return `https://pokeapi.co//api/v2/egg-group/${id}/` as const
}

/**
 * @description Egg Groups are categories which determine which Pokémon are able to interbreed. Pokémon may belong to either one or two Egg Groups. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Egg_Group) for greater detail.
 * @summary Get egg group
 * {@link /api/v2/egg-group/:id/}
 */
export async function eggGroupRetrieve(id: EggGroupRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<EggGroupRetrieveQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getEggGroupRetrieveUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}