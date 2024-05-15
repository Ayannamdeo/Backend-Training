import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { serverConfig } from "../../config";

class AuthMiddleware {
  static authenticate = (req: Request, res: Response, next: NextFunction): void => {
    // console.log(req);
    console.log(req.cookies);
    console.log(req.cookies?.JWT_Token);
    
    
    const cookietoken = req.cookies?.JWT_Token;
    console.log("cookie token is: ", cookietoken);
    if(!cookietoken){
      res.status(401).json({message: "Authorization cookie token is missing"});
      return;
    }
    try {
     const decoded =  JWT.verify(cookietoken, serverConfig.jwtSecret);
     console.log("decode", decoded);
     next();

    } catch (error) {
      res.status(401).json({message: "Invalid Token or Session expired"});
    }
  };

    static restrictTo = (roles: string[] = []) =>{
        return (req: Request, res: Response, next: NextFunction): void => {
            const token = req.cookies?.JWT_Token;
            const decoded = JWT.decode(token)
            console.log(decoded);

            const decodedPayload = decoded as any;
            const existingUserRole = decodedPayload.role;

            if(!roles.includes(existingUserRole)) {
                res.status(401).json({message: "UNAUTHORIZED"});
                return ;
            }

            next();
            // res.send("CHECKPOINT");
        }

    };
}

export { AuthMiddleware };
