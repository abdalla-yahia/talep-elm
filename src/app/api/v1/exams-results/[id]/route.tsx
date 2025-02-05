import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { ExamResultSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/exams-results/:id
 * @returns Get A Specific exams-results Data
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
    //     const FindExamResult = await prisma.examResult.findFirst({where:{
    //         userId:UserFromToken.id,examId:parseInt(id)},
    //     include:{
    //         Exam:{
    //             select:{
    //                 id:true,
    //                 Exambody:true,
    //             }
    //         },
            
    //     }
    // })
    //     if(!FindExamResult){
    //         return NextResponse.json({message:'Exam Results Not Found'},{status:404})
    //         }
    //         return NextResponse.json(FindExamResult,{status:200})
    if(UserFromToken?.role === 'USER'){
        const FindExamResults = await prisma.examResult.findFirst({
            where:{userId:UserFromToken.id,examId:parseInt(id)},
            include:{
                Subjects:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                Exam:{
                    select:{
                        id:true,
                        title:true,
                        Exambody:true
                    }
                }
            }
        })
        if(!FindExamResults){
            return NextResponse.json({message:'This ExamResults Not Found',data:{userId:UserFromToken.id,AssinId:id}},{status:404})
            }
            return NextResponse.json(FindExamResults,{status:200})
        }else {
            const FindExamResults = await prisma.examResult.findUnique({
                where:{id:parseInt(id)},
                include:{
                    User:{
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
                    Exam:{
                        select:{
                            id:true,
                            title:true,
                            Exambody:true
                        }
                    }
                }
            })
            if(!FindExamResults){
                return NextResponse.json({message:'This ExamResults Not Found',data:{userId:UserFromToken.id,AssinId:id}},{status:404})
                }
                return NextResponse.json(FindExamResults,{status:200})
        }
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/exams-results/:id
 * @returns Update A Specific ExamResult Data
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
        if(UserFromToken.role !== 'USER'){
            return NextResponse.json({message:'Only Users Can Update This',status:403},{status:403}) 
        }
        const FindExamResult = await prisma.examResult.findFirst({
            where:{userId:UserFromToken.id, examId:parseInt(id)}
            })
        if(!FindExamResult){
            return NextResponse.json({message:'Exam Results Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = ExamResultSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateExamResult = await prisma.examResult.updateMany({
                where:{userId:UserFromToken.id, examId:parseInt(id)}
                ,data:{
                score:body.score,
                examId:body.examId,
                answersbody:body.answersbody
            }})
            return NextResponse.json({message:'Success To Update Exam Results',UpdateExamResult,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/exams-results/:id
 * @returns Delete A Specific ExamResult Data
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
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Delete This'},{status:403}) 
        }
        const FindExamResult = await prisma.examResult.findUnique({where:{id:parseInt(id)}})
        if(!FindExamResult){
            return NextResponse.json({message:'Exam Result Not Found'},{status:404})
            }
            await prisma.examResult.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Exam Results'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}