import {z} from "zod"
import { GenderEnum } from "@/Utilities/types"


export const loginSchema =
    z.strictObject({
        email: z.email({
            error: "email must be valid formate like ex: example@domain.com",
        }),
        password: z
            .string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
                message:
                    "password must be at least 8 characters, include uppercase, lowercase, special character like'@_&' and a number",

            }),
    });



export const signupSchema =
    z.object({
    username: z
        .string({
            error: "username is required string field",
        })
        .min(2, { error: "min is 2 character" })
        .max(20, { error: "max is 20 character" }),
    email: z.email({
        error: "email must be valid formate like ex: example@domain.com",
    }),
    password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
            message:
                "password must be at least 8 characters, include uppercase, lowercase, special character like'@_&' and a number",
        
        }),
    confirmPassword: z.string(),
    phone: z.string().regex(/^(002|\+2)?01[0125][0-9]{8}$/),
    gender: z.enum(GenderEnum).default(GenderEnum.male),
}).refine((data) => 
    data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


export const sendForgetPasswordValidation =
    z.strictObject({
        email: z.email({
            error: "email must be valid formate like ex: example@domain.com",
        }),
    });
export const verifyAccount = sendForgetPasswordValidation.extend({
    otp: z.string().regex(/^\d{6}$/, {
        message:"otp must be 6 digit"
    }),
})



export const resetPasswordValidation =
    z.strictObject({
        email: z.email({
            error: "email must be valid formate like ex: example@domain.com",
        }),
        otp: z.string().regex(/^\d{6}$/, {
            message: "otp must be 6 digit"
        }),
        password: z
            .string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
                message:
                    "password must be at least 8 characters, include uppercase, lowercase, special character like'@_&' and a number",

            }),
        confirmPassword: z.string(),
    }).refine((data) =>
        data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

