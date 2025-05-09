/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { GenderRetrieveQueryResponse, GenderRetrievePathParams } from '../../models/pokemonController/GenderRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { genderRetrieve } from '../../clients/pokemonController/genderRetrieve.ts'

export const genderRetrieveQueryKey = (id: GenderRetrievePathParams['id']) => [{ url: '/api/v2/gender/:id/', params: { id: id } }] as const

export type GenderRetrieveQueryKey = ReturnType<typeof genderRetrieveQueryKey>

export function genderRetrieveQueryOptions(id: GenderRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return genderRetrieve(id, config)
    },
  }
}

/**
 * @description Genders were introduced in Generation II for the purposes of breeding Pokémon but can also result in visual differences or even different evolutionary lines. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Gender) for greater detail.
 * @summary Get gender
 * {@link /api/v2/gender/:id/}
 */
export function useGenderRetrieve(
  id: GenderRetrievePathParams['id'],
  options: {
    query?: Parameters<typeof useSWR<GenderRetrieveQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = genderRetrieveQueryKey(id)

  return useSWR<GenderRetrieveQueryResponse, ResponseErrorConfig<Error>, GenderRetrieveQueryKey | null>(shouldFetch ? queryKey : null, {
    ...genderRetrieveQueryOptions(id, config),
    ...queryOptions,
  })
}