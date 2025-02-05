import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { AdminPayload, TokenInterFace } from "@/Interfaces/InterFaces";
import {  AdminsSchema } from "@/Utils/ValidationShema";
import {  Admins } from "@prisma/client";
import Role from "@/Utils/Role";
import bcrypt from 'bcryptjs'
import { cookies } from "next/headers";
import { SetCookies } from "@/Utils/GenerateToken";
/**
 * @method GET
 * @access Privite (Only Admins Or > )
 * @path ~/api/v1/Admins
 * @returns Get All Admins Data
 */


export async function GET(request:NextRequest){
    try {
        const cookie = request.cookies.get('JwtToken');
        if(!cookie){
            return NextResponse.json({message:'You Are not Login'}, {status:401})
        }
        const token =cookie?.value as string;
        if(!token){
            return NextResponse.json({message:'Unauthorized'}, {status:401})
        }
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const AdminFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(Role(AdminFromToken.role) < 3){
            return NextResponse.json({message:'You Are Not Allow To Do That, Only Managers'}, {status:403})
        }
        const Admins = await prisma.admins.findMany()
        return NextResponse.json({meassage:'Success To Get All Admins',length:Admins.length,Admins},{status:200})
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
 * @access Privite (Only Admins)
 * @path ~/api/v1/admins/
 * @returns Create A Specific Admin 
 */

export async function POST(request:NextRequest){
    try {
        const cookie = request.cookies.get('RegisterToken')
        if(!cookie){
            return NextResponse.json({message:'You Dont Have Permision To Create This Admin'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const AdminFromToken = Jwt.verify(token,SecretKey) as AdminPayload
        const FindAdmin = AdminFromToken?.role 
        if(!FindAdmin || FindAdmin !== 'ADMIN'){
            return NextResponse.json({message:'Not Found'},{status:404})
        }
        const body =await request.json()
        const validation = AdminsSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(body.password,salt)
        const NewAdmin:Admins = await prisma.admins.create({data:{
            name:body.name,
            email:body.email,
            password:hashpassword,
            telephone:body.telephone,
            gender:body.gender,
            role:body.role,
            groupId:body.groupId,
            leaderId:body.leaderId
        }})
        ;(await cookies()).delete('RegisterToken')
        const Admincookies = SetCookies({
            id: NewAdmin.id,
            role: NewAdmin.role,
            email: NewAdmin.email,
            path:'admins',
            gender:NewAdmin.gender,
            name:NewAdmin.name,
            image:NewAdmin.image as string,
          });
      
        return NextResponse.json({
            message:'Created Admin Successfuly',
            data:NewAdmin
        },
    {status:201,headers:{'Set-Cookie':Admincookies}})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error},{status:400})
    }
}

