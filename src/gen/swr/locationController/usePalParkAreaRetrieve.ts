/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { PalParkAreaRetrieveQueryResponse, PalParkAreaRetrievePathParams } from '../../models/locationController/PalParkAreaRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { palParkAreaRetrieve } from '../../clients/locationController/palParkAreaRetrieve.ts'

export const palParkAreaRetrieveQueryKey = (id: PalParkAreaRetrievePathParams['id']) => [{ url: '/api/v2/pal-park-area/:id/', params: { id: id } }] as const

export type PalParkAreaRetrieveQueryKey = ReturnType<typeof palParkAreaRetrieveQueryKey>

export function palParkAreaRetrieveQueryOptions(id: PalParkAreaRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return palParkAreaRetrieve(id, config)
    },
  }
}

/**
 * @description Areas used for grouping Pokémon encounters in Pal Park. They're like habitats that are specific to Pal Park.
 * @summary Get pal park area
 * {@link /api/v2/pal-park-area/:id/}
 */
export function usePalParkAreaRetrieve(
  id: PalParkAreaRetrievePathParams['id'],
  options: {
    query?: Parameters<typeof useSWR<PalParkAreaRetrieveQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = palParkAreaRetrieveQueryKey(id)

  return useSWR<PalParkAreaRetrieveQueryResponse, ResponseErrorConfig<Error>, PalParkAreaRetrieveQueryKey | null>(shouldFetch ? queryKey : null, {
    ...palParkAreaRetrieveQueryOptions(id, config),
    ...queryOptions,
  })
}