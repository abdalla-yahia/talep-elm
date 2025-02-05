import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { CommentsSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/comments/:id
 * @returns Get A Specific Comments Of Lesson
 */


export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
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
        const FindComments = await prisma.reComment.findUnique({
            where:{id:parseInt(id)}
    })
        if(!FindComments){
            return NextResponse.json({message:'Comment Not Found'},{status:404})
            }
            return NextResponse.json({FindComments,status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/Comments/:id
 * @returns Update A Specific Lesson Data
 */


export async function PUT(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
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
        const FindComments = await prisma.reComment.findUnique({
            where:{id:parseInt(id)},
            
    })
        if(UserFromToken.id !== FindComments?.userId && Role(UserFromToken.role) < 1){
            return NextResponse.json({message:'Only Teachers Can Update This Comments'},{status:403}) 
        }
        if(!FindComments){
            return NextResponse.json({message:'Comments Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = CommentsSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateComments = await prisma.reComment.update({where:{id:parseInt(id)},data:{
                text:body.text,
            }})
            return NextResponse.json({message:'Success To Update Re-Comments',UpdateComments,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
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
        const FindComments = await prisma.reComment.findUnique({where:{id:parseInt(id)}})
        if(!FindComments){
            return NextResponse.json({message:'Comment Not Found'},{status:404})
            }
        if(UserFromToken.id !== FindComments?.userId && Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Be Delete This Comment'},{status:403}) 
        }
            await prisma.reComment.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Comment',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}