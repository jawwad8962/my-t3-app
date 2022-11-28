import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const studentRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.students.findMany();
  }),
  addStudent: publicProcedure
  .input(z.object({ name: z.string(), grade: z.string(), parentName: z.string() }))
  .mutation(async ({ctx, input}) => {
    return await ctx.prisma.students.create({data : {
      name: input.name,
      grade: input.grade,
      parentName: input.parentName,
    }})
  }),
  deleteStudent: publicProcedure
  .input(z.object({
    id: z.string()
  }))
  .mutation(async ({ctx, input}) => {
    const {id} = input
    return await ctx.prisma.students.delete({
      where:{
        id,
      },
    })
  }),
});
