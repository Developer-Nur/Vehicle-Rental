import { Response, Request } from "express";
import { authServices } from "./auth.service";

const createUserToDB = async (req: Request, res: Response) => {
  try {
    const validRoles = ["admin", "customer"];
    const role = String(req.body.role).toLowerCase();
    const isValid = validRoles.includes(role);

    if (!isValid) {
      return res.status(400).json({
        status: false,
        message: "Role must be admin or customer!",
      });
    }
    const result = await authServices.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.loginUser(email, password);

    if (!result) {
      return res.status(401).json({
        status: false,
        message: "Incorrect Credentials!!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "login successful",
      data: { token: result.token, user: result.userData },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  loginUser,
  createUserToDB,
};
