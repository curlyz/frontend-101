/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { encounterConditionSummarySchema } from './encounterConditionSummarySchema.ts'
import { z } from 'zod'

export const paginatedEncounterConditionSummaryListSchema = z.object({
  count: z.number().int().optional(),
  next: z.string().url().nullable().nullish(),
  previous: z.string().url().nullable().nullish(),
  results: z.array(z.lazy(() => encounterConditionSummarySchema)).optional(),
})