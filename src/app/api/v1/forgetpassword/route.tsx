import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../Utils/db";
import SendEmail from "@/Utils/SendMailer";
import bcrypt from "bcryptjs";
import { SetCookies } from "@/Utils/GenerateToken";
import { TokenInterFace } from "@/Interfaces/InterFaces";

export async function POST(request: NextRequest) {
  const salt = await bcrypt.genSalt(10);
  const { email, Role } = await request.json();
  const GenerateDefaulteResetCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const hashCode = await bcrypt.hash(GenerateDefaulteResetCode, salt);
  const MessageBody = async (
    user: { name: string; gender: string },
    generateCode: string,
    siteTitle: string
  ) => {
    return `<h1 style="color:blue">مرحباً ${
      user?.gender === "MALE" ? "أخي الكريم : " : "أختي الكريمة : "
    } <span style="color:red">${user.name}</span>,</h1></br>
            <h2>لقد أرسلنا هذا البريد إليك بناءً على طلبك لاستعادة كلمة المرور الخاصة بك.</h2></br>
            <h3>هذا هو رمز التفعيل الخاص بك  : <h2 style="color:blue">${generateCode}</h2></h3></br>
            <h3>هذا الرمز فعال معك لمدة <h1 style="font-weight:bolder">  10 دقائق </h1> فقط.</h3></br>
            <h3>يبدأ احتساب مدة تفعيل الرمز من وقت إرسال البريد إليك.</h3></br>
            <h3>يرجى عدم إرسال هذا البريد لأي شخص آخر.</h3></br>
            <p>تقبلوا تحياتنا  </p></br>
            <p style="color:blue">${siteTitle}  </p></br> 
            `;
  };
  try {
    switch (Role) {
      case "OWNER":
        const OWNER = await prisma.owner.findUnique({
          where: { email: email },
        });
        if (!OWNER)
          return NextResponse.json(
            { message: `${Role} not found` },
            { status: 404 }
          );
        await SendEmail({
          to: email,
          subject: "Code Reset Password",
          html: await MessageBody(OWNER, GenerateDefaulteResetCode,process.env.SITE_TITLE as string),
          from: process?.env?.SITE_TITLE as string,
        });
        await prisma.owner.update({
          where: { id: parseInt(OWNER.id as unknown as string) },
          data: {
            passwordresetCode: hashCode,
            passwordExpire: new Date(Date.now() + 10 * 60 * 1000),
            passwordVirify: false,
          },
        });
        const OWNERcookie = await request.cookies.get("JwtToken");
        if (!OWNERcookie) {
          const token = SetCookies({
            id: OWNER.id,
            role: OWNER.role,
            email: OWNER.email,
            gender: OWNER.gender,
            name: OWNER.name,
            image: OWNER?.image as string,
            path: "owner",
          }) as unknown as TokenInterFace;
          return NextResponse.json(
            {
              message: `${Role}: ${OWNER.name} Success to Send Reset Code`,
              status: 200,
              code: hashCode,
            },
            {
              status: 200,
              headers: {
                "Set-Cookie": token as unknown as IterableIterator<
                  [string, string]
                >,
              } as unknown as Headers | undefined,
            }
          );
        }
        return NextResponse.json(
          {
            message: `${Role}: ${OWNER.name} Success to Send Reset Code`,
            status: 200,
          },
          { status: 200 }
        );

      case "MANAGER":
        const MANAGER = await prisma.manager.findUnique({
          where: { email: email },
        });
        if (!MANAGER)
          return NextResponse.json(
            { message: `${Role} not found` },
            { status: 404 }
          );
        await SendEmail({
          to: email,
          subject: "Reset Password",
          html: await MessageBody(MANAGER, GenerateDefaulteResetCode,process.env.SITE_TITLE as string),
          from: process?.env?.SITE_TITLE as string,
        });
        await prisma.manager.update({
          where: { id: parseInt(MANAGER.id as unknown as string) },
          data: {
            passwordresetCode: hashCode,
            passwordExpire: new Date(Date.now() + 10 * 60 * 1000),
            passwordVirify: false,
          },
        });
        const MANAGERcookie = await request.cookies.get("JwtToken");
        if (!MANAGERcookie) {
          const token = SetCookies({
            id: MANAGER.id,
            role: MANAGER.role,
            email: MANAGER.email,
            gender: MANAGER.gender,
            name: MANAGER.name,
            image: MANAGER.image as string,
            path: "managers",
          }) as unknown as TokenInterFace;
          return NextResponse.json(
            {
              message: `${Role}: ${MANAGER.name} Success to Send Reset Code`,
              status: 200,
              code: hashCode,
            },
            {
              status: 200,
              headers: {
                "Set-Cookie": token as unknown as IterableIterator<
                  [string, string]
                >,
              } as unknown as Headers | undefined,
            }
          );
        }
        return NextResponse.json(
          {
            message: `${Role}: ${MANAGER.name} Success to Send Reset Code`,
            status: 200,
            code: hashCode,
          },
          { status: 200 }
        );

      case "ADMIN_TEACHER":
        const ADMIN_TEACHER = await prisma.adminTeacher.findUnique({
          where: { email: email },
        });
        if (!ADMIN_TEACHER)
          return NextResponse.json(
            { message: `${Role} not found` },
            { status: 404 }
          );
        await SendEmail({
          to: email,
          subject: "Reset Password",
          html: await MessageBody(ADMIN_TEACHER, GenerateDefaulteResetCode,process.env.SITE_TITLE as string),
          from: process?.env?.SITE_TITLE as string,
        });
        await prisma.adminTeacher.update({
          where: { id: parseInt(ADMIN_TEACHER.id as unknown as string) },
          data: {
            passwordresetCode: hashCode,
            passwordExpire: new Date(Date.now() + 10 * 60 * 1000),
            passwordVirify: false,
          },
        });
        const ADMIN_TEACHERcookie = await request.cookies.get("JwtToken");
        if (!ADMIN_TEACHERcookie) {
          const token = SetCookies({
            id: ADMIN_TEACHER.id,
            role: ADMIN_TEACHER.role,
            email: ADMIN_TEACHER.email,
            gender: ADMIN_TEACHER.gender,
            name: ADMIN_TEACHER.name,
            image: ADMIN_TEACHER.image as string,
            path: "admin-teacher",
          }) as unknown as TokenInterFace;
          return NextResponse.json(
            {
              message: `${Role}: ${ADMIN_TEACHER.name} Success to Send Reset Code`,
              status: 200,
              code: hashCode,
            },
            {
              status: 200,
              headers: {
                "Set-Cookie": token as unknown as IterableIterator<
                  [string, string]
                >,
              } as unknown as Headers | undefined,
            }
          );
        }
        return NextResponse.json(
          {
            message: `${Role}: ${ADMIN_TEACHER.name} Success to Send Reset Code`,
            status: 200,
          },
          { status: 200 }
        );

      case "TEACHER":
        const TEACHER = await prisma.teachers.findUnique({
          where: { email: email },
        });
        if (!TEACHER)
          return NextResponse.json(
            { message: `${Role} not found` },
            { status: 404 }
          );
        await SendEmail({
          to: email,
          subject: "Reset Password",
          html: await MessageBody(TEACHER, GenerateDefaulteResetCode,process.env.SITE_TITLE as string),
          from: process?.env?.SITE_TITLE as string,
        });
        await prisma.teachers.update({
          where: { id: parseInt(TEACHER.id as unknown as string) },
          data: {
            passwordresetCode: hashCode,
            passwordExpire: new Date(Date.now() + 10 * 60 * 1000),
            passwordVirify: false,
          },
        });
        const TEACHERcookie = await request.cookies.get("JwtToken");
        if (!TEACHERcookie) {
          const token = SetCookies({
            id: TEACHER.id,
            role: TEACHER.role,
            email: TEACHER.email,
            gender: TEACHER.gender,
            name: TEACHER.name,
            image: TEACHER.image as string,
            path: "teachers",
          }) as unknown as TokenInterFace;
          return NextResponse.json(
            {
              message: `${Role}: ${TEACHER.name} Success to Send Reset Code`,
              status: 200,
              code: hashCode,
            },
            {
              status: 200,
              headers: {
                "Set-Cookie": token as unknown as IterableIterator<
                  [string, string]
                >,
              } as unknown as Headers | undefined,
            }
          );
        }
        return NextResponse.json(
          {
            message: `${Role}: ${TEACHER.name} Success to Send Reset Code`,
            status: 200,
          },
          { status: 200 }
        );

      case "ADMIN":
        const ADMIN = await prisma.admins.findUnique({
          where: { email: email },
        });
        if (!ADMIN)
          return NextResponse.json(
            { message: `${Role} not found` },
            { status: 404 }
          );
        await SendEmail({
          to: email,
          subject: "Reset Password",
          html: await MessageBody(ADMIN, GenerateDefaulteResetCode,process.env.SITE_TITLE as string),
          from: process?.env?.SITE_TITLE as string,
        });
        await prisma.admins.update({
          where: { id: parseInt(ADMIN.id as unknown as string) },
          data: {
            passwordresetCode: hashCode,
            passwordExpire: new Date(Date.now() + 10 * 60 * 1000),
            passwordVirify: false,
          },
        });
        const ADMINcookie = await request.cookies.get("JwtToken");
        if (!ADMINcookie) {
          const token = SetCookies({
            id: ADMIN.id,
            role: ADMIN.role,
            email: ADMIN.email,
            gender: ADMIN.gender,
            name: ADMIN.name,
            image: ADMIN.image as string,
            path: "admins",
          }) as unknown as TokenInterFace;
          return NextResponse.json(
            {
              message: `${Role}: ${ADMIN.name} Success to Send Reset Code`,
              status: 200,
              code: hashCode,
            },
            {
              status: 200,
              headers: {
                "Set-Cookie": token as unknown as IterableIterator<
                  [string, string]
                >,
              } as unknown as Headers | undefined,
            }
          );
        }
        return NextResponse.json(
          {
            message: `${Role}: ${ADMIN.name} Success to Send Reset Code`,
            status: 200,
          },
          { status: 200 }
        );

      case "USER":
        const USER = await prisma.user.findUnique({ where: { email: email } });
        if (!USER)
          return NextResponse.json(
            { message: `${Role} not found` },
            { status: 404 }
          );
        await SendEmail({
          to: email,
          subject: "Reset Password",
          html: await MessageBody(USER, GenerateDefaulteResetCode,process.env.SITE_TITLE as string),
          from: process?.env?.SITE_TITLE as string,
        });
        await prisma.user.update({
          where: { id: parseInt(USER.id as unknown as string) },
          data: {
            passwordresetCode: hashCode,
            passwordExpire: new Date(Date.now() + 10 * 60 * 1000),
            passwordVirify: false,
          },
        });
        const USERcookie = await request.cookies.get("JwtToken");
        if (!USERcookie) {
          const token = SetCookies({
            id: USER.id,
            role: USER.role,
            email: USER.email,
            gender: USER.gender,
            name: USER.name,
            image: USER.image as string,
            path: "users",
          });
          return NextResponse.json(
            {
              message: `${Role}: ${USER.name} Success to Send Reset Code`,
              status: 200,
              code: hashCode,
            },
            {
              status: 200,
              headers: {
                "Set-Cookie": token as unknown as IterableIterator<
                  [string, string]
                >,
              } as unknown as Headers | undefined,
            }
          );
        }
        return NextResponse.json(
          {
            message: `${Role}: ${USER.name} Success to Send Reset Code`,
            status: 200,
          },
          { status: 200 }
        );
      default:
        return NextResponse.json(
          { message: "Invalid Role", status: 400 },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
