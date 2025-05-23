/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { LocationAreaRetrieveQueryResponse, LocationAreaRetrievePathParams } from '../../models/locationController/LocationAreaRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { locationAreaRetrieve } from '../../clients/locationController/locationAreaRetrieve.ts'

export const locationAreaRetrieveQueryKey = (id: LocationAreaRetrievePathParams['id']) => [{ url: '/api/v2/location-area/:id/', params: { id: id } }] as const

export type LocationAreaRetrieveQueryKey = ReturnType<typeof locationAreaRetrieveQueryKey>

export function locationAreaRetrieveQueryOptions(id: LocationAreaRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return locationAreaRetrieve(id, config)
    },
  }
}

/**
 * @description Location areas are sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokémon encounters.
 * @summary Get location area
 * {@link /api/v2/location-area/:id/}
 */
export function useLocationAreaRetrieve(
  id: LocationAreaRetrievePathParams['id'],
  options: {
    query?: Parameters<typeof useSWR<LocationAreaRetrieveQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = locationAreaRetrieveQueryKey(id)

  return useSWR<LocationAreaRetrieveQueryResponse, ResponseErrorConfig<Error>, LocationAreaRetrieveQueryKey | null>(shouldFetch ? queryKey : null, {
    ...locationAreaRetrieveQueryOptions(id, config),
    ...queryOptions,
  })
}