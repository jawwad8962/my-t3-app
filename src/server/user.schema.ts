import { z } from "zod";

export const createUserInputScema = z.object({
    name: z.string(),
    email: z.string().email()
})
 
export const createUserOutputScema = z.object({ name: z.string(), email: z.string().email()})
    

export type CreateUserInput = z.TypeOf<typeof createUserInputScema>

export const requestOtpSchema = z.object({
    email: z.string().email(),
    redirect: z.string().default('/'),
})

export type requestOtpInput = z.TypeOf<typeof requestOtpSchema>