/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { MoveTargetListQueryResponse, MoveTargetListQueryParams } from '../../models/movesController/MoveTargetList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { moveTargetList } from '../../clients/movesController/moveTargetList.ts'

export const moveTargetListQueryKey = (params?: MoveTargetListQueryParams) => [{ url: '/api/v2/move-target/' }, ...(params ? [params] : [])] as const

export type MoveTargetListQueryKey = ReturnType<typeof moveTargetListQueryKey>

export function moveTargetListQueryOptions(params?: MoveTargetListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  return {
    fetcher: async () => {
      return moveTargetList(params, config)
    },
  }
}

/**
 * @description Targets moves can be directed at during battle. Targets can be Pokémon, environments or even other moves.
 * @summary List move targets
 * {@link /api/v2/move-target/}
 */
export function useMoveTargetList(
  params?: MoveTargetListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<MoveTargetListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = moveTargetListQueryKey(params)

  return useSWR<MoveTargetListQueryResponse, ResponseErrorConfig<Error>, MoveTargetListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...moveTargetListQueryOptions(params, config),
    ...queryOptions,
  })
}