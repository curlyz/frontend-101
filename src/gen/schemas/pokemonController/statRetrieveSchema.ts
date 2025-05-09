/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { statDetailSchema } from '../statDetailSchema.ts'
import { z } from 'zod'

export const statRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const statRetrieve200Schema = z.lazy(() => statDetailSchema)

export const statRetrieveQueryResponseSchema = z.lazy(() => statRetrieve200Schema)