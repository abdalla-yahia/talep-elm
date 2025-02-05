import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/likes-comment/:id
 * @returns Get A Specific Likes-Comments Of Lesson
 */


export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try {
        const id = (await params).id;
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
        const FindComments = await prisma.likesComment.findUnique({
            where:{id:parseInt(id)}
        })
        if(!FindComments){
            return NextResponse.json({message:'likes-Comment Not Found'},{status:404})
            }
            return NextResponse.json(FindComments,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}


/**
 * @method DELETE
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/re-comment/:id
 * @returns Delete A Specific Re-Comments Data
 */


export async function DELETE(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try{
        const id = (await params).id;
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
        const FindComments = await prisma.likesComment.findUnique({where:{id:parseInt(id)}})
        if(!FindComments){
            return NextResponse.json({message:'Likes-Comment Not Found'},{status:404})
            }
        // if( (FindComments?.userId  === UserFromToken.id)){
        //     return NextResponse.json({message:'Thats Only Teachers Can Be Delete This Likes-Comment'},{status:403}) 
        // }
            await prisma.likesComment.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Likes-Comment'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}