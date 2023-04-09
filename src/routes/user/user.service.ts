import { Request, Response, Router } from "express";
import { UserModel } from "../../models/user.model";
import { compare, hash } from "bcrypt";
import { errorFilter } from "../../common/error.filter";
import { sign, verify } from "jsonwebtoken";
import { getConfig } from "../../configs/config";

const config = getConfig();

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

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "wrong username" });
    }

    const check = await user.matchPassword(password);
    if (!check) {
      return res.status(400).json({ message: "wrong password" });
    }

    const { password: userPass, ...publicUser } = user._doc;
    const token = user.genToken();

    await UserModel.updateOne({ username }, { token });

    res.status(200).json({ token, user: publicUser });
  } catch (error) {
    errorFilter(error, req, res);
  }
};
