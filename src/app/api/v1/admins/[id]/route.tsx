import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { AdminsSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";
import { Admins } from "@prisma/client";
import bcrypt from 'bcryptjs'
/**
 * @method GET
 * @param id
 * @access Privite Only Admins
 * @path ~/api/v1/admins/:id
 * @returns Get A Specific Admins Data
 */


export async function GET(request:NextRequest, { params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try {
        const id  = (await params).id
        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const AdminFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindAdmin = await prisma.admins.findUnique({where:{id:parseInt(id)}})
        if(!FindAdmin){
            return NextResponse.json({message:'Admin Not Found'},{status:404})
        }
        if(FindAdmin.id !== AdminFromToken?.id && Role(AdminFromToken?.role) < 3){
            return NextResponse.json({message:'Your Not Allow To Get Admin, Only Managers'},{status:401})
        }
        const GetAdmin = await prisma.admins.findUnique({where:{id:parseInt(id)}})
        if(!GetAdmin){
            return NextResponse.json({message:'Admin Not Found'},{status:404})
            }
            return NextResponse.json(GetAdmin,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/admins/:id
 * @returns Update A Specific admins Data
 */


export async function PUT(request:NextRequest, { params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try {
                const id = (await params).id;

        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const AdminFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindAdmin = await prisma.admins.findUnique({where:{id:AdminFromToken.id}})
        if(!FindAdmin){
            return NextResponse.json({message:'Admin Not Found'},{status:404})
        }
        if(FindAdmin.id !== parseInt(id) && Role(FindAdmin.role) < 3){
            return NextResponse.json({message:'Only Managers Can Do This'},{status:403}) 
        }
        const Findadmins = await prisma.admins.findUnique({where:{id:parseInt(id)}})
        if(!Findadmins){
            return NextResponse.json({message:'Admins Not Found'},{status:404})
            }
            const body =await request.json();
            if(body.password){
                const salt =await  bcrypt.genSalt(10)
                body.password =  await bcrypt.hash(body.password,salt)
             }
            const validation = AdminsSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const Updateadmins:Admins = await prisma.admins.update({where:{id:parseInt(id)},data:{
                name:body.name,
                email:body.email,
                password:body.password,
                telephone:body.telephone,
                groupId:body.groupId,
                leaderId:body.leaderId,
                image:body.image,
                age:body.age,
                education:body.education,
                address:body.address,
            }})
            return NextResponse.json({message:'Success To Update admins',Updateadmins},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Admins)
 * @path ~/api/v1/admins/:id
 * @returns Delete A Specific admins Data
 */


export async function DELETE(request:NextRequest, { params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try {
        const id = (await params).id;
        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const AdminFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindAdmin = await prisma.admins.findUnique({where:{id:AdminFromToken.id}})
        if(!FindAdmin){
            return NextResponse.json({message:'Admin Not Found'},{status:404})
        }
        if(FindAdmin.id !== parseInt(id) && Role(FindAdmin.role) < 3){
            return NextResponse.json({message:'Only Managers Can Do This'},{status:403}) 
        }
        const Findadmins = await prisma.admins.findUnique({where:{id:parseInt(id)}})
        if(!Findadmins){
            return NextResponse.json({message:'Admin Not Found'},{status:404})
            }
            await prisma.admins.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Admin'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}