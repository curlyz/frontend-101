/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { itemSummarySchema } from './itemSummarySchema.ts'
import { moveSummarySchema } from './moveSummarySchema.ts'
import { versionGroupSummarySchema } from './versionGroupSummarySchema.ts'
import { z } from 'zod'

export const machineDetailSchema = z.object({
  id: z.number().int(),
  item: z.lazy(() => itemSummarySchema),
  version_group: z.lazy(() => versionGroupSummarySchema),
  move: z.lazy(() => moveSummarySchema),
})