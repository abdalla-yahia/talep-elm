import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { ExamSchema } from "@/Utils/ValidationShema";
import { Exam } from "@prisma/client";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite All Users
 * @path ~/api/v1/exams
 * @returns Get All Exams Data
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
        const UserFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(!UserFromToken){
            return NextResponse.json({message:'You Are Not Login'}, {status:403})
        }
        const exams = await prisma.exam.findMany({
           include:{
            Subjects:{
                select:{
                    id:true,
                    name:true
                }
            },
            User:{
                select:{
                    id:true,
                    name:true
                }
            },
            ExamResult:{
                select:{
                    id:true,
                    score:true,
                    examId:true,
                    User:{
                        select:{
                            id:true,
                            name:true
                        }
                    }
                }
            }
           },orderBy:{
            createdAt:'desc',
           }
        })
        return NextResponse.json({message:'Success To Get Exams',length:exams.length,data:exams},{status:200})
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
 * @path ~/api/v1/exams/
 * @returns Create A Specific Exam 
 */

export async function POST(request:NextRequest){
    try {
        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const UserFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(!UserFromToken){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Your Not Allow To Create Exam, Only Teachers'},{status:401})
        }
        const body =await request.json()
        const validation = ExamSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewExam:Exam = await prisma.exam.create({data:{
            title:body.title,
            Exambody:body.Exambody,
            fullDegree:body.fullDegree,
            subjectId:body.subjectId,
            teacherId:body.teacherId
        }})
        return NextResponse.json({
            message:'Created Exam Successfuly',
            data:NewExam,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

