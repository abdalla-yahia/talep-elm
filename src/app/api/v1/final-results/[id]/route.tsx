import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { FinalResultSchema } from "@/Utils/ValidationShema";
import { FinalResult } from "@prisma/client";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/final-results/:id
 * @returns Get A Specific Final-results Data
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
            return NextResponse.json({message:'You Are Not Found'},{status:404})
        }
        if(Role(UserFromToken?.role) < 3){
            return NextResponse.json({message:'You Are Not Teacher'}, {status:403})
        }
        const FindFinalResult = await prisma.finalResult.findUnique({where:{id:parseInt(id)}})
        if(!FindFinalResult){
            return NextResponse.json({message:'Final Result Not Found'},{status:404})
            }
            return NextResponse.json(FindFinalResult,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/Final-results/:id
 * @returns Update A Specific FinalResult Data
 */


export async function PUT(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
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
            return NextResponse.json({message:'Teach Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Update This'},{status:403}) 
        }
        const FindFinalResult = await prisma.finalResult.findUnique({where:{id:parseInt(id)}})
        if(!FindFinalResult){
            return NextResponse.json({message:'FinalResult Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = FinalResultSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateFinalResult:FinalResult = await prisma.finalResult.update({where:{id:parseInt(id)},data:{
                score:body.score
            }})
            return NextResponse.json({message:'Success To Update Final Result',UpdateFinalResult},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/Final-results/:id
 * @returns Delete A Specific FinalResult Data
 */


export async function DELETE(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
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
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Delete This'},{status:403}) 
        }
        const FindFinalResult = await prisma.finalResult.findUnique({where:{id:parseInt(id)}})
        if(!FindFinalResult){
            return NextResponse.json({message:'Final Result Not Found'},{status:404})
            }
            await prisma.finalResult.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Final Result'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}