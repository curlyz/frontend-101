/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { moveDamageClassDetailSchema } from '../moveDamageClassDetailSchema.ts'
import { z } from 'zod'

export const moveDamageClassRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const moveDamageClassRetrieve200Schema = z.lazy(() => moveDamageClassDetailSchema)

export const moveDamageClassRetrieveQueryResponseSchema = z.lazy(() => moveDamageClassRetrieve200Schema)