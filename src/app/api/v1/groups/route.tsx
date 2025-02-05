import  prisma  from "@/Utils/db"
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { GroupssSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @access Privite (Only Admins)
 * @path ~/api/v1/groups
 * @returns Get All Groups Data
 */

export async function GET(request:NextRequest){
try {
    const cookie = request.cookies.get('JwtToken')
        if(cookie){
            const token =  cookie?.value;
            const SecretKey = process.env.JWT_SECRET_KEY as string
            const UserFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
            if(!UserFromToken){
                return NextResponse.json({message:'User Not Found'},{status:404})
            }
            if(Role(UserFromToken.role) < 4){
                const AllGroups = await prisma.groups.findMany({
                    select:{
                        id:true,
                        name:true,
                        description:true,
                        Teachers:true,
                        User:true,
                        gender:true,
                        createdAt:true,
                        updatedAt:true,
                    }
                })
                const Groups = AllGroups?.filter(el=>el?.gender == UserFromToken?.gender)
                return NextResponse.json({message:'Successfuly To Get All Groups',length:Groups.length,Groups,status:200},{status:200});
            }
        }
    const Groups = await prisma.groups.findMany({
        select:{
            id:true,
            name:true,
            description:true,
            Teachers:true,
            User:true,
            gender:true,
            createdAt:true,
            updatedAt:true,
        }
    });
    if(!Groups){
        return NextResponse.json({message:'No Groups Found'}, {status:404})
    }
    return NextResponse.json({message:'Successfuly To Get All Groups',length:Groups.length,Groups},{status:200});
} catch (error) {
    return NextResponse.json({message:error})
}
}

/**
 * @method POST
 * @access Privite (Only Admins)
 * @path ~/api/v1/groups/
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
        const validation = GroupssSchema.safeParse(body)
        if(!validation){
            return NextResponse.json({message:'Invalid Data'},{status:400})
        }
        const NewGroup = await prisma.groups.create({data:{
            name:body.name,
            description:body.description,
            gender:body.gender
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