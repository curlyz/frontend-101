/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { genderDetailSchema } from '../genderDetailSchema.ts'
import { z } from 'zod'

export const genderRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const genderRetrieve200Schema = z.lazy(() => genderDetailSchema)

export const genderRetrieveQueryResponseSchema = z.lazy(() => genderRetrieve200Schema)