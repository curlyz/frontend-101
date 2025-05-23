/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { eggGroupNameSchema } from './eggGroupNameSchema.ts'
import { z } from 'zod'

export const eggGroupDetailSchema = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(z.lazy(() => eggGroupNameSchema)),
  pokemon_species: z.array(
    z.object({
      name: z.string().describe('Pokemon species name.').optional(),
      url: z.string().url().describe('The URL to get more information about the species').optional(),
    }),
  ),
})