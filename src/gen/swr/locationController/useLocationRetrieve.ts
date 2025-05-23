/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { LocationRetrieveQueryResponse, LocationRetrievePathParams } from '../../models/locationController/LocationRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { locationRetrieve } from '../../clients/locationController/locationRetrieve.ts'

export const locationRetrieveQueryKey = (id: LocationRetrievePathParams['id']) => [{ url: '/api/v2/location/:id/', params: { id: id } }] as const

export type LocationRetrieveQueryKey = ReturnType<typeof locationRetrieveQueryKey>

export function locationRetrieveQueryOptions(id: LocationRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return locationRetrieve(id, config)
    },
  }
}

/**
 * @description Locations that can be visited within the games. Locations make up sizable portions of regions, like cities or routes.
 * @summary Get location
 * {@link /api/v2/location/:id/}
 */
export function useLocationRetrieve(
  id: LocationRetrievePathParams['id'],
  options: {
    query?: Parameters<typeof useSWR<LocationRetrieveQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = locationRetrieveQueryKey(id)

  return useSWR<LocationRetrieveQueryResponse, ResponseErrorConfig<Error>, LocationRetrieveQueryKey | null>(shouldFetch ? queryKey : null, {
    ...locationRetrieveQueryOptions(id, config),
    ...queryOptions,
  })
}