import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { LessonsSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/lessons/:id
 * @returns Get A Specific Lessons Data
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
        const FindLessons = await prisma.lessons.findUnique({
            where:{id:parseInt(id)},
            include:{
                teacher:{
                    select:{
                        name:true,
                        id:true,
                        email:true,
                        gender:true,
                    }
                },
                comments:{
                    select:{
                        id:true,
                        User:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true,
                                image:true
                            }
                        },
                        Teacher:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true,
                                image:true
                            }
                        },
                        Admin:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true,
                                image:true
                            }
                        },
                        AdminTeacher:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true,
                                image:true
                            }
                        },
                        Manager:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true,
                                image:true
                            }
                        },
                        Owner:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true,
                                image:true
                            }
                        },
                        likes:{
                            select:{
                                userId:true,
                                lessonId:true,
                                leaderId:true,
                                teacheId:true,
                                adminId:true,
                                mangerId:true,
                                ownerId:true,
                                id:true,
                                like:true,
                                love:true,
                                disLike:true,
                                hate:true
                            }
                        },
                        replies:{
                            select:{
                                id:true,
                                text:true,
                                User:{
                                    select:{
                                        name:true,
                                        id:true,
                                        image:true
                                    }
                                },
                                Teacher:{
                                    select:{
                                        name:true,
                                        id:true,
                                        image:true
                                    }
                                },
                                Admin:{
                                    select:{
                                        name:true,
                                        id:true,
                                        image:true
                                    }
                                },
                                AdminTeacher:{
                                    select:{
                                        name:true,
                                        id:true,
                                        image:true
                                    }
                                },
                                Manager:{
                                    select:{
                                        name:true,
                                        id:true,
                                        image:true
                                    }
                                },
                                Owner:{
                                    select:{
                                        name:true,
                                        id:true,
                                        image:true
                                        }
                                },
                                likes:{
                                    select:{
                                        userId:true,
                                        lessonId:true,
                                        leaderId:true,
                                        teacheId:true,
                                        adminId:true,
                                        mangerId:true,
                                        ownerId:true,
                                        id:true,
                                        like:true,
                                        love:true,
                                        disLike:true,
                                        hate:true
                                    }
                                },
                            },
                            orderBy:{
                                createdAt:'asc'
                            }
                        },
                        text:true,
                        createdAt:true,
                        updatedAt:true,
                                },
                    orderBy:{
                        updatedAt:'desc',
                    }
                },
                Subjects:{
                    select:{
                        name:true,
                        id:true
                        }
                },
                Assinments:true,
                Assinment_Result:true
            }
        })
        if(!FindLessons){
            return NextResponse.json({message:'Lesson Not Found'},{status:404})
            }
            return NextResponse.json(FindLessons,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/lessons/:id
 * @returns Update A Specific Lesson Data
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
        if(Role(UserFromToken.role) < 2){
            return NextResponse.json({message:'Only Teachers Can Update This Lesson'},{status:403}) 
        }
        const FindLessons = await prisma.lessons.findUnique({where:{id:parseInt(id)}})
        if(!FindLessons){
            return NextResponse.json({message:'Lessons Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = LessonsSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateLessons = await prisma.lessons.update({where:{id:parseInt(id)},data:{
                name:body.name,
                description:body.description,
                subjectId:body.subjectId,
                teacherId:body.teacherId,
                body:body.body
            }})
            return NextResponse.json({message:'Success To Update Lessons',UpdateLessons,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/lessons/:id
 * @returns Delete A Specific Lessons Data
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
        if(Role(UserFromToken.role) < 2){
            return NextResponse.json({message:'Only Teachers Can Delete This Lesson'},{status:403}) 
        }
        const FindLessons = await prisma.lessons.findUnique({where:{id:parseInt(id)}})
        if(!FindLessons){
            return NextResponse.json({message:'Lessons Not Found'},{status:404})
            }
            await prisma.lessons.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Lesson',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}