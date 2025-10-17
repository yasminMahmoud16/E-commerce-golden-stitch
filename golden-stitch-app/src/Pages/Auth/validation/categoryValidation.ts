import {z} from "zod"

export const createCategory = z.strictObject({
    name: z.string().min(2).max(100),
    description: z.string().max(10000).optional(),
    attachment: z.any().optional(),


})
export const updateCategorySchema = createCategory