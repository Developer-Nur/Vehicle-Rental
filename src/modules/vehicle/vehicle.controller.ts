import { Request, Response } from "express";
import { pool } from "../../config/dataBase";
import { vehicleService } from "./vehicle.service";

const createVehicleToDB = async (req: Request, res: Response) => {
  try {
    if (req.body.daily_rent_price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Daily rent price must be a positive value greater than zero.",
      });
    }

    const result = await vehicleService.createVehicleToDB(req.body);

    return res.status(201).json({
      status: true,
      message: "Vehicle created successfully!",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
      details: err,
    });
  }
};

const getAllVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicle();
    console.log("all vehicle", result.rows);

    if (result.rows.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No item found!",
        data: [],
      });
    }

    return res.status(201).json({
      status: true,
      message: "Fetched all Vehicle successfully!",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  console.log("the params is", req.params.vehicleId);
  try {
    const result = await vehicleService.getSingleVehicle(
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      return res.status(201).json({
        success: true,
        message: "Vehicle not found",
        data: result.rows,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully!",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
      details: err,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    if (req.body.daily_rent_price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Daily rent price must be a positive value greater than zero.",
      });
    }

    const result = await vehicleService.updateVehicle(
      req.body,
      req.params.vehicleId!
    );

    if (result.rows.length === 0) {
      res.status(201).json({
        success: true,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully!",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
      details: err,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.deleteVehicle(req.params.vehicleId!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or currently booked",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const vehicleController = {
  createVehicleToDB,
  getAllVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
