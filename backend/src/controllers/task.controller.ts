import { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";

const taskService = new TaskService();

// Express 5: async sin try/catch — los errores van al error handler automáticamente

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.findAll(req.user!.id);
  res.json({ success: true, data: tasks, count: tasks.length });
};

export const getTaskById = async (req: Request<{ id: string }>, res: Response) => {
  const task = await taskService.findById(req.params.id, req.user!.id);
  res.json({ success: true, data: task });
};

export const createTask = async (req: Request, res: Response) => {
  const task = await taskService.create(req.body, req.user!.id);
  res.status(201).json({ success: true, data: task });
};

export const updateTask = async (req: Request<{ id: string }>, res: Response) => {
  const task = await taskService.update(req.params.id, req.body, req.user!.id);
  res.json({ success: true, data: task });
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response) => {
  await taskService.delete(req.params.id, req.user!.id);
  res.status(204).send();
};
