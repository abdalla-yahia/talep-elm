import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TeacherPayload, TokenInterFace } from "@/Interfaces/InterFaces";
import { AssinmentsSchema } from "@/Utils/ValidationShema";
import { Assinments } from "@prisma/client";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Admins)
 * @path ~/api/v1/assinments
 * @returns Get All Assinments Data
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
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TeacherPayload
        if(!TeacherFromToken){
            return NextResponse.json({message:'You Are Not Login, Login First'}, {status:403})
        }
        const Assinment = await prisma.assinments.findMany({
            include:{
                    AssinmentResult:{
                        select:{
                            id:true,
                            score:true,
                            User:true
                        }
                },
                Subjects:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                Lessons:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                teacher:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            },
            orderBy:{
                createdAt:'desc',
            }
        })
        return NextResponse.json({message:'Success To Get All Assinnmnts',length:Assinment.length,data:Assinment},{status:200})
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
 * @path ~/api/v1/assinments/
 * @returns Create A Specific Assinment 
 */

export async function POST(request:NextRequest){
    try {
        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(!TeacherFromToken){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if( Role(TeacherFromToken.role) < 2){
            return NextResponse.json({message:'You Are Not Teacher To Create Assinments'}, {status:403})
        }
        const body =await request.json()
        const validation = AssinmentsSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewAssinment:Assinments = await prisma.assinments.create({data:{
            name:body.name,
            description:body.description,
            subjectId:body.subjectId,
            lessonId:body.lessonId,
            teacherId:body.teacherId,
            assinmentbody:body.assinmentbody
        }})
        return NextResponse.json({
            message:'Created Assinment Successfuly',
            data:NewAssinment,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

