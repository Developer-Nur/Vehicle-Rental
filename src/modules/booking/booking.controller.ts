import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { rent_end_date, rent_start_date, customer_id, vehicle_id } =
      req.body;

    // verify role
    const validRoles = ["admin", "customer"];
    const role = String(req.user?.role).toLowerCase();
    const isValid = validRoles.includes(role);

    if (!isValid) {
      return res.status(403).json({
        status: false,
        message: "Forbidden access!",
      });
    }

    const isUserExist = await bookingService.findUser(customer_id);
    if (isUserExist.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isVehicleExist = await bookingService.findVehicle(vehicle_id);
    if (isVehicleExist.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const toUnixSeconds = (dateStr: string) =>
      Math.floor(new Date(dateStr + "T00:00:00Z").getTime() / 1000);

    const start = toUnixSeconds(rent_start_date);
    const end = toUnixSeconds(rent_end_date);

    if (start > end) {
      return res.status(400).json({
        error: "Start date cannot be after end date.",
      });
    }
    const totalDays = Math.floor((end - start) / (60 * 60 * 24));

    const perDayRent = isVehicleExist.rows?.[0].daily_rent_price || 0;
    const total_price = totalDays * perDayRent;

    const bookingPayload = {
      total_price,
      rent_end_date,
      rent_start_date,
      customer_id,
      vehicle_id,
    };

    const result = await bookingService.createBooking(bookingPayload);

    return res.status(200).json({
      success: true,
      message: "Booking created Successfully!",
      data: {
        id: result.booking.id,
        customer_id: result.booking.customer_id,
        vehicle_id: result.booking.vehicle_id,
        rent_start_date: result.booking.rent_start_date,
        rent_end_date: result.booking.rent_end_date,
        total_price: result.booking.total_price,
        status: result.booking.status,
        vehicle: {
          vehicle_name: result.vehicle.vehicle_name,
          daily_rent_price: result.vehicle.daily_rent_price,
        },
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    // verify role
    const validRoles = ["admin", "customer"];
    const role = String(req.user?.role).toLowerCase();
    const currentUserID = req.user?.id;

    if (!validRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access!",
      });
    }

    const result = await bookingService.getAllBooking();
    const bookings = result.rows;

    let responseData;

    if (role === "admin") {
      responseData = bookings.map((booking: any) => ({
        id: booking.id,
        customer_id: booking.customer_id,
        vehicle_id: booking.vehicle_id,
        rent_start_date: booking.rent_start_date,
        rent_end_date: booking.rent_end_date,
        total_price: booking.total_price,
        status: booking.status,
        customer: booking.customer,
        vehicle: {
          vehicle_name: booking.vehicle.vehicle_name,
          registration_number: booking.vehicle.registration_number,
        },
      }));

      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: responseData,
      });
    } else {
      responseData = bookings
        .filter((booking: any) => booking.customer_id === currentUserID)
        .map((booking: any) => ({
          id: booking.id,
          vehicle_id: booking.vehicle_id,
          rent_start_date: booking.rent_start_date,
          rent_end_date: booking.rent_end_date,
          total_price: booking.total_price,
          status: booking.status,
          vehicle: {
            vehicle_name: booking.vehicle.vehicle_name,
            registration_number: booking.vehicle.registration_number,
            type: booking.vehicle.type,
          },
        }));

      return res.status(200).json({
        success: true,
        message: "Your bookings retrieved successfully",
        data: responseData,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBooking,
};
