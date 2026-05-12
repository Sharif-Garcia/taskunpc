// src/__tests__/tasks.test.ts
import request from "supertest";
import { createApp } from "../app.js";

const app = createApp();

// Mock del módulo de base de datos
jest.mock("../config/database", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: [
        {
          id: "uuid-1",
          title: "Tarea de prueba",
          completed: false,
          priority: "medium",
        },
      ],
      error: null,
    }),
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: "user-1", email: "test@test.com" } },
        error: null,
      }),
    },
  },
}));

describe("Tasks API", () => {
  const AUTH_TOKEN = "Bearer test-token";

  describe("GET /api/v1/tasks", () => {
    it("retorna 401 si no hay token", async () => {
      const res = await request(app).get("/api/v1/tasks");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("retorna lista de tareas con token válido", async () => {
      const res = await request(app)
        .get("/api/v1/tasks")
        .set("Authorization", AUTH_TOKEN);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("POST /api/v1/tasks", () => {
    it("retorna 400 si el body es inválido", async () => {
      const res = await request(app)
        .post("/api/v1/tasks")
        .set("Authorization", AUTH_TOKEN)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });
});
