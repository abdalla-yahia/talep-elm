import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { AdminTeacherPayload } from "@/Interfaces/InterFaces";
import { AdminTeacherSchema } from "@/Utils/ValidationShema";
import Role from "@/Utils/Role";
import { AdminTeacher } from "@prisma/client";
import bcrypt from 'bcryptjs'
/**
 * @method GET
 * @param id
 * @access Privite Only AdminTeacher
 * @path ~/api/v1/admin-teacher/:id
 * @returns Get A Specific Admin Teacher Data
 */


/**
 * Retrieves a specific Admin Teacher's data.
 * 
 * This function handles GET requests to fetch an Admin Teacher's information.
 * It verifies the user's authentication, checks their authorization,
 * and returns the requested Admin Teacher's data if all conditions are met.
 *
 * @param request - The incoming request object containing cookies and other request data.
 * @param params - An object containing route parameters.
 * @param params.id - The ID of the Admin Teacher to retrieve.
 * @returns A Promise that resolves to a NextResponse object containing either:
 *          - The Admin Teacher's data (status 200)
 *          - An error message (status 401, 404, or 400)
 * @throws Will return a NextResponse with an error message if any step fails.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }):Promise<NextResponse> {
    
    try {
        const id = (await params).id;
        const cookie = request.cookies.get('JwtToken')
        if (!cookie) {
            return NextResponse.json({ message: 'You Are Not Log In' }, { status: 401 })
        }
        const token = cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const AdminTeacherFromToken = Jwt.verify(token, SecretKey) as AdminTeacherPayload
        const FindAdminTeacher = await prisma.adminTeacher.findUnique({ where: { id: parseInt(id) } })
        if (!FindAdminTeacher) {
            return NextResponse.json({ message: 'Admin-Teacher Not Found' }, { status: 404 })
        }
        if (FindAdminTeacher.id !== AdminTeacherFromToken?.id && Role(AdminTeacherFromToken.role as string) < 4) {
            return NextResponse.json({ message: 'Your Not Allow To Get Admin Teacher, Only Managers' }, { status: 401 })
        }
        const GetAdminTeacher = await prisma.adminTeacher.findUnique({ where: { id: parseInt(id) } })
        if (!GetAdminTeacher) {
            return NextResponse.json({ message: 'Admin-Teacher Not Found' }, { status: 404 })
        }
        return NextResponse.json(GetAdminTeacher, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Something Wen Wrong', error }, { status: 400 })
    }
}


/**
 * @method Put
 * @param id
 * @access Privite (Only AdminTeacher)
 * @path ~/api/v1/admin-teacher/:id
 * @returns Update A Specific Admin Teacher Data
 */


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id;
    const cookie = request.cookies.get("JwtToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "You Are Not Log In" },
        { status: 401 }
      );
    }
    const token = cookie?.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const AdminTeacherFromToken = Jwt.verify(
      token,
      SecretKey
    ) as AdminTeacherPayload;
    const FindAdminTeacher = await prisma.adminTeacher.findUnique({
      where: { id: AdminTeacherFromToken.id },
    });
    if (!FindAdminTeacher) {
      return NextResponse.json(
        { message: "AdminTeacher Not Found" },
        { status: 404 }
      );
    }
    if (
      FindAdminTeacher.id !== parseInt(id) &&
      Role(AdminTeacherFromToken.role as string) < 4
    ) {
      return NextResponse.json(
        { message: "Only Managers Can Do This" },
        { status: 403 }
      );
    }
    const GetAdminTeacher = await prisma.adminTeacher.findUnique({
      where: { id: parseInt(id) },
    });
    if (!GetAdminTeacher) {
      return NextResponse.json(
        { message: "Admin-Teacher Not Found" },
        { status: 404 }
      );
    }
    const body = await request.json();
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const validation = AdminTeacherSchema.safeParse(body);
    if (!validation) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }
    const UpdateAdminTeacher: AdminTeacher = await prisma.adminTeacher.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        telephone: body.telephone,
        managerId: body.managerId,
        age: body.age,
        image: body.image,
        address: body.address,
        education: body.education,
      },
    });
    return NextResponse.json(
      {
        message: "Success To Update AdminTeacher",
        UpdateAdminTeacher,
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something Wen Wrong", error, status: 400 },
      { status: 400 }
    );
  }
}

/**
 * @method DELETE
 * @param id
 * @access Privite (Only AdminTeacher)
 * @path ~/api/v1/AdminTeacher/:id
 * @returns Delete A Specific AdminTeacher Data
 */


export async function DELETE(request:NextRequest,{params}:{params:Promise<{id:string}>}){
    try {
        const id = (await params).id
        const cookie = request.cookies.get('JwtToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Log In'},{status:401})
        }
        const token =  cookie?.value;
        const SecretKey = process.env.JWT_SECRET_KEY as string
        const AdminTeacherFromToken = Jwt.verify(token,SecretKey) as AdminTeacherPayload
        const FindAdminTeacher = await prisma.adminTeacher.findUnique({where:{id:AdminTeacherFromToken.id}})
        if(!FindAdminTeacher){
            return NextResponse.json({message:'AdminTeacher Not Found'},{status:404})
        }
        if(FindAdminTeacher.id !== parseInt(id) && Role(FindAdminTeacher.role) < 4){
            return NextResponse.json({message:'Only AdminTeacher Can Do This'},{status:403}) 
        }
        const GetAdminTeacher = await prisma.adminTeacher.findUnique({where:{id:parseInt(id)}})
        if(!GetAdminTeacher){
            return NextResponse.json({message:'AdminTeacher Not Found'},{status:404})
            }
            await prisma.adminTeacher.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'Success To Delete Admin-Teacher'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something Wen Wrong',error},{status:400})
    }
}