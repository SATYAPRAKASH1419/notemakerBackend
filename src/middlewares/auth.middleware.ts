import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import jwt from "jsonwebtoken"
const JWT_SECRET= process.env.JWT_SECRET || "development";

export const requireAuth = (req:Request,res:Response,next:NextFunction)=>{
    const token= req.cookies.token;

    if(!token){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            error:"Not Authenticated"
        })
        return;
    }

    try {
        const decodedToken= jwt.verify(token,JWT_SECRET) as {userId:string};
        req.userId= decodedToken.userId;
        next();
    } catch (error) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            error:"Invalid Token"
        })
         return;
    }
}