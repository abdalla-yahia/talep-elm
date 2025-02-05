import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import {  OwnersSchema } from "@/Utils/ValidationShema";
import {  Owner } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { cookies } from "next/headers";
import { SetCookies } from "@/Utils/GenerateToken";
/**
 * @method GET
 * @access Privite (Only Owners Or > )
 * @path ~/api/v1/Owners
 * @returns Get All Owners Data
 */


export async function GET(){
    try {
       
        const Owners = await prisma.owner.findMany({})
        if(!Owners){
            return NextResponse.json({message:'No Owner Found'})
        }
        return NextResponse.json({message:'Get All Owners Successfully',length:Owners.length,Owners,status:200},{status:200})
    } catch (error) {
        return NextResponse.json({
            messahe:'Some Thing Went Wrong',
            error,
            status:400
        },
    {status:400})
    }
}

/**
 * @method POST
 * @access Privite (Only Owners)
 * @path ~/api/v1/Owners/
 * @returns Create A Specific Owner 
 */

export async function POST(request:NextRequest){
    try {
        const cookie = request.cookies.get('RegisterToken')
        if (!cookie) {
            
            return NextResponse.json({message:'You Dont Have Permision To Create This Owner'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const OwnerFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        const FindOwner = OwnerFromToken?.role 
        if(!FindOwner || FindOwner !== 'OWNER'){
            return NextResponse.json({message:'Not Found'},{status:404})
        }
        const body =await request.json()
        const validation = OwnersSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(body.password,salt)
        const NewOwner:Owner = await prisma.owner.create({data:{
            name:body.name,
            email:body.email,
            password:hashpassword,
            telephone:body.telephone,
            gender:body.gender,
        }})
        ;(await cookies()).delete('RegisterToken')
        const Ownercookies = SetCookies({
            id: NewOwner.id,
            role: NewOwner.role,
            email: NewOwner.email,
            path:'owner',
            gender:NewOwner.gender,
            name:NewOwner.name,
            image:NewOwner.image as string,
          });
      
        return NextResponse.json({
            message:'Created Owner Successfuly',
            data:NewOwner,
            status:201
        },
    {status:201,headers:{'Set-Cookie':Ownercookies}})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

