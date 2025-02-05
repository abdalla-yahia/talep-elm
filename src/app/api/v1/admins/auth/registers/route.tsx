import { AdminsSchema } from "@/Utils/ValidationShema";
import { $Enums, Admins } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/Admins/auth/registers
 * @description Create a new admin
 * @returns New Admins With Token
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Admins;
    const validation = AdminsSchema.safeParse(body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 404 }
      );
    }

    const admin: Admins = await prisma.admins.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        telephone: body.telephone,
        gender: body.gender as $Enums.Gender,
        leaderId: body.leaderId,
        groupId: body.groupId,
      },
    });
    const token = SetCookies({
      id: admin.id,
      role: admin.role,
      email: admin.email,
      path: "admins",
      gender: admin.gender,
      name: admin.name,
      image: admin.image as string,
    });

    return NextResponse.json(
      { message: "Admins Created successfully", admin },
      {
        status: 201,
        headers: {
          "Set-Cookie": token as unknown as IterableIterator<[string, string]>,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
