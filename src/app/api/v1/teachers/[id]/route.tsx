import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { TeacherSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";
import bcrypt from 'bcryptjs'
/**
 * @method GET
 * @param id
 * @access Privite All Teachers
 * @path ~/api/v1/teachers/:id
 * @returns Get A Specific Teachers Data
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
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindTeacher = await prisma.teachers.findUnique({where:{id:parseInt(id)}})
        if(!FindTeacher){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if( FindTeacher.id !== TeacherFromToken.id && Role(TeacherFromToken.role) < 3){
            return NextResponse.json({message:'You Are Not Allow To Get Teacher, Only Leaders'},{status:401})
        }
        const Teacher = await prisma.teachers.findUnique({where:{id:parseInt(id)}})
        if(!Teacher){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
            }
            return NextResponse.json({message:'Success To Get Teacher',Teacher},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/teachers/:id
 * @returns Update A Specific Teachers Data
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
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindTeacher = await prisma.teachers.findUnique({where:{id:TeacherFromToken.id}})
        if(!FindTeacher){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if(FindTeacher.id !== parseInt(id) && Role(TeacherFromToken.role) < 3){
            return NextResponse.json({message:'Only Leaders Can Update This Teacher'},{status:403}) 
        }
        const FindTeachers = await prisma.teachers.findUnique({where:{id:parseInt(id)}})
        if(!FindTeachers){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
            }
            const body =await request.json();
            if(body.password){
                const salt =await  bcrypt.genSalt(10)
                body.password =  await bcrypt.hash(body.password,salt)
             }
            const validation = TeacherSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateTeachers = await prisma.teachers.update({where:{id:parseInt(id)},data:{
                name:body.name,
                email:body.email,
                password:body.password,
                telephone:body.telephone,
                groupId:body.groupId,
                subjectId:body.subjectId,
                image:body.image,
                age:body.age,
                education:body.education,
                address:body.address
            }})
            return NextResponse.json({message:'Success To Update Teachers',UpdateTeachers},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/Teachers/:id
 * @returns Delete A Specific Teachers Data
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
        const TeacherFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindTeacher = await prisma.teachers.findUnique({where:{id:TeacherFromToken.id}})
        if(!FindTeacher){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
        }
        if(FindTeacher.id !== parseInt(id)&& Role(TeacherFromToken.role) < 3){
            return NextResponse.json({message:'Only Leaders Can Delete This Teacher'},{status:403}) 
        }
        const FindTeachers = await prisma.teachers.findUnique({where:{id:parseInt(id)}})
        if(!FindTeachers){
            return NextResponse.json({message:'Teacher Not Found'},{status:404})
            }
            await prisma.teachers.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Teacher'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}