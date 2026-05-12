import { Router } from "express";
import * as TC from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

export const taskRouter = Router();

taskRouter.use(authMiddleware); // Proteger todas las rutas del router

taskRouter
  .route("/")
  .get(TC.getAllTasks)
  .post(validateBody(createTaskSchema), TC.createTask);

taskRouter
  .route("/:id")
  .get(TC.getTaskById)
  .patch(validateBody(updateTaskSchema), TC.updateTask)
  .delete(TC.deleteTask);
