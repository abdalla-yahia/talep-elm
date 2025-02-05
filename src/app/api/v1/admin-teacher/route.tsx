import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import {  AdminTeacherSchema } from "@/Utils/ValidationShema";
import {  AdminTeacher } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { cookies } from "next/headers";
import { SetCookies } from "@/Utils/GenerateToken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
/**
 * @method GET
 * @access Privite (Only Manahers Or > )
 * @path ~/api/v1/admin-teacher
 * @returns Get All AdminTeacher Data
 */


export async function GET(){
    try {

        const AdminTeacher = await prisma.adminTeacher.findMany()
        return NextResponse.json({Message:'Success To Get All Admin Teachers',length:AdminTeacher.length,data:AdminTeacher},{status:200})
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
 * @access Privite (Only Manahers)
 * @path ~/api/v1/admin-teacher/
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
        const AdminFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindAdmin = AdminFromToken?.role  
        if(!FindAdmin || FindAdmin !== 'ADMIN_TEACHER'){
            return NextResponse.json({message:'Not Found'},{status:404})
        }
        const body =await request.json()
        const validation = AdminTeacherSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(body.password,salt)
        const NewAdminTeacher:AdminTeacher = await prisma.adminTeacher.create({data:{
            name:body.name,
            email:body.email,
            password:hashpassword,
            telephone:body.telephone,
            gender:body.gender,
            managerId:body.managerId
        }})
        ;(await cookies()).delete('RegisterToken')
        const AdminTeachercookies = SetCookies({
            id: NewAdminTeacher.id,
            role: NewAdminTeacher.role,
            email: NewAdminTeacher.email,
            path:'admin-teacher',
            gender:NewAdminTeacher.gender,
            name:NewAdminTeacher.name,
            image:NewAdminTeacher.image as string,
          });
      
        return NextResponse.json({
            message:'Created Admin-Teacher Successfuly',
            data:NewAdminTeacher,
            status:201
        },
    {status:201,headers:{'Set-Cookie':AdminTeachercookies}})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

