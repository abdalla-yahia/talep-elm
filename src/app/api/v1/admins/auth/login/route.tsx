import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/admins/auth/login
 * @description Login a admins
 * @returns Login admins With Token
 * @access Privite
 */
export async function POST(request: NextRequest) {
  try {
    const { telephone, email, password } = await request.json();
    const admins = await prisma.admins.findUnique({
      where: { telephone, email },
    });
    if (!admins) {
      return NextResponse.json(
        { message: "Admins Not Found", status: 404 },
        { status: 404 }
      );
    }
    const isValidPassword = await bcrypt.compare(password, admins.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password", status: 404 },
        { status: 401 }
      );
    }
    const token = SetCookies({
      id: admins.id,
      role: admins.role,
      email: admins.email,
      path: "admins",
      gender: admins.gender,
      name: admins.name,
      image: admins.image as string,
    });

    return NextResponse.json(
      { message: "Success To Login Admin", data: admins, status: 200 },
      {
        status: 200,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Log This admins", error, status: 500 },
      { status: 500 }
    );
  }
}
