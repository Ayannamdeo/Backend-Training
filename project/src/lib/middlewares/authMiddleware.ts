import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { serverConfig } from "../../config";
import { logger } from "../helpers/logger";

class AuthMiddleware {
  static authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    logger.debug("Request cookies", { cookies: req.cookies });

    const cookietoken = req.cookies?.JWT_Token;

    if (!cookietoken) {
      logger.warn("Authorization cookie token is missing");
      res
        .status(401)
        .json({ message: "Authorization cookie token is missing" });
      return;
    }
    try {
      const boolean = JWT.verify(cookietoken, serverConfig.jwtSecret);
      logger.debug("verified or not: ", { boolean });
      next();
    } catch (error) {
      logger.error("Invalid Token or Session expired", { error });
      res.status(401).json({ message: "Invalid Token or Session expired" });
    }
  };

  static restrictTo = (roles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const token = req.cookies?.JWT_Token;
      const decoded = JWT.decode(token);
      logger.debug("Decoded token in restrictTo", { decoded });

      const decodedPayload = decoded as any;
      const existingUserRole = decodedPayload.role;

      if (!roles.includes(existingUserRole)) {
        logger.warn("Unauthorized access attempt", { existingUserRole, roles, });
        res.status(401).json({ message: "UNAUTHORIZED" });
        return;
      }

      next();
      // res.send("CHECKPOINT");
    };
  };
}

export { AuthMiddleware };
