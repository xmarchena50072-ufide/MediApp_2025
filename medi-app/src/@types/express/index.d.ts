import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Declaramos que la propiedad `userId` puede existir en el objeto Request
    }
  }
}
