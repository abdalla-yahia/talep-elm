import  prisma  from "@/Utils/db"
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace, UserPayload } from "@/Interfaces/InterFaces";
import { ArticlesSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Admins)
 * @path ~/api/v1/Articles
 * @returns Get All Articles Data
 */

export async function GET(request:NextRequest){
try {

    const Articles = await prisma.articles.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            access:true,
            createdAt:true,
            updatedAt:true,
        },
        orderBy:{
            createdAt:"desc",
        }
    });
    if(!Articles){
        return NextResponse.json({message:'No Articles Found'}, {status:404})
    }
    const cookie = request.cookies.get('JwtToken')
    if(!cookie){
        const publicArticles =  Articles?.filter(e=>e.access === 'public')
        return NextResponse.json({message:'You Are Not Log In',Articles:publicArticles,length:publicArticles?.length,status:200},{status:200})
    }
    // if(Articles?.filter(e=>e.access === 'privite').length){
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const UserFromToken = Jwt.verify(token,SecretKey) as UserPayload
        if(!UserFromToken){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        
    return NextResponse.json({message:'Successfuly To Get All Articles',length:Articles?.length,Articles:Articles,status:200},{status:200});
} catch (error) {
    return NextResponse.json({message:error,status:400},{status:400})
}
}

/**
 * @method POST
 * @access Privite (Only Admins)
 * @path ~/api/v1/Articles/
 * @returns Create A Specific Groupe 
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
        if(Role(UserFromToken.role) < 1){
            return NextResponse.json({message:'Your Not Allow To Create Group, Only Admins'},{status:401})
        }
        const validation = ArticlesSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewGroup = await prisma.articles.create({data:{
            title:body.title,
            content:body.content,
            access:body.access
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