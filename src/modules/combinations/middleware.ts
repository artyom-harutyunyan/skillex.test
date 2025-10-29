import { NextFunction, Request, Response } from "express";
import { schema } from "./schema";

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.format());
    }

    next();
  } catch (error) {
    throw new Error(`Error validating body: ${error}`);
  }
};