/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { EvolutionTriggerRetrieveQueryResponse, EvolutionTriggerRetrievePathParams } from '../../models/evolutionController/EvolutionTriggerRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getEvolutionTriggerRetrieveUrl(id: EvolutionTriggerRetrievePathParams['id']) {
  return `https://pokeapi.co//api/v2/evolution-trigger/${id}/` as const
}

/**
 * @description Evolution triggers are the events and conditions that cause a Pokémon to evolve. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.
 * @summary Get evolution trigger
 * {@link /api/v2/evolution-trigger/:id/}
 */
export async function evolutionTriggerRetrieve(id: EvolutionTriggerRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<EvolutionTriggerRetrieveQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getEvolutionTriggerRetrieveUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}