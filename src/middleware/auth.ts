import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized!!",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_token as string
      ) as JwtPayload;

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          status: false,
          message: "Forbidden - insufficient permissions",
        });
      }

      next();
    } catch (err: any) {
      return res.status(401).json({
        status: false,
        message: err?.message || "Unauthorized",
      });
    }
  };
};

export default auth;
