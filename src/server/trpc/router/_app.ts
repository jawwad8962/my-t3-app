import { router } from "../trpc";
import { studentRouter } from "./students";
import { userRouter } from './usersRouter';

export const appRouter = router({
  student: studentRouter,
  users: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
