import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/auth/login
 * @description Login a user
 * @returns Login User With Token
 * @access Privite
 */
export async function POST(request: NextRequest) {
  try {
    const { telephone, email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { telephone, email } });
    if (!user) {
      return NextResponse.json(
        { message: "User Not Found", status: 404 },
        { status: 404 }
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password", status: 404 },
        { status: 401 }
      );
    }
    const token = SetCookies({
      id: user.id,
      role: user.role,
      email: user.email,
      path: "users",
      gender: user.gender,
      name: user.name,
      image: user.image as string,
    });

    return NextResponse.json(
      { message: "Success To Login", user, token: token, status: 200 },
      {
        status: 200,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Log This User", error, status: 400 },
      { status: 400 }
    );
  }
}
