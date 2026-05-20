import { NextFunction, Request, Response } from "express";
import prisma from "../../db";



export const history = async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.user?.id
    if(!userId){
        throw new Error("Unauthorized")
    }

    const userWithQueries = await prisma.user.findFirst({
        where:{id:userId},
        include:{
            queries:{
                orderBy:{
                    createdAt:"desc"
                }
            }
        }
    })
    

    res.status(200).json({
        status:true,
        history:userWithQueries
    })

}