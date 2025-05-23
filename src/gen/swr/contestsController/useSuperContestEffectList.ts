/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import useSWR from 'swr'
import type { SuperContestEffectListQueryResponse, SuperContestEffectListQueryParams } from '../../models/contestsController/SuperContestEffectList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import { superContestEffectList } from '../../clients/contestsController/superContestEffectList.ts'

export const superContestEffectListQueryKey = (params?: SuperContestEffectListQueryParams) =>
  [{ url: '/api/v2/super-contest-effect/' }, ...(params ? [params] : [])] as const

export type SuperContestEffectListQueryKey = ReturnType<typeof superContestEffectListQueryKey>

export function superContestEffectListQueryOptions(
  params?: SuperContestEffectListQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  return {
    fetcher: async () => {
      return superContestEffectList(params, config)
    },
  }
}

/**
 * @description Super contest effects refer to the effects of moves when used in super contests.
 * @summary List super contest effects
 * {@link /api/v2/super-contest-effect/}
 */
export function useSuperContestEffectList(
  params?: SuperContestEffectListQueryParams,
  options: {
    query?: Parameters<typeof useSWR<SuperContestEffectListQueryResponse, ResponseErrorConfig<Error>>>[2]
    client?: Partial<RequestConfig> & { client?: typeof client }
    shouldFetch?: boolean
  } = {},
) {
  const { query: queryOptions, client: config = {}, shouldFetch = true } = options ?? {}

  const queryKey = superContestEffectListQueryKey(params)

  return useSWR<SuperContestEffectListQueryResponse, ResponseErrorConfig<Error>, SuperContestEffectListQueryKey | null>(shouldFetch ? queryKey : null, {
    ...superContestEffectListQueryOptions(params, config),
    ...queryOptions,
  })
}