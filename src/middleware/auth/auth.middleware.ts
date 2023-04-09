import { NextFunction, Request, Response } from "express";
import { getConfig } from "../../configs/config";
import { verify } from "jsonwebtoken";
import { RequestType } from "../../constants/request.type";
import { UserModel } from "../../models/user.model";
import { TokenPayload } from "../../constants/token.payload";

const config = getConfig();

export const checkAuth = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const cname = config.auth.cookie_name;
    const pass = config.auth.jwt_password;
    const token = req.cookies[cname];

    if (!token) {
      return res.redirect("/login");
    }

    const payload = verify(token, pass) as TokenPayload;
    const checkToken = await UserModel.findOne({
      username: payload.username,
      token,
    });

    if (!checkToken) {
      return res.redirect("/login");
    }

    return payload;
  } catch (error) {
    return res.redirect("/login");
  }
};

export const checkAuthAndNext = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = (await checkAuth(req, res, next)) as TokenPayload;

    req.user = payload;
    next();
  } catch (error) {
    res.status(400).json({ message: "you are not logged in" });
  }
};

export const checkAuthAndGoHome = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const cname = config.auth.cookie_name;
    const pass = config.auth.jwt_password;
    const token = req.cookies[cname];

    if (token) {
      const payload = verify(token, pass) as TokenPayload;
      const checkToken = await UserModel.findOne({
        username: payload.username,
        token,
      });

      if (checkToken) {
        return res.redirect("/");
      }
    }

    next();
  } catch (error) {
    next();
  }
};
