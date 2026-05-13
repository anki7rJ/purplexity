import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


export function authMiddleware(req:Request,res:Response,next:NextFunction){
   try {
    const header = req.headers["authorization"]
    
    let token 
    if(header?.startsWith("Bearer ")){
        token = header.split(" ")[1]
    }else{
        token = header
    }
    

    if(!token){
       return res.status(401).json({
            status:"false",
            message:"user is not authorized "
        })
    }

    const userVerification = jwt.verify(token!,process.env.JWT_SECRET!)

    if(!userVerification){
        return res.status(401).json({
            satatus:"false",
            message:"User is not verified"

        })
    }


    req.user = userVerification
    next()
    
   } catch (error) {
    console.error(error)
    
   }

}