import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { ExamSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/exams/:id
 * @returns Get A Specific Exam Data
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
        if(UserFromToken?.role === 'USER'){
            const IsUsersAnswerBefore = await prisma.examResult.findFirst({
                where:{userId:UserFromToken.id,examId:parseInt(id)}
            })
            if(IsUsersAnswerBefore){
                return NextResponse.json({message:'لقد شاركت في الإجابة على هذا الإختبار من قبل',data:{userId:UserFromToken.id,AssinId:id}},{status:400})
            }
        }
        const FindExam = await prisma.exam.findUnique({where:{id:parseInt(id)},
        include:{
            teacher:{
                select:{
                    id:true,
                    name:true
                }
            },
            Subjects:{
                select:{
                    id:true,
                    name:true,
                }
            },
            ExamResult:{
                select:{
                    id:true,
                    score:true,
                    createdAt:true,
                    User:{
                        select:{
                            id:true,
                            name:true,
                            email:true,
                            Groups:{
                                select:{
                                    id:true,
                                    name:true
                                }
                            }
                        }
                    }
                },orderBy:{
                    score:'desc'
                }
                
            }
        }
    })
        if(!FindExam){
            return NextResponse.json({message:'Exam Not Found'},{status:404})
            }
            return NextResponse.json(FindExam,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Teachers)
 * @path ~/api/v1/exams/:id
 * @returns Update A Specific Exam Data
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
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Update Exams'},{status:403}) 
        }
        const FindExam = await prisma.exam.findUnique({where:{id:parseInt(id)}})
        if(!FindExam){
            return NextResponse.json({message:'Exam Not Found'},{status:404})
            }
            const body =await request.json()
            const validation = ExamSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateExam = await prisma.exam.update({where:{id:parseInt(id)},data:{
                title: body.title,
                Exambody:body.Exambody,
                fullDegree:body.fullDegree
            }})
            return NextResponse.json({message:'Successfully To Update Exam',UpdateExam,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Teachers)
 * @path ~/api/v1/exams/:id
 * @returns Delete A Specific Exam Data
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
            return NextResponse.json({message:'Only Teachers Can Be Delete Exams'},{status:403}) 
        }
        const FindExam = await prisma.exam.findUnique({where:{id:parseInt(id)}})
        if(!FindExam){
            return NextResponse.json({message:'Exam Not Found'},{status:404})
            }
            await prisma.exam.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Successfully To Delete Exam'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}