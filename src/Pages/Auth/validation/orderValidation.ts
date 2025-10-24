import {z} from "zod"

export const createProductSchema = z.strictObject({
    address: z.string().min(2).max(100),
    phone: z.string().regex(/^(002|\+2)?01[0125][0-9]{8}$/, {
        message: "Invalid phone number. Please enter a valid Egyptian number starting with 01, +201, or 00201 followed by 9 digits."
    }),
    note: z.string().max(100).optional(),


})


export type CreateOrder = z.infer<typeof createProductSchema>;