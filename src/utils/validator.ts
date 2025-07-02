import { RequestHandler } from "express";
import { ZodTypeAny } from "zod";

export const InputValidate = (schema: ZodTypeAny): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        details: result.error.flatten(),
      });
      return; 
    }

    req.body = result.data;
    next();
  };
};
