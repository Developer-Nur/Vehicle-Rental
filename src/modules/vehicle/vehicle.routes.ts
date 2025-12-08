import { Request, Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";
import { Roles } from "../../constant/constant";

const router = Router();

router.post("/", auth(Roles.admin), vehicleController.createVehicleToDB);
router.get("/", vehicleController.getAllVehicle);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.put("/:vehicleId", auth(Roles.admin), vehicleController.updateVehicle);
router.delete(
  "/:vehicleId",
  auth(Roles.admin),
  vehicleController.deleteVehicle
);

export const vehicleRoutes = router;
