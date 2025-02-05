import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { OwnerSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";
import { Owner } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { TokenInterFace } from "@/Interfaces/InterFaces";
/**
 * @method GET
 * @param id
 * @access Privite Only Owner
 * @path ~/api/v1/owner/:id
 * @returns Get A Specific Owner Data
 */


export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try{
        const id = (await params).id;
        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In',status:401},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const OwnerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindOwner = await prisma.owner.findUnique({where:{id:OwnerFromToken.id}})
        if(!FindOwner){
            return NextResponse.json({message:'Owner Not Found'},{status:404})
        }
        if(FindOwner.id !== parseInt(id) && Role(OwnerFromToken.role) < 5){
            return NextResponse.json({message:'Your Not Allow To Get Owner, Only Owner',status:401},{status:401})
        }
        const Owner = await prisma.owner.findUnique({where:{id:OwnerFromToken.id}})
        if(!Owner){
            return NextResponse.json({message:'Owner Not Found',status:404},{status:404})
            }
            return NextResponse.json({Owner,status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Owner)
 * @path ~/api/v1/owner/:id
 * @returns Update A Specific Owner Data
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
        const OwnerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindOwner = await prisma.owner.findUnique({where:{id:OwnerFromToken.id}})
        if(!FindOwner){
            return NextResponse.json({message:'You Are Not Owner',status:403},{status:403})
        }
        if(FindOwner.id !== parseInt(id) && Role(OwnerFromToken.role) < 5){
            return NextResponse.json({message:'Only Owner Can Do This',status:403},{status:403}) 
        }

            const body =await request.json();
            const validation = OwnerSchema.safeParse(body)
            if(!validation){
                return NextResponse.json({message:'Invalid Data'},{status:400})
            }
            if(body.password){
               const salt =await  bcrypt.genSalt(10)
               body.password =  await bcrypt.hash(body.password,salt)
            }
            const UpdateOwner:Owner = await prisma.owner.update({where:{id:FindOwner?.id},data:{
                name:body.name,
                email:body.email,
                password:body.password,
                telephone:body.telephone,
                image:body.image,
                age:body.age,
                education:body.education,
                address:body.address
            }})
            return NextResponse.json({message:'Success To Update Owner',UpdateOwner,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Owner Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only Owner)
 * @path ~/api/v1/Owner/:id
 * @returns Delete A Specific Owner Data
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
        const OwnerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindOwner = await prisma.owner.findUnique({where:{id:OwnerFromToken.id}})
        if(!FindOwner){
            return NextResponse.json({message:'Owner Not Found'},{status:404})
        }
        if(FindOwner.id !== parseInt(id) && Role(FindOwner.role) < 5){
            return NextResponse.json({message:'Only Owner Can Do This'},{status:403}) 
        }

            await prisma.owner.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Owner',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}