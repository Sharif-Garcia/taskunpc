import { Request, Response } from "express";
import { supabase } from "../config/database.js";
import { AppError } from "../middleware/error.middleware.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new AppError(error.status ?? 400, error.message);
  res.status(201).json({
    success: true,
    message: "Registro exitoso. Revisa tu email para confirmar.",
    data: { id: data.user?.id, email: data.user?.email },
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new AppError(error.status ?? 401, error.message);
  res.json({
    success: true,
    token: data.session?.access_token,
    expires_in: data.session?.expires_in,
  });
};
