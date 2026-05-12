import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { taskRouter } from "./task.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", taskRouter);
