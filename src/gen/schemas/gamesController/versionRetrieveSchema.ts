/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { versionDetailSchema } from '../versionDetailSchema.ts'
import { z } from 'zod'

export const versionRetrievePathParamsSchema = z.object({
  id: z.string().describe('This parameter can be a string or an integer.'),
})

export const versionRetrieve200Schema = z
  .lazy(() => versionDetailSchema)
  .describe(
    "Should have a link to Version Group info but the Circular\ndependency and compilation order fight eachother and I'm\nnot sure how to add anything other than a hyperlink",
  )

export const versionRetrieveQueryResponseSchema = z.lazy(() => versionRetrieve200Schema)