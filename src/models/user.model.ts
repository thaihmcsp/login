import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import mongoose, { Document } from "mongoose";
import { getConfig } from "../configs/config";
import * as moment from "moment";

const config = getConfig();
interface UserObject extends Document {
  username: string;
  password: string;
  token: string;
  matchPassword: (pw: string) => Promise<boolean>;
  genToken: () => string;
  _doc: any;
}

const UserSchema = new mongoose.Schema<UserObject>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: String,
  },
  { collection: "users", timestamps: true }
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password);
};

UserSchema.methods.genToken = function () {
  const user = {
    username: this.username,
    _id: this._id,
  };

  const token = sign(user, config.auth.jwt_password, {
    expiresIn: config.auth.jwt_exp,
  });

  return token;
};

export const UserModel = mongoose.model("users", UserSchema);
