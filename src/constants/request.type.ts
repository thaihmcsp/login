import { Request } from "express";
import { TokenPayload } from "./token.payload";

export interface RequestType extends Request {
  user?: TokenPayload;
}
