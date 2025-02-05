import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import {  ExamResultSchema } from "@/Utils/ValidationShema";
import {  ExamResult } from "@prisma/client";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Teachers)
 * @path ~/api/v1/exams-results
 * @returns Get All exams-results Data
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
        if(Role(UserFromToken?.role) < 3){
            return NextResponse.json({message:'You Are Not Teacher'}, {status:403})
        }
        const ExamResult = await prisma.examResult.findMany({
            orderBy:{
                createdAt:'desc',
                // score:'desc',
            }
        })
        return NextResponse.json({message:'Success To Get All Exam Result',length:ExamResult.length,data:ExamResult},{status:200})
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
 * @access Privite (Only Users)
 * @path ~/api/v1/exams-results/
 * @returns Create A Specific ExamResult 
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
        const FindUser = await prisma.user.findUnique({where:{id:UserFromToken.id}})
        if(!FindUser){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(UserFromToken.role !== 'USER'){
            return NextResponse.json({message:'Only Users Can Do This'},{status:403}) 
        }
        const body =await request.json()
        const validation = ExamResultSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewExamResult:ExamResult = await prisma.examResult.create({data:{
            score:body.score,
            subjectId:body.subjectId,
            examId:body.examId,
            userId:body.userId,
            teacherId:body.teacherId,
            answersbody:body.answersbody
        }})
        return NextResponse.json({
            message:'Created New Exam Result Successfuly',
            data:NewExamResult,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

