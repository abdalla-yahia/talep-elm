import { RegisterUserSchema } from "@/Utils/ValidationShema";
import { $Enums, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/users
 * @description Create a new user
 * @returns New User With Token
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = RegisterUserSchema.safeParse(body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 404 }
      );
    }

    const user: User = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        telephone: body.telephone,
        education: body.education,
        groupId: body.groupId,
        gender: body.gender as $Enums.Gender,
        age: parseInt(body.age as unknown as string),
        role: body.role as $Enums.Role,
      },
    });
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
      {
        message: "User created successfully",
        user,
        token,
        status: 201,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 }, { status: 400 });
  }
}
