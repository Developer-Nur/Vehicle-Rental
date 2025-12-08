import express, { Request, Response } from "express";
import initDB from "./config/dataBase";
import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/user/user.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRouter } from "./modules/booking/booking.routes";

// initializing the Data Base
initDB();

const app = express();

// parse data ot json
app.use(express.json());

// initial route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Vehicle Rental app");
});

// auth route
app.use("/api/v1/auth", authRouter);

// user route
app.use("/api/v1/users", userRouter);

// Vehicle route
app.use("/api/v1/vehicles", vehicleRoutes);

// booking route
app.use("/api/v1/bookings", bookingRouter);

// 404 status if no router matches
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "No route found",
    path: req.path,
  });
});

export default app;
