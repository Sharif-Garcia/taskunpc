import { Router } from "express";
import { z } from "zod";
import { authLimiter } from "../middleware/rateLimiter.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { register, login } from "../controllers/auth.controller.js";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authRouter = Router();

authRouter.post("/register", authLimiter, validateBody(authSchema), register);
authRouter.post("/login", authLimiter, validateBody(authSchema), login);
