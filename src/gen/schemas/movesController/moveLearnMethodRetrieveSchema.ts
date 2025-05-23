/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { moveLearnMethodDetailSchema } from '../moveLearnMethodDetailSchema.ts'
import { z } from 'zod'

export const moveLearnMethodRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const moveLearnMethodRetrieve200Schema = z.lazy(() => moveLearnMethodDetailSchema)

export const moveLearnMethodRetrieveQueryResponseSchema = z.lazy(() => moveLearnMethodRetrieve200Schema)