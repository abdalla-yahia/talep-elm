import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import {  ManagersSchema } from "@/Utils/ValidationShema";
import {  Manager } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { cookies } from "next/headers";
import { SetCookies } from "@/Utils/GenerateToken";
/**
 * @method GET
 * @access Privite (Only Managers Or > )
 * @path ~/api/v1/Managers
 * @returns Get All Managers Data
 */


export async function GET(){
    try {
       
        const Managers = await prisma.manager.findMany()
        return NextResponse.json({message:'Get All MAnger Successfully',length:Managers.length,Managers},{status:200})
    } catch (error) {
        return NextResponse.json({
            messahe:'Some Thing Went Wrong',
            error
        },
    {status:400})
    }
}

/**
 * @method POST
 * @access Privite (Only Managers)
 * @path ~/api/v1/Managers/
 * @returns Create A Specific Manager 
 */

export async function POST(request:NextRequest){
    try {
        const cookie = request.cookies.get('RegisterToken')
        if(!cookie){
            return NextResponse.json({message:'You Dont Have Permision To Create This Admin'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const ManagerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindManager = ManagerFromToken?.role 
        if(!FindManager || FindManager !== 'MANAGER'){
            return NextResponse.json({message:'Not Found'},{status:404})
        }
        const body =await request.json()
        const validation = ManagersSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(body.password,salt)
        const NewManager:Manager = await prisma.manager.create({data:{
            name:body.name,
            email:body.email,
            password:hashpassword,
            telephone:body.telephone,
            gender:body.gender,
            ownerId:body.ownerId
        }})
        ;(await cookies()).delete('RegisterToken')
        const Managercookies = SetCookies({
            id: NewManager.id,
            role: NewManager.role,
            email: NewManager.email,
            path:'managers',
            gender:NewManager.gender,
            name:NewManager.name,
            image:NewManager.image as string,
          });
      
        return NextResponse.json({
            message:'Created Manager Successfuly',
            data:NewManager,
            status:201
        },
    {status:201,headers:{'Set-Cookie':Managercookies}})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

