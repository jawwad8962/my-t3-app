import { z } from "zod";
import {router, publicProcedure} from "../trpc";
import { createUserInputScema, createUserOutputScema, requestOtpSchema } from '../../user.schema';
import { TRPCError } from "@trpc/server";
import { encodeToken, sendLoginEmail } from "../../../utils/mailer";
import { getBaseUrl } from '../../../utils/trpc';

export const userRouter = router({
  getAll: publicProcedure
  .query(async ({ctx}) => {
    await ctx.prisma.users.findMany()
  }),
  registerUser: publicProcedure
  .input(createUserInputScema)
  .output(createUserOutputScema)
  .mutation(async ({ctx, input}) => {
    return await ctx.prisma.users.create({
      data:{
        name: input.name,
        email: input.email,
      },
    })
  }),
  requestLogin: publicProcedure
  .input(requestOtpSchema)
  .mutation(async ({ctx, input}) => {
    const {email, redirect} = input
    const user = await ctx.prisma.users.findUnique({
      where:{
        email: email,
      },
    })
    if(!user){
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User Not Found"
      })
    }
    const token = ctx.prisma.loginToken.create({
      data:{
        redirect,
        user: {
          connect: {
            id: user.id,
          },
        },
      } 
    })
    return token
  }),
  getByEmail: publicProcedure
  .input(z.object({email: z.string().email()}))
  .query(async ({ctx, input}) =>{
    return await ctx.prisma.users.findUnique({
      where: {
        email: input.email
      }
    })
  }),
})

