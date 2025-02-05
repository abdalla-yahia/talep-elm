import { AdminTeacherSchema } from "@/Utils/ValidationShema";
import { $Enums, AdminTeacher } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/admin-teacher/auth/registers
 * @description Create a new AdminTeacher
 * @returns Create A New AdminTeacher With Token
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AdminTeacher;
    const validation = AdminTeacherSchema.safeParse(body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 404 }
      );
    }

    const AdminTeacher = await prisma.adminTeacher.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        telephone: body.telephone,
        gender: body.gender as $Enums.Gender,
        managerId: body.managerId,
      },
    });
    const cookies = SetCookies({
      id: AdminTeacher.id,
      role: AdminTeacher.role,
      email: AdminTeacher.email,
      path: "admin-teacher",
      gender: AdminTeacher.gender,
      name: AdminTeacher.name,
      image: AdminTeacher.image as string,
    });

    return NextResponse.json(
      { message: "Admin-Teacher Created successfully", AdminTeacher },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookies as unknown as IterableIterator<
            [string, string]
          >,
        } as unknown as Headers,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
