import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access public
 * @path ~/api/v1/News/:id
 * @returns Get A Specific New Data
 */


export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try{
        const id = (await params).id;
        const FindNew = await prisma.news.findUnique({where:{id:parseInt(id)}})
       
        if(!FindNew){
            return NextResponse.json({message:'News Not Found'},{status:404})
            }
            return NextResponse.json({message:'Success To Get News',data:FindNew,status:200},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only owner)
 * @path ~/api/v1/News/:id
 * @returns Update A Specific New Data
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
        const FindNew = await prisma.news.findUnique({where:{id:parseInt(id)}})
        if(!FindNew){
            return NextResponse.json({message:'New Not Found'},{status:404})
            }
            const body =await request.json();

            const UpdateNew = await prisma.news.update({where:{id:parseInt(id)},data:{
                content:body.content,
                author:body.author
            }})
            return NextResponse.json({message:'Success To Update New',UpdateNew,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Owner)
 * @path ~/api/v1/News/:id
 * @returns Delete A Specific New Data
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
        const FindNew = await prisma.news.findUnique({where:{id:parseInt(id)}})
        if(!FindNew){
            return NextResponse.json({message:'New Not Found'},{status:404})
            }
            await prisma.news.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete New',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:500},{status:500})
    }
}