import { TokenInterFace } from "@/Interfaces/InterFaces";
import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { SetCookies } from "@/Utils/GenerateToken";

export async function PUT(request:NextRequest){
    try {
        const salt = await bcrypt.genSalt(10);
        const { newPassword } = await request.json();
        const cookie = request.cookies.get("JwtToken");
        if (!cookie) {
          return NextResponse.json(
            { message: "Go Back To Get Anew pass" },
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
                  if (newPassword.length < 8){
                      return NextResponse.json({message:'Unvalid Password Must be 8 char long'}, {status:400})
                  }
                  const passOWNERhash = await bcrypt.hash(newPassword,salt);
                      await prisma.owner.update({where:{email},data:{
                      password:passOWNERhash,
                      passwordExpire:null,
                      passwordVirify:null,
                      passwordresetCode:null
                  }});
                  const OWNERcookies = SetCookies({
                      id: OWNER.id,
                      role: OWNER.role,
                      email: OWNER.email,
                      path:'owner',
                      gender:OWNER.gender,
                      name:OWNER.name,
                      image:OWNER.image as string,
                      });
                 return NextResponse.json(
                  { message: "Password Update Successffuly ",status: 200 },
                  { status: 200,headers:{
                      'Set-Cookie': OWNERcookies
                  } }
                );
      
            case "MANAGER":
              const MANAGER = await prisma.manager.findUnique({ where: { email } });
              if (!MANAGER)
                return NextResponse.json(
                  { message: `${UserFromToken.role} not found` },
                  { status: 404 }
                );
                if (newPassword.length < 8){
                    return NextResponse.json({message:'Unvalid Password Must be 8 char long'}, {status:400})
                }
                const passMANAGERhash = await bcrypt.hash(newPassword,salt);
                    await prisma.manager.update({where:{email},data:{
                    password:passMANAGERhash,
                    passwordExpire:null,
                    passwordVirify:null,
                    passwordresetCode:null
                }});
                const MANAGERcookies = SetCookies({
                    id: MANAGER.id,
                    role: MANAGER.role,
                    email: MANAGER.email,
                    path:'managers',
                    gender:MANAGER.gender,
                    name:MANAGER.name,
                    image:MANAGER.image as string,
                    });
               return NextResponse.json(
                { message: "Password Update Successffuly ",status: 200 },
                { status: 200,headers:{
                    'Set-Cookie': MANAGERcookies
                } }
              );
      
            case "ADMIN_TEACHER":
                const ADMIN_TEACHER = await prisma.adminTeacher.findUnique({ where: { email } });
                if (!ADMIN_TEACHER)
                  return NextResponse.json(
                    { message: `${UserFromToken.role} not found` },
                    { status: 404 }
                  );
                  if (newPassword.length < 8){
                      return NextResponse.json({message:'Unvalid Password Must be 8 char long'}, {status:400})
                  }
                  const passADMIN_TEACHERhash = await bcrypt.hash(newPassword,salt);
                      await prisma.adminTeacher.update({where:{email},data:{
                      password:passADMIN_TEACHERhash,
                      passwordExpire:null,
                      passwordVirify:null,
                      passwordresetCode:null
                  }});
                  const ADMIN_TEACHERcookies = SetCookies({
                      id: ADMIN_TEACHER.id,
                      role: ADMIN_TEACHER.role,
                      email: ADMIN_TEACHER.email,
                      path:'admin-teacher',
                      gender:ADMIN_TEACHER.gender,
                      name:ADMIN_TEACHER.name,
                      image:ADMIN_TEACHER.image as string,
                      });
                 return NextResponse.json(
                  { message: "Password Update Successffuly ",status: 200 },
                  { status: 200,headers:{
                      'Set-Cookie': ADMIN_TEACHERcookies
                  } }
                );
      
            case "TEACHER":
                const TEACHER = await prisma.teachers.findUnique({ where: { email } });
                if (!TEACHER)
                  return NextResponse.json(
                    { message: `${UserFromToken.role} not found` },
                    { status: 404 }
                  );
                  if (newPassword.length < 8){
                      return NextResponse.json({message:'Unvalid Password Must be 8 char long'}, {status:400})
                  }
                  const passTEACHERhash = await bcrypt.hash(newPassword,salt);
                      await prisma.teachers.update({where:{email},data:{
                      password:passTEACHERhash,
                      passwordExpire:null,
                      passwordVirify:null,
                      passwordresetCode:null
                  }});
                  const TEACHERcookies = SetCookies({
                      id: TEACHER.id,
                      role: TEACHER.role,
                      email: TEACHER.email,
                      path:'teachers',
                      gender:TEACHER.gender,
                      name:TEACHER.name,
                      image:TEACHER.image as string,
                      });
                 return NextResponse.json(
                  { message: "Password Update Successffuly ",status: 200 },
                  { status: 200,headers:{
                      'Set-Cookie': TEACHERcookies
                  } }
                );
      
            case "ADMIN":
                const ADMIN = await prisma.admins.findUnique({ where: { email } });
                if (!ADMIN)
                  return NextResponse.json(
                    { message: `${UserFromToken.role} not found` },
                    { status: 404 }
                  );
                  if (newPassword.length < 8){
                      return NextResponse.json({message:'Unvalid Password Must be 8 char long'}, {status:400})
                  }
                  const passADMINhash = await bcrypt.hash(newPassword,salt);
                      await prisma.admins.update({where:{email},data:{
                      password:passADMINhash,
                      passwordExpire:null,
                      passwordVirify:null,
                      passwordresetCode:null
                  }});
                  const ADMINcookies = SetCookies({
                      id: ADMIN.id,
                      role: ADMIN.role,
                      email: ADMIN.email,
                      path:'admins',
                      gender:ADMIN.gender,
                      name:ADMIN.name,
                      image:ADMIN.image as string,
                      });
                 return NextResponse.json(
                  { message: "Password Update Successffuly ",status: 200 },
                  { status: 200,headers:{
                      'Set-Cookie': ADMINcookies
                  } }
                );
      
            case "USER":
                const USER = await prisma.user.findUnique({ where: { email } });
                if (!USER)
                  return NextResponse.json(
                    { message: `${UserFromToken.role} not found` },
                    { status: 404 }
                  );
                  if (newPassword.length < 8){
                      return NextResponse.json({message:'Unvalid Password Must be 8 char long'}, {status:400})
                  }
                  const passUSERhash = await bcrypt.hash(newPassword,salt);
                      await prisma.user.update({where:{email},data:{
                      password:passUSERhash,
                      passwordExpire:null,
                      passwordVirify:null,
                      passwordresetCode:null
                  }});
                  const USERcookies = SetCookies({
                      id: USER.id,
                      role: USER.role,
                      email: USER.email,
                      path:'users',
                      gender:USER.gender,
                      name:USER.name,
                      image:USER.image as string,
                      });
                 return NextResponse.json(
                  { message: "Password Update Successffuly ",status: 200 },
                  { status: 200,headers:{
                      'Set-Cookie': USERcookies
                  } }
                );
      
            default:
              return NextResponse.json(
                { message: "Something Went Wrong !!" , status: 400},
                { status: 400 }
              );
          }

    } catch (error) {
        return NextResponse.json({message:'Internal Server',error},{status:500})
    }
}