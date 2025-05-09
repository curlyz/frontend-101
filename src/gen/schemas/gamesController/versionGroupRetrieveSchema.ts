/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { versionGroupDetailSchema } from '../versionGroupDetailSchema.ts'
import { z } from 'zod'

export const versionGroupRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const versionGroupRetrieve200Schema = z.lazy(() => versionGroupDetailSchema)

export const versionGroupRetrieveQueryResponseSchema = z.lazy(() => versionGroupRetrieve200Schema)