import { GenderEnum, logoutEnum } from "@/Utilities/types"
import {z} from "zod"

export const updateProfile = z.strictObject({
    firstName: z.string().min(2).max(25).optional(),
    lastName: z.string().min(2).max(25).optional(),
    phone: z.string().regex(/^(002|\+2)?01[0125][0-9]{8}$/, {
        message: "Invalid phone number. Please enter a valid Egyptian number starting with 01, +201, or 00201 followed by 9 digits."
    }),
    gender: z.enum(GenderEnum).default(GenderEnum.male),
    address: z.string().min(2).optional(),

})
export const changePasswordUser = z.strictObject({

    oldPassword: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
            message:
                "password must be at least 8 characters, include uppercase, lowercase, special character like'@_&' and a number",

        }),
    password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
            message:
                "password must be at least 8 characters, include uppercase, lowercase, special character like'@_&' and a number",

        }),
    confirmPassword: z.string(),

    flag: z.enum(logoutEnum).default(logoutEnum.only),

}).refine((data) =>
    data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});