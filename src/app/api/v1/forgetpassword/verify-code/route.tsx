import {  TokenInterFace } from "@/Interfaces/InterFaces";
import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    const cookie = request.cookies.get("JwtToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "You Are Not Log In" },
        { status: 401 }
      );
    }
    const token = cookie?.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const UserFromToken = Jwt.verify(token, SecretKey) as TokenInterFace;
    const { email, role } = UserFromToken;

    switch (role) {
      case "OWNER":
        const OWNER = await prisma.owner.findUnique({ where: { email } });
        if (!OWNER)
          return NextResponse.json(
            { message: `${UserFromToken.role} not found` },
            { status: 404 }
          );
        const codeOWNERcompare = await bcrypt.compare(
          code,
          OWNER.passwordresetCode as unknown as string
        );
        if (!codeOWNERcompare || (OWNER.passwordExpire as Date) < new Date(Date.now()))
          return NextResponse.json(
            { message: "Invalid Or Expire code" },
            { status: 401 }
          );
        return NextResponse.json(
          { message: "Valid Code, Update your Password now ",status: 200 },
          { status: 200 }
        );

      case "MANAGER":
        const MANAGER = await prisma.manager.findUnique({ where: { email } });
        if (!MANAGER)
          return NextResponse.json(
            { message: `${UserFromToken.role} not found` },
            { status: 404 }
          );
        const codeMANAGERcompare = await bcrypt.compare(
          code,
          MANAGER.passwordresetCode as unknown as string
        );
        if (
          !codeMANAGERcompare ||
          (MANAGER.passwordExpire as Date) < new Date(Date.now())
        )
          return NextResponse.json(
            { message: "Invalid Or Expire code" },
            { status: 401 }
          );
        return NextResponse.json(
          { message: "Valid Code, Update your Password now ",status: 200 },
          { status: 200 }
        );

      case "ADMIN_TEACHER":
        const ADMIN_TEACHER = await prisma.adminTeacher.findUnique({
          where: { email },
        });
        if (!ADMIN_TEACHER)
          return NextResponse.json(
            { message: `${UserFromToken.role} not found` },
            { status: 404 }
          );
        const codeADMIN_TEACHERcompare = await bcrypt.compare(
          code,
          ADMIN_TEACHER.passwordresetCode as unknown as string
        );
        if (
          !codeADMIN_TEACHERcompare ||
          (ADMIN_TEACHER.passwordExpire as Date) < new Date(Date.now())
        )
          return NextResponse.json(
            { message: "Invalid Or Expire code" },
            { status: 401 }
          );
        return NextResponse.json(
          { message: "Valid Code, Update your Password now ",status: 200 },
          { status: 200 }
        );

      case "TEACHER":
        const TEACHER = await prisma.teachers.findUnique({ where: { email } });
        if (!TEACHER)
          return NextResponse.json(
            { message: `${UserFromToken.role} not found` },
            { status: 404 }
          );
        const codeTEACHERcompare = await bcrypt.compare(
          code,
          TEACHER.passwordresetCode as unknown as string
        );
        if (
          !codeTEACHERcompare ||
          (TEACHER.passwordExpire as Date) < new Date(Date.now())
        )
          return NextResponse.json(
            { message: "Invalid Or Expire code" },
            { status: 401 }
          );
        return NextResponse.json(
          { message: "Valid Code, Update your Password now ",status: 200 },
          { status: 200 }
        );

      case "ADMIN":
        const ADMIN = await prisma.admins.findUnique({ where: { email } });
        if (!ADMIN)
          return NextResponse.json(
            { message: `${UserFromToken.role} not found` },
            { status: 404 }
          );
        const codeADMINcompare = await bcrypt.compare(
          code,
          ADMIN.passwordresetCode as unknown as string
        );
        if (!codeADMINcompare || (ADMIN.passwordExpire as Date)< new Date(Date.now()))
          return NextResponse.json(
            { message: "Invalid Or Expire code" },
            { status: 401 }
          );
        return NextResponse.json(
          { message: "Valid Code, Update your Password now ",status: 200 },
          { status: 200 }
        );

      case "USER":
        const USER = await prisma.user.findUnique({ where: { email } });
        if (!USER)
          return NextResponse.json(
            { message: `${UserFromToken.role} not found` },
            { status: 404 }
          );
        const codeUSERcompare = await bcrypt.compare(
          code,
          USER.passwordresetCode as unknown as string
        );
        if (!codeUSERcompare || (USER.passwordExpire as Date)< new Date(Date.now()))
          return NextResponse.json(
            { message: "Invalid Or Expire code" },
            { status: 401 }
          );
        return NextResponse.json(
          { message: "Valid Code, Update your Password now ",status: 200 },
          { status: 200 }
        );

      default:
        return NextResponse.json(
          { message: "Something Went Wrong !!",status: 400  },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server", error },
      { status: 500 }
    );
  }
}
