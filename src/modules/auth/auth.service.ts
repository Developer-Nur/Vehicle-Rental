import bcrypt from "bcryptjs";
import { pool } from "../../config/dataBase";
import jwt from "jsonwebtoken";
import config from "../../config";


const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [name, email, hashedPass, phone, role]
  );

  return result;
};


const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role, id: user.id },
    config.jwt_token as string,
    {
      expiresIn: "7d",
    }
  );

  const { password: userPassword, created_at, updated_at, ...userData } = user;

  return { token, userData };
};

export const authServices = {
  loginUser,
  createUser,
};
