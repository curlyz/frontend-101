/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { generationSummarySchema } from './generationSummarySchema.ts'
import { versionSummarySchema } from './versionSummarySchema.ts'
import { z } from 'zod'

export const versionGroupDetailSchema = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  order: z.number().int().optional().nullable(),
  generation: z.lazy(() => generationSummarySchema),
  move_learn_methods: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  ),
  pokedexes: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  ),
  regions: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  ),
  versions: z.array(z.lazy(() => versionSummarySchema)),
})