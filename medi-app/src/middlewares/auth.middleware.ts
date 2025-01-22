import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No se proporcionó un token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    
    // Forzamos a TypeScript a reconocer `userId`
    (req as Request & { userId: string }).userId = decoded.id;

    next(); // Continuamos con el siguiente middleware
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};
