import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import {  CommentsSchema } from "@/Utils/ValidationShema";
import {  ReComment } from "@prisma/client";

/**
 * @method GET
 * @access Privite All Users
 * @path ~/api/v1/comments
 * @returns Get All comments Of Lesson 
*/


export async function GET(request:NextRequest){
    try {
        //Use It When Create Pagination
        // const PageNumber = request.nextUrl.searchParams.get('pageNumber')
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
            return NextResponse.json({message:'You Are Not Allow, Login First'}, {status:403})
        }
        const Comments = await prisma.reComment.findMany({
            include:{
                likes:true
            },
            orderBy:{
                createdAt:'desc'
            }
        })
        return NextResponse.json({message:'Success To Get All Comments',length:Comments.length,data:Comments,status:200},{status:200})
    } catch (error) {
        return NextResponse.json({
            messahe:'Some Thing Went Wrong',
            error,
            status:400
        },
    {status:400})
    }
}

/**
 * @method POST
 * @access Privite All Users
 * @path ~/api/v1/Comments/
 * @returns Create A Specific Comment Lesson 
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

        const body =await request.json()
        const validation = CommentsSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const ReComment:ReComment = await prisma.reComment.create({data:{
            text:body.text,
            userId:body.userId,
            lessonId:body.lessonId,
            commentId:body.commentId,
            subjectId:body.subjectId,
            adminId:body.adminId,
            teacheId:body.teacheId,
            AdminTeacher:body.AdminTeacher,
            mangerId:body.mangerId,
            ownerId:body.ownerId,
        }
    })
        return NextResponse.json({
            message:'Created Re-Comment Successfuly',
            data:ReComment,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

