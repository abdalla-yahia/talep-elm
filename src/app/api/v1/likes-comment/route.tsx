import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import {  LikesComment } from "@prisma/client";

/**
 * @method GET
 * @access Privite All Users
 * @path ~/api/v1/comments
 * @returns Get All comments Of Lesson 
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
            return NextResponse.json({message:'You Are Not Allow, Login First'}, {status:403})
        }
        const Likes_Comment = await prisma.likesComment.findMany({})
        return NextResponse.json({message:'Success To Get All Comments',length:Likes_Comment.length,data:Likes_Comment},{status:200})
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
        
        const Likes_Comment:LikesComment = await prisma.likesComment.create({data:{
            like:body.like,
            disLike:body.disLike,
            love:body.love,
            hate:body.hate,
            commentId:body.commentId,
            lessonId:body.lessonId,
            subjectId:body.subjectId,
            userId:body.userId,
            teacheId:body.teacheId,
            adminId:body.adminId,
            mangerId:body.managerId,
            leaderId:body.leaderId,
            ownerId:body.ownerId,
            reCommentId:body.reCommentId
        }
    })
        return NextResponse.json({
            message:'Created Likes_Comment Successfuly',
            data:Likes_Comment
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error},{status:400})
    }
}

