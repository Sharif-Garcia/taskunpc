import { z, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateBody =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: z.prettifyError(result.error),
      });
      return;
    }

    req.body = result.data;
    next();
  };
