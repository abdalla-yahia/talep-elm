import { OwnerSchema } from "@/Utils/ValidationShema";
import { $Enums, Owner } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/owner/auth/registers
 * @description Create a new owner
 * @returns New Owner With Token
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Owner;
    const validation = OwnerSchema.safeParse(body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 404 }
      );
    }

    const owner: Owner = await prisma.owner.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        telephone: body.telephone,
        education: body.education,
        gender: body.gender as $Enums.Gender,
        role: body.role as $Enums.Role,
      },
    });
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
      { message: "Owner Created successfully", owner },
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
