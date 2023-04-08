import { Router } from "express";
import { validateRegister } from "../../middleware/validator/auth.validator";
import { register } from "./user.service";

const router = Router();

router.post("/register", validateRegister, register);

export default router;
