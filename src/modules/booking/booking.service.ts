import { pool } from "../../config/dataBase";

const findUser = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const findVehicle = async (id: number) => {
  const result = await pool.query(
    `SELECT daily_rent_price FROM vehicles WHERE id = $1`,
    [id]
  );
  return result;
};

const createBooking = async (payload: Record<string, unknown>) => {
  const {
    total_price,
    rent_end_date,
    rent_start_date,
    customer_id,
    vehicle_id,
  } = payload;

  const result = await pool.query(
    `INSERT INTO bookings(total_price,
    rent_end_date,
    rent_start_date,
    customer_id,
    status,
    vehicle_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, total_price,  rent_end_date, 
    rent_start_date,
     customer_id, vehicle_id, status`,
    [
      total_price,
      rent_end_date,
      rent_start_date,
      customer_id,
      "active",
      vehicle_id,
    ]
  );

  let updatedVehicle = null;

  if (result.rowCount && result.rowCount > 0) {
    const vehicleResult = await pool.query(
      `UPDATE vehicles 
       SET availability_status=$1 
       WHERE id=$2
       RETURNING id, vehicle_name, daily_rent_price`,
      ["booked", vehicle_id]
    );
    updatedVehicle = vehicleResult.rows[0];
  }

  return {
    booking: result.rows[0],
    vehicle: updatedVehicle,
  };
};

const getAllBooking = async () => {
  const result = await pool.query(` SELECT id, vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status FROM vehicles`);
  return result;
};

export const bookingService = {
  findUser,
  findVehicle,
  createBooking,
  getAllBooking,
};
