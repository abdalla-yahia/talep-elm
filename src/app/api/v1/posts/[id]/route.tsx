import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { PostsSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access public
 * @path ~/api/v1/Posts/:id
 * @returns Get A Specific Post Data
 */


export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try{
        const id = (await params).id;
        const FindPost = await prisma.posts.findUnique({where:{id:parseInt(id)}})
       
        if(!FindPost){
            return NextResponse.json({message:'Post Not Found'},{status:404})
            }
            return NextResponse.json({message:'Success To Get Post',data:FindPost,status:200},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only owner)
 * @path ~/api/v1/posts/:id
 * @returns Update A Specific Post Data
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
        if(Role(UserFromToken.role) < 4){
            return NextResponse.json({message:'Only Owners Can Do This'},{status:403}) 
        }
        const FindPost = await prisma.posts.findUnique({where:{id:parseInt(id)}})
        if(!FindPost){
            return NextResponse.json({message:'Post Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = PostsSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdatePost = await prisma.posts.update({where:{id:parseInt(id)},data:{
                title: body.title,
                content:body.content,
                body:body.body,
                author:body.author
            }})
            return NextResponse.json({message:'Success To Update Post',UpdatePost,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Owner)
 * @path ~/api/v1/Posts/:id
 * @returns Delete A Specific Post Data
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
        if(Role(UserFromToken.role) < 4){
            return NextResponse.json({message:'Only Admins Can Do This'},{status:403}) 
        }
        const FindPost = await prisma.posts.findUnique({where:{id:parseInt(id)}})
        if(!FindPost){
            return NextResponse.json({message:'Post Not Found'},{status:404})
            }
            await prisma.posts.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Post',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:500},{status:500})
    }
}