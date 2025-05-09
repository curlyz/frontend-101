/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { StatListQueryResponse, StatListQueryParams } from '../../models/pokemonController/StatList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { statList } from '../../clients/pokemonController/statList.ts'

export const statListQueryKey = (params?: StatListQueryParams) => [{ url: '/api/v2/stat/' }, ...(params ? [params] : [])] as const

export type StatListQueryKey = ReturnType<typeof statListQueryKey>

export function statListQueryOptions(params?: StatListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return statList(params, config)
    },
  }
}

/**
 * @description Stats determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.
 * @summary List stats
 * {@link /api/v2/stat/}
 */
export function useStatList(
  params?: StatListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<StatListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = statListQueryKey(params)

  return useSWR<StatListQueryResponse, ResponseErrorConfig<Error>, StatListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...statListQueryOptions(params, config),
    ...queryOptions,
  })
}