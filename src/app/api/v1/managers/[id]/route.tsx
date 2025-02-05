import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { ManagersSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";
import { Manager } from "@prisma/client";
import bcrypt from 'bcryptjs'
/**
 * @method GET
 * @param id
 * @access Privite Only Managers
 * @path ~/api/v1/Managers/:id
 * @returns Get A Specific Managers Data
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
        const ManagerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace;
        const FindManager = await prisma.manager.findUnique({where:{id:parseInt(id)}})
        if(!FindManager){
            return NextResponse.json({message:'Manager Not Found'},{status:404})
        }
        if(FindManager.id !== ManagerFromToken?.id && Role(ManagerFromToken.role) < 5){
            return NextResponse.json({message:'Your Not Allow To Get Manager, Only Owner'},{status:401})
        }
        const GetManager = await prisma.manager.findUnique({where:{id:parseInt(id)}})
        if(!GetManager){
            return NextResponse.json({message:'Manager Not Found'},{status:404})
            }
            return NextResponse.json(GetManager,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Managers)
 * @path ~/api/v1/Managers/:id
 * @returns Update A Specific Managers Data
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
        const ManagerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindManager = await prisma.manager.findUnique({where:{id:ManagerFromToken.id}})
        if(!FindManager){
            return NextResponse.json({message:'Manager Not Found'},{status:404})
        }
        if(FindManager.id !== parseInt(id) && Role(ManagerFromToken.role) < 5){

            return NextResponse.json({message:'Only Manager Can Do This',FromTok:FindManager.id},{status:403}) 
        }
        const FindManagers = await prisma.manager.findUnique({where:{id:parseInt(id)}})
        if(!FindManagers){
            return NextResponse.json({message:'Managers Not Found'},{status:404})
            }
            const body =await request.json();
            if(body.password){
                const salt =await  bcrypt.genSalt(10)
                body.password =  await bcrypt.hash(body.password,salt)
             }
            const validation = ManagersSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            const UpdateManagers:Manager = await prisma.manager.update({where:{id:parseInt(id)},data:{
                name:body.name,
                email:body.email,
                password:body.password,
                telephone:body.telephone,
                ownerId:body.ownerId,
                address:body.address,
                age:body.age,
                image:body.image,
                education:body.education
            }})
            return NextResponse.json({message:'Success To Update Manager',UpdateManagers},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Managers)
 * @path ~/api/v1/managers/:id
 * @returns Delete A Specific Managers Data
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
        const ManagerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindManager = await prisma.manager.findUnique({where:{id:ManagerFromToken.id}})
        if(!FindManager){
            return NextResponse.json({message:'Manager Not Found'},{status:404})
        }
        if(FindManager.id !== parseInt(id) && Role(FindManager.role) < 5){
            return NextResponse.json({message:'Only Managers Can Do This'},{status:403}) 
        }
        const FindManagers = await prisma.manager.findUnique({where:{id:parseInt(id)}})
        if(!FindManagers){
            return NextResponse.json({message:'Manager Not Found'},{status:404})
            }
            await prisma.manager.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Manager'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}