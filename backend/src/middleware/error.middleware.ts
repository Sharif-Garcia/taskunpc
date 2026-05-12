import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

// Clase de error personalizada con status code
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly isOperational = true,
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Handler global — debe tener exactamente 4 parámetros
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const isDev = process.env.NODE_ENV === "development";

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(isDev && { stack: err.stack }),
    });
    return;
  }

  // Error de Supabase con código PGRST
  if (err.message?.includes("PGRST")) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error en la consulta a la base de datos",
      });
    return;
  }

  // Error no controlado — loggear y retornar 500
  console.error("[UNHANDLED ERROR]", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    ...(isDev && { stack: err.stack, name: err.name }),
  });
};
