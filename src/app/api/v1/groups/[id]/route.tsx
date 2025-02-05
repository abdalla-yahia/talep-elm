import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { GroupssSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/groups/:id
 * @returns Get A Specific Group Data
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
        if(Role(UserFromToken.role) < 1){
            return NextResponse.json({message:'Your Not Allow To Get Group, Only Admins'},{status:401})
        }
        const pagecount = await prisma.groups.findUnique({where:{id:parseInt(id)},
        include:{
            User:true
        }
    })
        const FindGroup = await prisma.groups.findUnique({where:{id:parseInt(id)},
            include:{
                Teachers:true,
                Admins:true,
                User:{
                    include:{
                        Groups:{
                            select:{
                                id:true,
                                name:true
                            },
                            
                        },
                        AssinmentResult:{
                            select:{
                                id:true,
                                score:true
                            }
                        },
                        ExamResult:{
                            select:{
                                id:true,
                                score:true
                            }
                        }
                    },
                    orderBy:{
                        name:'asc'
                    },

                }
            }
        })
        if(!FindGroup){
            return NextResponse.json({message:'Group Not Found'},{status:404})
            }
            return NextResponse.json({message:'Success To Get Group',data:FindGroup,usersCount:pagecount?.User.length},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/groups/:id
 * @returns Update A Specific Group Data
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
        if(Role(UserFromToken.role) < 1){
            return NextResponse.json({message:'Only Admins Can Do This'},{status:403}) 
        }
        const FindGroup = await prisma.groups.findUnique({where:{id:parseInt(id)}})
        if(!FindGroup){
            return NextResponse.json({message:'Group Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = GroupssSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateGroup = await prisma.groups.update({where:{id:parseInt(id)},data:{
                name: body.name,
                description:body.description,
            }})
            return NextResponse.json({message:'Success To Update Group',UpdateGroup,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/groups/:id
 * @returns Delete A Specific Group Data
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
        if(Role(UserFromToken.role) < 1){
            return NextResponse.json({message:'Only Admins Can Do This'},{status:403}) 
        }
        const FindGroup = await prisma.groups.findUnique({where:{id:parseInt(id)}})
        if(!FindGroup){
            return NextResponse.json({message:'Group Not Found'},{status:404})
            }
            await prisma.groups.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Group',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:500},{status:500})
    }
}