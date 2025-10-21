import express, { Application, Request, Response } from "express";
// After npm i express run npm i -D typescript ts-node @types/node @types/express
// @types/node allows you to run ts files directly
// @types/express TypeScript type declarations of express

/**
 * app.ts
 * --------
 * This file is responsible for *configuring* the Express application:
 * - creating the Express instance
 * - registering global middleware
 * - mounting routes
 * 
 * It does NOT start the server — that’s handled in server.ts.
 */
// This is an Application module of express. 
const app: Application = express(); 

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Basic endpoint for a healthcheck
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, message: "Server is healthy" });
});

export default app;