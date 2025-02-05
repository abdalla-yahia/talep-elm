import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import Role from "@/Utils/Role";
import { TokenInterFace } from "@/Interfaces/InterFaces";
/**
 * @method GET
 * @param id
 * @access public
 * @path ~/api/v1/Codes/:id
 * @returns Get A Specific Code Data
 */


export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }):Promise<NextResponse>{
    try {
        const id = (await params).id;
        const FindCode = await prisma.codes.findUnique({where:{id:parseInt(id)}})
       
        if(!FindCode){
            return NextResponse.json({message:'Codes Not Found'},{status:404})
            }
            return NextResponse.json({message:'Success To Get Codes',data:FindCode,status:200},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}



/**
 * @method DELETE
 * @param id
 * @access privite (Only Owners)
 * @path ~/api/v1/codes/
 * @returns Delete A Specific Code Data
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
            return NextResponse.json({message:'User Not Found23'},{status:404})
        }
        if(Role(UserFromToken.role) < 5){
            return NextResponse.json({message:'Your Not Allow To Delete Codes, Only Owner'},{status:401})
        }
        const code = await prisma.codes.delete({where:{id:parseInt(id)}})
        return NextResponse.json({
            message:'Deleted Codes Successfuly',
            data:code,
            status:200
        },
    {status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}

