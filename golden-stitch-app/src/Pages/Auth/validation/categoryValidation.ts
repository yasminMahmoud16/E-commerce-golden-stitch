import {z} from "zod"

export const createCategory = z.strictObject({
    name: z.string().min(2).max(100),
    description: z.string().max(10000).optional(),
    attachment: z.any(),


})
export type CategoryFormValues = z.infer<typeof createCategory>;
export const updateCategorySchema = createCategory

