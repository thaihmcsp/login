import { NextFunction, Request, Response } from "express";
import { ERROR_CODE } from "../constants/error.code";

export const errorFilter = (error: any, req: Request, res: Response) => {
  if (error && error.code === ERROR_CODE.DUPLICATE) {
    const fields = Object.keys(error.keyPattern).join(", ");
    return res.status(400).json({
      message: `'${fields}' is not available, please choose another '${fields}'`,
    });
  }

  return res.status(500).json({
    message: "server error",
  });
};
