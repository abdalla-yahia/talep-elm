import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/admin-teacher/auth/login
 * @description Login a AdminTeacher
 * @returns Login AdminTeacher With Token
 * @access Privite
 */
export async function POST(request: NextRequest) {
  try {
    const { telephone,email, password } = await request.json();
    const AdminTeacher = await prisma.adminTeacher.findUnique({ where: { telephone , email } });
    if (!AdminTeacher) {
      return NextResponse.json({ message: "AdminTeacher Not Found",status: 404 }, { status: 404 });
    }
    const isValidPassword = await bcrypt.compare(password, AdminTeacher.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password",status: 404 },
        { status: 401 }
      );
    }
    const token = SetCookies({
      id: AdminTeacher.id,
      role: AdminTeacher.role,
      email: AdminTeacher.email,
      path: 'admin-teacher',
      gender: AdminTeacher.gender,
      name: AdminTeacher.name,
      image: AdminTeacher.image as string,
    });

    return NextResponse.json(
      {
        message: "Success To Login Admin-Teacher",
        data: AdminTeacher,
        status: 200,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Log This Admin-Teacher", error,status: 500 },
      { status: 500 }
    );
  }
}

