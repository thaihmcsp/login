import { Router } from "express";
import { validateRegister } from "../../middleware/validator/auth.validator";
import { register, login } from "./user.service";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateRegister, login);
router.post("/login", validateRegister, login);

export default router;
