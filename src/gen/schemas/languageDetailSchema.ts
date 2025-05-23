/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { languageNameSchema } from './languageNameSchema.ts'
import { z } from 'zod'

export const languageDetailSchema = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  official: z.boolean().optional(),
  iso639: z.string().max(10),
  iso3166: z.string().max(2),
  names: z.array(z.lazy(() => languageNameSchema)),
})