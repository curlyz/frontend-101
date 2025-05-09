/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { LocationAreaRetrieveQueryResponse, LocationAreaRetrievePathParams } from '../../models/locationController/LocationAreaRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getLocationAreaRetrieveUrl(id: LocationAreaRetrievePathParams['id']) {
  return `https://pokeapi.co//api/v2/location-area/${id}/` as const
}

/**
 * @description Location areas are sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokémon encounters.
 * @summary Get location area
 * {@link /api/v2/location-area/:id/}
 */
export async function locationAreaRetrieve(id: LocationAreaRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LocationAreaRetrieveQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getLocationAreaRetrieveUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}