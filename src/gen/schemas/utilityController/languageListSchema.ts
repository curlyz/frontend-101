/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { paginatedLanguageSummaryListSchema } from '../paginatedLanguageSummaryListSchema.ts'
import { z } from 'zod'

export const languageListQueryParamsSchema = z
  .object({
    limit: z.number().int().describe('Number of results to return per page.').optional(),
    offset: z.number().int().describe('The initial index from which to return the results.').optional(),
    q: z
      .string()
      .describe('> Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)\nCase-insensitive query applied on the `name` property. ')
      .optional(),
  })
  .optional()

export const languageList200Schema = z.lazy(() => paginatedLanguageSummaryListSchema)

export const languageListQueryResponseSchema = z.lazy(() => languageList200Schema)