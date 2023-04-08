import { Request, Response, Router } from "express";
import { UserModel } from "../../models/user.model";
import { compare, hash } from "bcrypt";
import { errorFilter } from "../../common/error.filter";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    await UserModel.create({
      username,
      password: await hash(password, 10),
    });

    res.status(200).json({ message: "register success" });
  } catch (error) {
    errorFilter(error, req, res);
  }
};
