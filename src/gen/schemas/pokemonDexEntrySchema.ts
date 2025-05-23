/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { pokedexSummarySchema } from './pokedexSummarySchema.ts'
import { z } from 'zod'

export const pokemonDexEntrySchema = z.object({
  entry_number: z.number().int(),
  pokedex: z.lazy(() => pokedexSummarySchema),
})