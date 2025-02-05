import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace, UserPayload } from "@/Interfaces/InterFaces";
import { AssinmentsSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/assinments/:id
 * @returns Get A Specific Assinments Data
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
        const UserFromToken = Jwt.verify(token,SecretKey) as UserPayload
        if(!UserFromToken){
            return NextResponse.json({message:'You Are Not Found'},{status:404})
        }
        if(UserFromToken?.role === 'USER'){
        const IsUsersAnswerBefore = await prisma.assinmentResult.findFirst({
            where:{userId:UserFromToken.id,assinmentId:parseInt(id)}
        })
        if(IsUsersAnswerBefore){
            return NextResponse.json({message:'لقد شاركت في الإجابة على هذا الإختبار من قبل',data:{userId:UserFromToken.id,AssinId:id}},{status:400})
        }
        const FindAssinments = await prisma.assinments.findUnique({
            where:{id:parseInt(id)},
            include:{
                teacher:{
                    select:{
                        id: true,
                        name: true,
                        email: true,
                        gender:true

                    }
                },
                Subjects:{
                    select:{
                        id:true,
                        name:true,
                        
                    }
                },
                Lessons:{
                    select:{
                        id:true,
                        name:true,
                    },
                },
                User:true
            }
        })
        if(!FindAssinments){
            return NextResponse.json({message:'Assinments Not Found'},{status:404})
            }
            return NextResponse.json(FindAssinments,{status:200})
        }else {
            const FindAssinments = await prisma.assinments.findUnique({
                where:{id:parseInt(id)},
                include:{
                    teacher:{
                        select:{
                            id: true,
                            name: true,
                            email: true,
                            gender:true
    
                        }
                    },
                    Subjects:{
                        select:{
                            id:true,
                            name:true,
                            
                        }
                    },
                    Lessons:{
                        select:{
                            id:true,
                            name:true,
                        },
                    },
                    AssinmentResult:{
                        include:{
                            User:{
                                select:{
                                    id:true,
                                    name:true,
                                    email:true,
                                    gender:true,
                                    Groups:{
                                        select:{
                                            id:true,
                                            name:true
                                        }
                                    }
                                    
                                  
                                }
                            }
                        },
                        orderBy:{
                            score:'desc'
                        }
                    }
                    
                },
                
            })
            if(!FindAssinments){
                return NextResponse.json({message:'Assinments Not Found'},{status:404})
                }
                return NextResponse.json(FindAssinments,{status:200})
        }
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Teachers)
 * @path ~/api/v1/assinments/:id
 * @returns Update A Specific Assinments Data
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
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(!TeacherFromToken){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if( Role(TeacherFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Update This Assinment'},{status:403}) 
        }
        const FindAssinments = await prisma.assinments.findUnique({where:{id:parseInt(id)}})
        if(!FindAssinments){
            return NextResponse.json({message:'Assinment Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = AssinmentsSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateAssinments = await prisma.assinments.update({where:{id:parseInt(id)},data:{
                name: body.name,
                description:body.description,
                lessonId:body.lessonId,
                subjectId:body.subjectId,
                assinmentbody:body.assinmentbody
            }})
            return NextResponse.json({message:'Success To Update Assinments',UpdateAssinments,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:500},{status:500})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Teachers)
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
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(!TeacherFromToken){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if(Role(TeacherFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Do This'},{status:403}) 
        }
        const FindAssinments = await prisma.assinments.findUnique({where:{id:parseInt(id)}})
        if(!FindAssinments){
            return NextResponse.json({message:'Assinments Not Found'},{status:404})
            }
            await prisma.assinments.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Update Assinments',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}