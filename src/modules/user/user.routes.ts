import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../../constant/constant";

const router = Router();

router.get("/", auth(Roles.admin), userController.getAllUsers);
router.put("/:userId", auth(), userController.updateUser);
router.delete("/:userId", auth(Roles.admin), userController.deleteUser);

export const userRouter = router;
