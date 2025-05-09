/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { MoveLearnMethodListQueryResponse, MoveLearnMethodListQueryParams } from '../../models/movesController/MoveLearnMethodList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { moveLearnMethodList } from '../../clients/movesController/moveLearnMethodList.ts'

export const moveLearnMethodListQueryKey = (params?: MoveLearnMethodListQueryParams) =>
  [{ url: '/api/v2/move-learn-method/' }, ...(params ? [params] : [])] as const

export type MoveLearnMethodListQueryKey = ReturnType<typeof moveLearnMethodListQueryKey>

export function moveLearnMethodListQueryOptions(params?: MoveLearnMethodListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return moveLearnMethodList(params, config)
    },
  }
}

/**
 * @description Methods by which Pokémon can learn moves.
 * @summary List move learn methods
 * {@link /api/v2/move-learn-method/}
 */
export function useMoveLearnMethodList(
  params?: MoveLearnMethodListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<MoveLearnMethodListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = moveLearnMethodListQueryKey(params)

  return useSWR<MoveLearnMethodListQueryResponse, ResponseErrorConfig<Error>, MoveLearnMethodListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...moveLearnMethodListQueryOptions(params, config),
    ...queryOptions,
  })
}