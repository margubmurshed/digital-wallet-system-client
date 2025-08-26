import z from "zod";

const phoneNumberSchema = z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+?8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX/8801XXXXXXXXX/01XXXXXXXXX",
    })
    .transform((val) => {
        // Remove all non-digit characters for safety if needed (optional)
        const digitsOnly = val.replace(/\D/g, "");

        // Normalize to +8801XXXXXXXXX
        if (digitsOnly.startsWith("8801")) {
            return "+" + digitsOnly; // add the plus if missing
        } else if (digitsOnly.startsWith("01")) {
            return "+88" + digitsOnly; // add +88 prefix
        } else if (digitsOnly.startsWith("880")) {
            return "+" + digitsOnly; // already with 880 but no plus, add it
        }
        // Fallback, return original
        return val;
    })

export const passwordSchema = z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    })

export const updatePasswordSchema = z.object({
    password: passwordSchema
})

export const registerFormSchema = z.object({
    name: z
        .string({ error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    phone: phoneNumberSchema,
    email: z
        .string({ error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: passwordSchema,
})


export const loginFormSchema = z.object({
    phone: phoneNumberSchema,
    password: passwordSchema
})


export const updateUserZodSchema = registerFormSchema.partial().extend({
    commissionRate: z.number().min(0).max(1).optional(),
    isApproved: z.boolean().optional(),
})
    .omit({ email: true });


const amountSchema = z.number({
    error: 'Amount must be a number'
})
    .min(1, { message: 'Amount must be at least 1 Taka' })

export const addMoneyZodSchema = z.object({
    amount: amountSchema
})
export const withdrawMoneyZodSchema = z.object({
    amount: amountSchema
})

export const sendMoneyZodSchema = z.object({
    receiverPhoneNumber: phoneNumberSchema,
    amount: amountSchema
})
export const cashInZodSchema = z.object({
    receiverPhoneNumber: phoneNumberSchema,
    amount: amountSchema
})

export const cashOutZodSchema = z.object({
    agentPhoneNumber: phoneNumberSchema,
    amount: amountSchema
})