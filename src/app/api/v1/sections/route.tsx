import  prisma  from "@/Utils/db"
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Managers)
 * @path ~/api/v1/sections
 * @returns Get All sections Data
 */

export async function GET(request:NextRequest){
try {
  
    const cookie = request.cookies.get('JwtToken')
    if(!cookie){
        return NextResponse.json({message:'Unauthorized'}, {status:401})
    }
    const token =cookie.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const UserFromToken =Jwt.verify(token,SecretKey) as TokenInterFace
    if(Role(UserFromToken.role) < 4){
        return NextResponse.json({message:'Your Not Allow To Get This Method, Only manager'}, {status:405})
    }
    const sections = await prisma.sections.findMany({
        include: {
            manager:{
                select:{
                    id:true,
                    name:true
                },
                
            }
        }
    });
    if(!sections){
        return NextResponse.json({message:'No sections Found'}, {status:404})
    }
    return NextResponse.json({message:'Successfuly To Get All sections',length:sections.length,sections,status:200},{status:200});
} catch (error) {
    return NextResponse.json({message:error})
}
}

/**
 * @method POST
 * @access Privite (Only Managers)
 * @path ~/api/v1/sections/
 * @returns Create A Specific Section 
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
        const body =await request.json() 
        if(Role(UserFromToken.role) < 4){
            return NextResponse.json({message:'Your Not Allow To Create Group, Only Managers'},{status:401})
        }

        const NewGroup = await prisma.sections.create({data:{
            name:body.name,
            managerId:body.managerId,
            description:body.description
        }})
        return NextResponse.json({
            message:'Created Section Successfuly',
            data:NewGroup,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}