/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { itemCategoryDetailSchema } from '../itemCategoryDetailSchema.ts'
import { z } from 'zod'

export const itemCategoryRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const itemCategoryRetrieve200Schema = z.lazy(() => itemCategoryDetailSchema)

export const itemCategoryRetrieveQueryResponseSchema = z.lazy(() => itemCategoryRetrieve200Schema)