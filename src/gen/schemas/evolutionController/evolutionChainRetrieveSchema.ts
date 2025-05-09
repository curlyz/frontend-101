/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { evolutionChainDetailSchema } from '../evolutionChainDetailSchema.ts'
import { z } from 'zod'

export const evolutionChainRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const evolutionChainRetrieve200Schema = z.lazy(() => evolutionChainDetailSchema)

export const evolutionChainRetrieveQueryResponseSchema = z.lazy(() => evolutionChainRetrieve200Schema)