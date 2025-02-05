import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";
import SendEmail from "@/Utils/SendMailer";
import { serialize } from "cookie";
import bcrypt from "bcryptjs";
/**
 * @method GET
 * @access Privite (Only Owner)
 * @path ~/api/v1/codes
 * @returns Get All Codes Data
 */

export async function GET() {
  try {
    const Codes = await prisma.codes.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!Codes) {
      return NextResponse.json({ message: "No Codes Found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Successfuly To Get All Codes",
        length: Codes.length,
        Codes,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 }, { status: 400 });
  }
}

/**
 * @method Code
 * @access Privite (Only Owners)
 * @path ~/api/v1/Codes/
 * @returns Create A Specific Code
 */

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("JwtToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "You Are Not Log In" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const token = cookie?.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const UserFromToken = Jwt.verify(token as string, SecretKey) as unknown as TokenInterFace;
    if (!UserFromToken) {
        return NextResponse.json({ message: "User Not Found22" }, { status: 404 });
    }
    if (Role(UserFromToken.role) < 5) {
      return NextResponse.json(
        { message: "Your Not Allow To Create Code, Only Owners" },
        { status: 401 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const codeHashed = await bcrypt.hash(body.code, salt);

    const Code = await prisma.codes.create({
      data: {
        code: codeHashed,
        role: body.role,
        email: body.email,
        CodeExpire: new Date(Date.now() + 10 * 60 * 1000),
        VirifyCode: false,
      },
    });
    const MessageBody = async (generateCode: unknown,title:string) => {
      return `<h1 style="color:blue"> مرحباً أخي الكريم  / أختي الكريمة ,</h1></br>
            <h2>لقد أرسلنا هذا البريد إليك بناءً على طلبك لأن تكون ضمن فريق ${title} وأن تشارك معنا بسهم في هذا الخير .</h2></br>
            <h3>هذا هو رمز التفعيل الخاص بك لإنشاء حسابك الجديد  : <h2 style="color:blue">${generateCode}</h2></h3></br>
            <h3>هذا الرمز فعال معك لمدة <h1 style="font-weight:bolder">  10 دقائق </h1> فقط.</h3></br>
            <h3>يبدأ احتساب مدة تفعيل الرمز من وقت إرسال البريد إليك.</h3></br>
            <h3>يرجى عدم إرسال هذا البريد لأي شخص آخر ولا يتطلع غيرك على هذا الرمز .</h3></br>
            <p>تقبلوا تحياتنا  </p></br>
            <p style="color:blue">${title}  </p></br> 
            `;
    };
    await SendEmail({
      to: body.email,
      subject: `كود إنشاء مستخدم جديد على موقع ${
        process.env.SITE_TITLE as string
      }`,
      html: await MessageBody(body.code, process.env.SITE_TITLE as string),
      from: "",
    });
    return NextResponse.json(
      {
        message: "Created Codes Successfuly",
        data: Code,
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrongs", error, status: 400 },
      { status: 400 }
    );
  }
}

/**
 * @method DELETE
 * @param id
 * @access public
 * @path ~/api/v1/codes/
 * @returns Delete A Specific Code Data
 */

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const FindCode = await prisma.codes.findFirst({
      where: { email: body.email },
    });
    if (!FindCode) {
      return NextResponse.json(
        { message: "No Code Found", status: 404 },
        { status: 404 }
      );
    }
    const CodeRegisterCompare = await bcrypt.compare(
      body.code as unknown as string,
      FindCode.code
    );
    if (
      !CodeRegisterCompare ||
      (FindCode?.CodeExpire as unknown as Date) < new Date(Date.now())
    )
      return NextResponse.json(
        { message: "Invalid Or Expire code" },
        { status: 401 }
      );
    const userPayload = {
      role: FindCode.role,
      email: FindCode.email,
    };
    const SecretKey = process.env.JWT_SECRET_KEY as string;
    const token = Jwt.sign(userPayload, SecretKey, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    const cookieOptions = {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: false,
      // secure:process.env.NODE_ENV === 'production' && true,
      secure: false,
      path: "/",
    };
    const cookies = serialize("RegisterToken", token, cookieOptions);
    await prisma.codes.deleteMany({ where: { email: body.email } });
    return NextResponse.json(
      { message: "Success To Delete Code", role: FindCode?.role, status: 200 },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookies as unknown as IterableIterator<
            [string, string]
          >,
        } as unknown as Headers | undefined,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something Wen Wrong", error, status: 400 },
      { status: 400 }
    );
  }
}
