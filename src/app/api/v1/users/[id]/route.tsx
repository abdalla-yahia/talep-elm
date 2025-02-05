import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import Role from "@/Utils/Role";
/**
 * @method GET
 * @param id
 * @path ~/api/v1/users/:id
 * @description Get A Specific User
 * @returns Message For Success Geting User And User Data
 * @access Private && Admins
 */
export async function GET(
  request: NextRequest,{ params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try{
        const id = (await params).id;
    const cookie = request.cookies.get("JwtToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "Your Are Not Login" },
        { status: 401 }
      );
    }
    const token = cookie.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const UserFromToken = Jwt.verify(token, SecretKey) as TokenInterFace;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        UserOnAssinments: true,
        UserOnExams: true,
        UserOnSubject: true,
        FinalResult: true,
        AssinmentResult: {
          include: {
            Assinments: {
              select: {
                id: true,
                name: true,
                assinmentbody: true,
              },
            },
          },
        },
        ExamResult: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    if (
      UserFromToken.id !== parseInt(id) &&
      Role(UserFromToken.role) < 1 &&
      UserFromToken.gender !== user.gender
    ) {
      return NextResponse.json(
        { message: "Only Admins Can Get This User" },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { message: "Success To get User Data", user, status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Get User", error, status: 500 },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @param id
 * @path ~/api/v1/users/:id
 * @description Update A Specific User
 * @returns Message For Success Update And New User Data
 * @access Private && Admins
 */

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id;
    const cookie = request.cookies.get("JwtToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "Your Are Not Login" },
        { status: 401 }
      );
    }
    const token = cookie.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const UserFromToken = Jwt.verify(token, SecretKey) as TokenInterFace;
    const Finduser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!Finduser) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    if (UserFromToken.id !== parseInt(id) && Role(UserFromToken.role) < 1) {
      return NextResponse.json(
        { message: "Only Admins Can Update This User" },
        { status: 403 }
      );
    }
    const body = await request.json();
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    if (body?.password?.length < 8) {
      return NextResponse.json(
        { message: "Password Must Be At Least 8 Characters", status: 400 },
        { status: 400 }
      );
    }
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(
      { message: "Sucess To Update User", status: 201, data: user },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Update This User", error, status: 400 },
      { status: 400 }
    );
  }
}

/**
 * @method DELETE
 * @param id
 * @path ~/api/v1/users/:id
 * @description Delete A Specific User
 * @returns Message For Success Delete
 * @access Private && Admin
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id;
    const cookie = request.cookies.get("JwtToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "Your Are Not Login" },
        { status: 401 }
      );
    }
    const token = cookie.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const UserFromToken = Jwt.verify(token, SecretKey) as TokenInterFace;
    const Finduser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!Finduser) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    if (
      UserFromToken.id !== parseInt(id) &&
      Role(UserFromToken.role) < 1 &&
      UserFromToken.gender !== Finduser.gender
    ) {
      return NextResponse.json(
        { message: "Only Admins Can Delete This User" },
        { status: 403 }
      );
    }
    await prisma.user.delete({ where: { id: parseInt(id) } });
    if (UserFromToken.id === parseInt(id)) {
      (await cookies()).delete("JwtToken");
    }
    return NextResponse.json(
      { message: "Delete User Successfuly", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can Not Delete This User", error, status: 500 },
      { status: 500 }
    );
  }
}
