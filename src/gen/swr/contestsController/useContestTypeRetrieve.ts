/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { ContestTypeRetrieveQueryResponse, ContestTypeRetrievePathParams } from '../../models/contestsController/ContestTypeRetrieve.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { contestTypeRetrieve } from '../../clients/contestsController/contestTypeRetrieve.ts'

export const contestTypeRetrieveQueryKey = (id: ContestTypeRetrievePathParams['id']) => [{ url: '/api/v2/contest-type/:id/', params: { id: id } }] as const

export type ContestTypeRetrieveQueryKey = ReturnType<typeof contestTypeRetrieveQueryKey>

export function contestTypeRetrieveQueryOptions(id: ContestTypeRetrievePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return contestTypeRetrieve(id, config)
    },
  }
}

/**
 * @description Contest types are categories judges used to weigh a Pokémon's condition in Pokémon contests. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Contest_condition) for greater detail.
 * @summary Get contest type
 * {@link /api/v2/contest-type/:id/}
 */
export function useContestTypeRetrieve(
  id: ContestTypeRetrievePathParams['id'],
  options: {
    query?: Parameters<typeof useSWR<ContestTypeRetrieveQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = contestTypeRetrieveQueryKey(id)

  return useSWR<ContestTypeRetrieveQueryResponse, ResponseErrorConfig<Error>, ContestTypeRetrieveQueryKey | null>(shouldFetch ? queryKey : null, {
    ...contestTypeRetrieveQueryOptions(id, config),
    ...queryOptions,
  })
}