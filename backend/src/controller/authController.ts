import  { type NextFunction, type Request, type Response } from 'express'
import { signinSchema , signupSchema } from '../validation/validation.js'
import { prisma } from '../../db.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const signup = async (req:Request,res:Response)=>{
    const response = signupSchema.safeParse(req.body)

    if(!response.success){
        return res.status(400).json({
            status:false,
            messsage:"SignUp failed"
        })
    }
    const {email,password,name} = response.data

    const checkUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(checkUser){
        return res.status(400).json({
            status:false,
            message:"User With this email Already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await prisma.user.create({
        data:{
            email:email,
            password:hashedPassword,
            name:name
        }
    })

    res.status(200).json({
        status:true,
        message:`User Created ${ newUser.name}`,
       
    })


}

export const signin = async (req:Request,res:Response,next:NextFunction)=>{
    const respond = signinSchema.safeParse(req.body)

    if(!respond.success){
        return res.status(400).json({
            status:false,
            message:"Authentication falied"
        })
    }

    const {email,password} = respond.data

    const foundUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(!foundUser){
        return res.status(400).json({
            status:false,
            message:`User with email ${email} not found `
        })
    }
    const hashedPassword = foundUser.password

    const verifyPassword = await bcrypt.compare(password,hashedPassword)

    if(!verifyPassword){
        return res.status(400).json({
            status:false,
            message:"Password Incorrect"
        })

    }

    const token = jwt.sign({name:foundUser.name},process.env.JWT_SECRET!,{expiresIn:"1h"})

    res.status(200).json({
        status:true,
        message:"User logged in",
        token
    })
    

}

