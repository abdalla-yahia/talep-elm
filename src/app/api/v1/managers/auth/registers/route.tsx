import { ManagersSchema } from "@/Utils/ValidationShema";
import { $Enums, Manager } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/Managers/auth/registers
 * @description Create a new Manager
 * @returns Create A New Manager With Token
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Manager;
    const validation = ManagersSchema.safeParse(body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 404 }
      );
    }

    const Manager: Manager = await prisma.manager.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        telephone: body.telephone,
        gender: body.gender as $Enums.Gender,
        ownerId: body.ownerId,
      },
    });
    const token = SetCookies({
      id: Manager.id,
      role: Manager.role,
      email: Manager.email,
      path: "managers",
      gender: Manager.gender,
      name: Manager.name,
      image: Manager.image as string,
    });

    return NextResponse.json(
      { message: "Manager Created successfully", Manager },
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
