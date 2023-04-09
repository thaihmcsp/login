import { Request, Response, Router } from "express";
import userRoute from "./user/user.route";
import {
  checkAuthAndGoHome,
  checkAuthAndNext,
} from "../middleware/auth/auth.middleware";

const router = Router();

router.get("/", checkAuthAndNext, (req: Request, res: Response) => {
  res.render("home/home");
});

router.get("/login", checkAuthAndGoHome, (req: Request, res: Response) => {
  res.render("login/login");
});

router.get("/register", checkAuthAndGoHome, (req: Request, res: Response) => {
  res.render("register/register");
});

router.use("/user", userRoute);

export default router;
