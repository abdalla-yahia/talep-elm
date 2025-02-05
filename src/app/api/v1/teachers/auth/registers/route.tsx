import { TeacherSchema } from "@/Utils/ValidationShema";
import { $Enums, Teachers } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";

/**
 * @method POST
 * @param request
 * @path ~/api/v1/teachers/auth/registers
 * @description Create a new teacher
 * @returns New teacher With Token
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Teachers;
    const validation = TeacherSchema.safeParse(body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 404 }
      );
    }

    const teacher: Teachers = await prisma.teachers.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        telephone: body.telephone,
        education: body.education,
        groupId: body.groupId,
        gender: body.gender as $Enums.Gender,
        leaderId: body.leaderId,
        subjectId: body.subjectId,
      },
    });
    const token = SetCookies({
      id: teacher.id,
      role: teacher.role,
      email: teacher.email,
      path: "teachers",
      gender: teacher.gender,
      name: teacher.name,
      image: teacher.image as string,
    });

    return NextResponse.json(
      { message: "Teacher Created Successfully", teacher },
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
