/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { languageSummarySchema } from './languageSummarySchema.ts'
import { z } from 'zod'

export const superContestEffectFlavorTextSchema = z.object({
  flavor_text: z.string().max(500),
  language: z.lazy(() => languageSummarySchema),
})