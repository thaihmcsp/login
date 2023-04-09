import { NextFunction, Request, Response } from "express";
import Validator, { ValidationError } from "fastest-validator";
import { checkValid } from "./checkValid";
const v = new Validator();

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = {
      username: { type: "string", min: 8, max: 255 },
      password: { type: "string", min: 8, max: 255 },
    };

    const check = v.compile(schema);
    const isValid:
      | true
      | ValidationError[]
      | Promise<true | ValidationError[]> = await check(req.body);

    if (isValid !== true) {
      const result = checkValid(isValid);

      return res.status(400).json(result);
    }

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
