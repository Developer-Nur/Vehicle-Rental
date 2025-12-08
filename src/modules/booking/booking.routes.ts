import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";
import { Roles } from "../../constant/constant";

const router = Router();

router.post("/", auth(), bookingController.createBooking);
router.get("/", auth(), bookingController.getAllBooking);

export const bookingRouter = router;
