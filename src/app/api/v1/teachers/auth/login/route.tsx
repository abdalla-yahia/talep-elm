import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/teachers/auth/login
 * @description Login a teachers
 * @returns Login teachers With Token
 * @access Privite
 */
export async function POST(request: NextRequest) {
  try {
    const { telephone, email, password } = await request.json();
    const teachers = await prisma.teachers.findUnique({
      where: { telephone, email },
    });
    if (!teachers) {
      return NextResponse.json(
        { message: "Teacher Not Found", status: 404 },
        { status: 404 }
      );
    }
    const isValidPassword = await bcrypt.compare(password, teachers.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password", status: 404 },
        { status: 401 }
      );
    }
    const token = SetCookies({
      id: teachers.id,
      role: teachers.role,
      email: teachers.email,
      path: "teachers",
      gender: teachers.gender,
      name: teachers.name,
      image: teachers.image as string,
    });

    return NextResponse.json(
      { message: "Success To Login Teacher", data: teachers, status: 200 },
      {
        status: 200,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Log This Teacher", error, status: 500 },
      { status: 500 }
    );
  }
}
