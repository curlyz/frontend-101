/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { MachineListQueryResponse, MachineListQueryParams } from '../../models/machinesController/MachineList.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getMachineListUrl() {
  return `https://pokeapi.co//api/v2/machine/` as const
}

/**
 * @description Machines are the representation of items that teach moves to Pokémon. They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine.
 * @summary List machines
 * {@link /api/v2/machine/}
 */
export async function machineList(params?: MachineListQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MachineListQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getMachineListUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}