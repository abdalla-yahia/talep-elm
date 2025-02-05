import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { TeacherSchema } from "@/Utils/ValidationShema";
import { Teachers } from "@prisma/client";
import Role from "@/Utils/Role";
import bcrypt from 'bcryptjs'
import { cookies } from "next/headers";
import { SetCookies } from "@/Utils/GenerateToken";
/**
 * @method GET
 * @access Privite (Only Leaders)
 * @path ~/api/v1/teachers
 * @returns Get All Teachers Data
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
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace;
        if(Role(TeacherFromToken?.role) < 2){
            return NextResponse.json({message:'You Are Not Allow To Do That, Only Managers'}, {status:403})
        }
        const Teachers = await prisma.teachers.findMany()
        return NextResponse.json({message:'Success To Get All Teachers',length:Teachers.length,Teachers},{status:200})
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
 * @access Privite (Only Leaders)
 * @path ~/api/v1/teachers/
 * @returns Create A Specific Teacher 
 */

export async function POST(request:NextRequest){
    try {
        const cookie = request.cookies.get('RegisterToken')
        if(!cookie){
            return NextResponse.json({message:'You Dont Have Permision To Create This Admin'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindTeacher = TeacherFromToken?.role 
        if(!FindTeacher || FindTeacher !== 'TEACHER'){
            return NextResponse.json({message:'Not Found'},{status:404})
        }
        const body =await request.json()
        const validation = TeacherSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(body.password,salt)
        const NewTeacher:Teachers = await prisma.teachers.create({data:{
            name:body.name,
            email:body.email,
            password:hashpassword,
            telephone:body.telephone,
            gender:body.gender,
            groupId:body.groupId,
            subjectId:body.subjectId,
            leaderId:body.leaderId
        }})
        ;(await cookies()).delete('RegisterToken')
        const Teachercookies = SetCookies({
            id: NewTeacher.id,
            role: NewTeacher.role,
            email: NewTeacher.email,
            path:'teachers',
            gender:NewTeacher.gender,
            name:NewTeacher.name,
            image:NewTeacher.image as string,
          });
      
        return NextResponse.json({
            message:'Created Teacher Successfuly',
            data:NewTeacher,
            status:201
        },
    {status:201,headers:{'Set-Cookie':Teachercookies}})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

