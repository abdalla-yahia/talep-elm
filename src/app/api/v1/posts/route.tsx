import  prisma  from "@/Utils/db"
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";
import {POSTS_COUNT_PER_PAGE} from "@/Utils/Constant"
/**
 * @method GET
 * @access Privite (Only Admins)
 * @path ~/api/v1/Posts
 * @returns Get All Posts Data
 */

export async function GET(request:NextRequest){
    const Page_Number = request.nextUrl.searchParams.get('page') || 1;
    const Skip = (parseInt(Page_Number as unknown as string) - 1) * POSTS_COUNT_PER_PAGE;
try {

    const Posts = await prisma.posts.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:true,
            body:true,
            createdAt:true,
            updatedAt:true,
        },
        orderBy:{
            createdAt:'desc'
        },
        skip:Skip,
        take:POSTS_COUNT_PER_PAGE
    });
    
    if(!Posts){
        return NextResponse.json({message:'No Posts Found'}, {status:404})
    }

    return NextResponse.json({message:'Successfuly To Get All Posts',length:Posts.length,Posts,status:200},{status:200});
} catch (error) {
    return NextResponse.json({message:error,status:400},{status:400})
}
}

/**
 * @method POST
 * @access Privite (Only Owners)
 * @path ~/api/v1/posts/
 * @returns Create A Specific Post 
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

        const NewGroup = await prisma.posts.create({data:{
            title:body.title,
            content:body.content,
            body:body.body,
            author:body.author
        }})
        return NextResponse.json({
            message:'Created Group Successfuly',
            data:NewGroup,
            status:201
        },
    {status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Went Wrong',error,status:400},{status:400})
    }
}