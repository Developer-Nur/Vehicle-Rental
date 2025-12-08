import { pool } from "../../config/dataBase";

const getAllUser = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users;`
  );
  return result;
};

const updateUser = async (payload: Record<string, unknown>, id: number) => {
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         email = $2,
         phone = $3,
         role = $4,
         updated_at = NOW()
     WHERE id = $5
     RETURNING id, name, email, phone, role`,
    [name, email, phone, role, id]
  );
  return result;
};

const deleteUser = async (id: number) => {
  const userBookingStatus = await pool.query(
    `SELECT EXISTS (SELECT 1 FROM bookings WHERE customer_id = $1) AS has_booking;`,
    [id]
  );

  const hasBooking = userBookingStatus.rows[0].has_booking;

  if (hasBooking) {
    return false;
  }

  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );

  return result;
};

export const userServices = {
  getAllUser,
  updateUser,
  deleteUser,
};
