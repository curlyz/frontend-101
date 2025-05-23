/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { berryFirmnessDetailSchema } from '../berryFirmnessDetailSchema.ts'
import { z } from 'zod'

export const berryFirmnessRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const berryFirmnessRetrieve200Schema = z.lazy(() => berryFirmnessDetailSchema)

export const berryFirmnessRetrieveQueryResponseSchema = z.lazy(() => berryFirmnessRetrieve200Schema)