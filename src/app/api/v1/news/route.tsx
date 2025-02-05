import  prisma  from "@/Utils/db"
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Admins)
 * @path ~/api/v1/News
 * @returns Get All News Data
 */

export async function GET(){
try {

    const News = await prisma.news.findMany({
        select:{
            id:true,
            content:true,
            author:true,
            createdAt:true,
            updatedAt:true,
        },
        orderBy:{
            createdAt:'desc'
        }
    });
    
    if(!News){
        return NextResponse.json({message:'No News Found'}, {status:404})
    }

    return NextResponse.json({message:'Successfuly To Get All News',length:News.length,News,status:200},{status:200});
} catch (error) {
    return NextResponse.json({message:error,status:400},{status:400})
}
}

/**
 * @method New
 * @access Privite (Only Owners)
 * @path ~/api/v1/News/
 * @returns Create A Specific New 
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
        if(Role(UserFromToken.role) < 3){
            return NextResponse.json({message:'Your Not Allow To Create Group, Only Admins'},{status:401})
        }

        const NewGroup = await prisma.news.create({data:{
            content:body.content,
            author:body.author
        }})
        return NextResponse.json({
            message:'Created News Successfuly',
            data:NewGroup,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}