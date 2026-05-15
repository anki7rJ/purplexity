import  { type NextFunction, type Request, type Response } from 'express'
import { signinSchema , signupSchema } from '../validation/authValidation'
import prisma from '../../db';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const signup = async (req:Request,res:Response)=>{
    try {
        const response = signupSchema.safeParse(req.body)
        
    
        if(!response.success){
            return res.status(400).json({
                status:false,
                message:"SignUp failed"
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
    } catch (error) {
        
        return res.status(500).json({
            status:false,
            message:"Unable to create account"
        })
    }
}

export const signin = async (req:Request,res:Response,next:NextFunction)=>{
    try {
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
    
        const token = jwt.sign({user_id:foundUser.id},process.env.JWT_SECRET!,{expiresIn:"1h"})
        res.cookie("token",token,{
            path:'/',
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"lax",
            maxAge:60*60*1000
        })
    
        res.status(200).json({
            status:true,
            message:"User logged in",
        })
    } catch (error) {
        
        return res.status(500).json({
            status:false,
            message:"Unable to sign in"
        })
    }
}

export const logout = (req:Request,res:Response)=>{
 try {
     res.clearCookie("token",{
        path:'/',
        httpOnly:true,
        secure:true,
        sameSite:"none"
    })

    res.status(200).json({
        status:true,
        message:"User Logged out"
    })
    
 } catch (error) {
    return res.status(500).json({
            status:false,
            message:"Unable to LogOut"
        })
    
 }

}

