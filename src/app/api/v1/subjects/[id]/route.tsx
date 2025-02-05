import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { SubjectsSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/subjects/:id
 * @returns Get A Specific Subject Data
 */


export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
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
        const FindSubject = await prisma.subjects.findUnique({
            where:{id:parseInt(id)}
            ,include:{
                User:{
                    select:{
                        id: true,
                        name: true
                        }
                        
                },
                Lessons:true,
                Exam:true,
                ExamResult:true,
                Assinments:true,
                AssinmentResult:true,
                Teachers:true,

            }
        })
        if(!FindSubject){
            return NextResponse.json({message:'Subject Not Found'},{status:404})
            }
            return NextResponse.json(FindSubject,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method PUT
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/subjects/:id
 * @returns Update A Specific Subject Data
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
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Update This Subject'},{status:403}) 
        }
        const FindSubject = await prisma.subjects.findUnique({where:{id:parseInt(id)}})
        if(!FindSubject){
            return NextResponse.json({message:'Subject Not Found'},{status:404})
            }
            const body =await request.json();
            const validation = SubjectsSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateSubject = await prisma.subjects.update({where:{id:parseInt(id)},data:{
                name: body.name,
                info:body.info,
            }})
            return NextResponse.json({message:'Success To Update Subject',UpdateSubject,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/subject/:id
 * @returns Delete A Specific Subject Data
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
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Only Teachers Can Delete This Subject'},{status:403}) 
        }
        const FindSubject = await prisma.subjects.findUnique({where:{id:parseInt(id)}})
        if(!FindSubject){
            return NextResponse.json({message:'Subject Not Found'},{status:404})
            }
            await prisma.subjects.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Subject',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}
