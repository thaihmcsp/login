import { Request, Response, Router } from "express";
import userRoute from "./user/user.route";

const router = Router();

router.use("/user", userRoute);

export default router;
