import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/managers/auth/login
 * @description Login a Managers
 * @returns Login Managers With Token
 * @access Privite
 */
export async function POST(request: NextRequest) {
  try {
    const { telephone, email, password } = await request.json();
    const Managers = await prisma.manager.findUnique({
      where: { telephone, email },
    });
    if (!Managers) {
      return NextResponse.json(
        { message: "Managers Not Found", status: 404 },
        { status: 404 }
      );
    }
    const isValidPassword = await bcrypt.compare(password, Managers.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password", status: 404 },
        { status: 401 }
      );
    }
    const token = SetCookies({
      id: Managers.id,
      role: Managers.role,
      email: Managers.email,
      path: "managers",
      gender: Managers.gender,
      name: Managers.name,
      image: Managers.image as string,
    });

    return NextResponse.json(
      { message: "Success To Login Manager", data: Managers, status: 200 },
      {
        status: 200,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Log This Managers", error, status: 500 },
      { status: 500 }
    );
  }
}
