import { Request, Response, Router } from "express";
import { validateRegister } from "../../middleware/validator/auth.validator";
import { register, login, logout } from "./user.service";
import { checkAuthAndNext } from "../../middleware/auth/auth.middleware";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateRegister, login);
router.patch("/logout", checkAuthAndNext, logout);

export default router;
