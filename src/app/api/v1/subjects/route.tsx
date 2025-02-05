import { NextRequest, NextResponse } from "next/server";
import Jwt from 'jsonwebtoken'
import prisma from "@/Utils/db";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { SubjectsSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite All Users
 * @path ~/api/v1/subjects
 * @returns Get All Subjects Data
 */

export async function GET(){
    try {

        
        const Subjects = await prisma.subjects.findMany();
        if(!Subjects){
            return NextResponse.json({message:'No Subjects Found'}, {status:404})
        }
        return NextResponse.json({message:'Successfuly To Get All Subjects',length:Subjects.length,Subjects},{status:200});
    } catch (error) {
        return NextResponse.json({message:error})
    }
    } 

/**
 * @method POST
 * @access Privite (Only Admins)
 * @path ~/api/v1/subjects/
 * @returns Create A Specific Subject 
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
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Your Not Allow To Create SubJect, Only Teachers'},{status:401})
        }
        const body = await request.json()
        const validation = SubjectsSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewExam = await prisma.subjects.create({data:{
            name:body.name,
            info:body.info,
            sectionId:body.sectionId
        }})
        return NextResponse.json({
            message:'Created Subject Successfuly',
            data:NewExam,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}