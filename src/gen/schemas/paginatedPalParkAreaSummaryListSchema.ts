/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { palParkAreaSummarySchema } from './palParkAreaSummarySchema.ts'
import { z } from 'zod'

export const paginatedPalParkAreaSummaryListSchema = z.object({
  count: z.number().int().optional(),
  next: z.string().url().nullable().nullish(),
  previous: z.string().url().nullable().nullish(),
  results: z.array(z.lazy(() => palParkAreaSummarySchema)).optional(),
})