import {z} from "zod"

export const createProduct = z.strictObject({
    name: z.string().min(2).max(100),
    description: z.string().max(10000).optional(),
    mainPrice: z.coerce.number().positive().min(1),
    stock: z.coerce.number().positive().int().min(1),
    discountPercent: z.coerce.number().positive().default(0),
    categoryId: z.string().optional(),
    attachments: z.any().optional(),
    category: z.object({
        id: z.string().optional(),
        name: z.string().optional(),
    }).optional(),

});

export type ProductFormValues = z.infer<typeof createProduct>;

export const updateProductSchema = z.strictObject({
    
    name: z.string().min(2).max(100),
    description: z.string().max(10000).optional(),
    mainPrice: z.coerce.number().positive().min(1),
    // stock: z.coerce.number().positive().int().min(1),
    discountPercent: z.coerce.number().positive(),
    attachments: z.any().optional(),
    categoryId: z.string().optional(),
    category: z
        .object({
            id: z.string().optional(),
            name: z.string().optional(),
        })

});

export type UpdateProductForm = z.infer<typeof updateProductSchema>;

