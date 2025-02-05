import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import {  LessonsSchema } from "@/Utils/ValidationShema";
import {  Lessons } from "@prisma/client";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Admins)
 * @path ~/api/v1/Lessons
 * @returns Get All Lessons Data
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
        if(!UserFromToken){
            return NextResponse.json({message:'You Are Not Allow, Login First'}, {status:403})
        }
        const Lessons = await prisma.lessons.findMany({
            orderBy:{
                createdAt:'desc'
            },
            include:{
                teacher:{
                    select:{
                        name:true,
                        id:true,
                        email:true,
                        gender:true
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
                                gender:true
                            }
                        },
                        Teacher:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true
                            }
                        },
                        Admin:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true
                            }
                        },
                        AdminTeacher:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true
                            }
                        },
                        Manager:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true
                            }
                        },
                        Owner:{
                            select:{
                                name:true,
                                id:true,
                                email:true,
                                gender:true
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
                                        id:true
                                    }
                                },
                                Teacher:{
                                    select:{
                                        name:true,
                                        id:true
                                    }
                                },
                                Admin:{
                                    select:{
                                        name:true,
                                        id:true
                                    }
                                },
                                AdminTeacher:{
                                    select:{
                                        name:true,
                                        id:true
                                    }
                                },
                                Manager:{
                                    select:{
                                        name:true,
                                        id:true
                                    }
                                },
                                Owner:{
                                    select:{
                                        name:true,
                                        id:true
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
                        text:true
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
        return NextResponse.json({message:'Success To Get All Lessons',length:Lessons.length,data:Lessons},{status:200})
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
 * @access Privite (Only Admins)
 * @path ~/api/v1/Lessons/
 * @returns Create A Specific Lesson 
 */

export async function POST(request:NextRequest){
    try {
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
            return NextResponse.json({message:'Your Not Allow To Create Lesson, Only Teachers'},{status:401})
        }
        const body =await request.json()
        const validation = LessonsSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewTeacher:Lessons = await prisma.lessons.create({data:{
            name:body.name,
            description:body.description,
            subjectId:body.subjectId,
            teacherId:body.teacherId,
            body:body.body
        }})
        return NextResponse.json({
            message:'Created Lesson Successfuly',
            data:NewTeacher,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error},{status:400})
    }
}

