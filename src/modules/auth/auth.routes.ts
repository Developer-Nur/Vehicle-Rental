import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", authController.createUserToDB);
router.post("/signin", authController.loginUser);

export const authRouter = router;
