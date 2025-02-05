import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { AssinmentResultSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/assinments-results/:id
 * @returns Get A Specific assinments-results Data
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
        const UserFromToken = Jwt.verify(token, SecretKey) as TokenInterFace;
        if(!UserFromToken){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(UserFromToken?.role === 'USER'){
        const FindAssinmentResult = await prisma.assinmentResult.findFirst({
            where:{userId:UserFromToken?.id,assinmentId:parseInt(id)},
            include:{
                lesson:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                Subjects:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                Assinments:{
                    select:{
                        id:true,
                        name:true,
                        assinmentbody:true
                    }
                }
            }
        })
        if(!FindAssinmentResult){
            return NextResponse.json({message:'This AssinmentResult Not Found',data:{userId:UserFromToken.id,AssinId:id}},{status:404})
            }
            return NextResponse.json(FindAssinmentResult,{status:200})
        }else {
            const FindAssinmentResult = await prisma.assinmentResult.findUnique({
                where:{id:parseInt(id)},
                include:{
                    User:{
                        select:{
                            id:true,
                            name:true
                        }
                    },
                    lesson:{
                        select:{
                            id:true,
                            name:true
                        }
                    },
                    Subjects:{
                        select:{
                            id:true,
                            name:true
                        }
                    },
                    Assinments:{
                        select:{
                            id:true,
                            name:true,
                            assinmentbody:true
                        }
                    }
                }
            })
            if(!FindAssinmentResult){
                return NextResponse.json({message:'This AssinmentResult Not Found',data:{userId:UserFromToken.id,AssinId:id}},{status:404})
                }
                return NextResponse.json(FindAssinmentResult,{status:200})
        }
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/assinments-results/:id
 * @returns Update A Specific AssinmentResult Data
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
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) > 0){
            return NextResponse.json({message:'Only Users Can Do This'},{status:403}) 
        }
        const FindAssinmentResult = await prisma.assinmentResult.findFirst({
            where:{userId:UserFromToken.id, assinmentId:parseInt(id)

            }})
        if(!FindAssinmentResult){
            return NextResponse.json({message:'AssinmentResult Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = AssinmentResultSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateAssinmentResult = await prisma.assinmentResult.updateMany({
                where:{userId:UserFromToken.id, assinmentId:parseInt(id)},data:{
                score: body.score,
                answersbody:body.answersbody
            }})
            return NextResponse.json({message:'Success To Update AssinmentResult',UpdateAssinmentResult},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Teachers Or < )
 * @path ~/api/v1/assinments/:id
 * @returns Delete A Specific Assinments Data
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
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) < 2){
            return NextResponse.json({message:'Only Teachers Can Do This'},{status:403}) 
        }
        const FindAssinmentResult = await prisma.assinmentResult.findUnique({where:{id:parseInt(id)}})
        if(!FindAssinmentResult){
            return NextResponse.json({message:'AssinmentResult Not Found'},{status:404})
            }
            await prisma.assinmentResult.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete AssinmentResult',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}