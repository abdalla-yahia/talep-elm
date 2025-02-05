import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";

/**
 * @method GET
 * @param id
 * @access Privite (Only Managers)
 * @path ~/api/v1/sections/:id
 * @returns Get A Specific sections Data
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
        const UserFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(!UserFromToken){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) < 4){
            return NextResponse.json({message:'Your Not Allow To Get sections, Only Managers'},{status:401})
        }
        const Findsections = await prisma.sections.findUnique({where:{id:parseInt(id)},

            include:{
                manager:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                subjects:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                
            }
        })
        if(!Findsections){
            return NextResponse.json({message:'section Not Found'},{status:404})
            }
            return NextResponse.json({message:'Success To Get sections',data:Findsections,status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method Put
 * @param id
 * @access Privite (Only Managers)
 * @path ~/api/v1/sections/:id
 * @returns Update A Specific section Data
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
        const UserFromToken = Jwt.verify(token,SecretKey) as TokenInterFace
        if(!UserFromToken){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) < 4){
            return NextResponse.json({message:'Only Managers Can Do This'},{status:403}) 
        }
        const Findsections = await prisma.sections.findUnique({where:{id:parseInt(id)}})
        if(!Findsections){
            return NextResponse.json({message:'sections Not Found'},{status:404})
            }
            const body =await request.json();

            const Updatesections = await prisma.sections.update({where:{id:parseInt(id)},data:{
                name: body.name,
                managerId:body.managerId,
            }})
            return NextResponse.json({message:'Success To Update sections',Updatesections,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}

/**
 * @method DELETE
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/sections/:id
 * @returns Delete A Specific sections Data
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
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        if(Role(UserFromToken.role) < 4){
            return NextResponse.json({message:'Only Admins Can Do This'},{status:403}) 
        }
        const Findsections = await prisma.sections.findUnique({where:{id:parseInt(id)}})
        if(!Findsections){
            return NextResponse.json({message:'sections Not Found'},{status:404})
            }
            await prisma.sections.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete sections',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error,status:400},{status:400})
    }
}