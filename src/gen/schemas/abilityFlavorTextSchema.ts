/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { languageSummarySchema } from './languageSummarySchema.ts'
import { versionGroupSummarySchema } from './versionGroupSummarySchema.ts'
import { z } from 'zod'

export const abilityFlavorTextSchema = z.object({
  flavor_text: z.string(),
  language: z.lazy(() => languageSummarySchema),
  version_group: z.lazy(() => versionGroupSummarySchema),
})