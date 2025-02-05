import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import {  FinalResultSchema } from "@/Utils/ValidationShema";
import {  FinalResult } from "@prisma/client";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Teachers)
 * @path ~/api/v1/final-results
 * @returns Get All final-results Data
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
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'You Are Not Teacher'}, {status:403})
        }
        const FinalResult = await prisma.finalResult.findMany()
        return NextResponse.json({message:'Success To Get All Final Result',length:FinalResult.length,data:FinalResult},{status:200})
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
 * @path ~/api/v1/final-results/
 * @returns Create A Specific FinalResult 
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

        const body =await request.json()
        const validation = FinalResultSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewFinalResult:FinalResult = await prisma.finalResult.create({data:{
            score:body.score,
            examId:body.examId,
            subjectId:body.subjectId,
            userId:body.userId,
            teacherId:body.teacherId
        }})
        return NextResponse.json({
            message:'Created New Final Result Successfuly',
            data:NewFinalResult
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error},{status:400})
    }
}

