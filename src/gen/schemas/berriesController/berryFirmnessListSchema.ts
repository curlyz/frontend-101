/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { paginatedBerryFirmnessSummaryListSchema } from '../paginatedBerryFirmnessSummaryListSchema.ts'
import { z } from 'zod'

export const berryFirmnessListQueryParamsSchema = z
  .object({
    limit: z.number().int().describe('Number of results to return per page.').optional(),
    offset: z.number().int().describe('The initial index from which to return the results.').optional(),
    q: z
      .string()
      .describe('> Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)\nCase-insensitive query applied on the `name` property. ')
      .optional(),
  })
  .optional()

export const berryFirmnessList200Schema = z.lazy(() => paginatedBerryFirmnessSummaryListSchema)

export const berryFirmnessListQueryResponseSchema = z.lazy(() => berryFirmnessList200Schema)