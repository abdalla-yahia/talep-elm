import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace, UserPayload } from "@/Interfaces/InterFaces";
import { AssinmentsSchema } from "@/Utils/ValidationShema";
import { AssinmentResult } from "@prisma/client";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Teachers)
 * @path ~/api/v1/assinments-results
 * @returns Get All Assinments Data
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
        if(Role(UserFromToken?.role) < 2){
            return NextResponse.json({message:'You Are Not Teacher'}, {status:403})
        }
        const AssinmentResult = await prisma.assinmentResult.findMany({
            orderBy:{
                score:'desc'
            },
            include:{
                User:{
                    select:{
                        id: true,
                        name: true,
                        email: true,
                            },
                    },
                    Assinments:{
                        select:{
                            id:true,
                            name:true,
                            assinmentbody:true,
                            Subjects:{
                                select:{
                                    id:true,
                                    name:true,
                                    Lessons:{
                                        select:{
                                            id:true,
                                            name:true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
               
            
        })
        return NextResponse.json({message:'Success To Get All Assinment Result',length:AssinmentResult.length,data:AssinmentResult},{status:200})
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
 * @access Privite (Only User)
 * @path ~/api/v1/assinments/
 * @returns Create A Specific Assinment Result
 */

export async function POST(request:NextRequest){
    try {
        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const UserFromToken = Jwt.verify(token,SecretKey) as UserPayload
        const FindUser = await prisma.user.findUnique({where:{id:UserFromToken.id}})
        if(!FindUser){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(UserFromToken?.role === 'USER'){
        
        const body =await request.json()
        const validation = AssinmentsSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewAssinment:AssinmentResult = await prisma.assinmentResult.create({data:{
            score:body.score,
            subjectId:body.subjectId,
            lessonId:body.lessonId,
            userId:body.userId,
            teacherId:body.teacherId,
            assinmentId:body.assinmentId,
            answersbody:body.answersbody
        }})
        return NextResponse.json({
            message:'Created Assinments Results Successfuly',
            data:NewAssinment,
            status:201
        },
    {status:201})
}else return NextResponse.json({message:'You Are Not Student To Create Assinments Results',status:403}, {status:403})

    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error},{status:400})
    }
}

