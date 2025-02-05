import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/owner/auth/login
 * @description Login a owner
 * @returns Login owner With Token
 * @access Privite
 */
export async function POST(request: NextRequest) {
  try {
    const { telephone, email, password } = await request.json();
    const owner = await prisma.owner.findUnique({
      where: { telephone, email },
    });
    if (!owner) {
      return NextResponse.json(
        { message: "Owner Not Found", status: 404 },
        { status: 404 }
      );
    }
    const isValidPassword = await bcrypt.compare(password, owner.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password", status: 404 },
        { status: 401 }
      );
    }
    const token = SetCookies({
      id: owner.id,
      role: owner.role,
      email: owner.email,
      path: "owner",
      gender: owner.gender,
      name: owner.name,
      image: owner.image as string,
    });

    return NextResponse.json(
      { message: "Success To Login Owner", data: owner, status: 200 },
      {
        status: 200,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Log This Owner", error, status: 500 },
      { status: 500 }
    );
  }
}
