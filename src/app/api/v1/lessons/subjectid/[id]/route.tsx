import prisma from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";


/**
 * @method GET
 * @param id
 * @access Privite All Users
 * @path ~/api/v1/lessons/subjectid/:id
 * @returns Get A Specific Lesson Data On Subject 
 */


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
      const id = (await params).id;
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
      if (!UserFromToken) {
        return NextResponse.json(
          { message: "User Not Found" },
          { status: 404 }
        );
      }
      const FindLessons = await prisma.lessons.findMany({
        where: { subjectId: parseInt(id) },
        include: {
          teacher: {
            select: {
              name: true,
              id: true,
              email: true,
              gender: true,
            },
          },
          comments: {
            select: {
              id: true,
              User: {
                select: {
                  name: true,
                  id: true,
                  email: true,
                  gender: true,
                },
              },
              Teacher: {
                select: {
                  name: true,
                  id: true,
                  email: true,
                  gender: true,
                },
              },
              Admin: {
                select: {
                  name: true,
                  id: true,
                  email: true,
                  gender: true,
                },
              },
              AdminTeacher: {
                select: {
                  name: true,
                  id: true,
                  email: true,
                  gender: true,
                },
              },
              Manager: {
                select: {
                  name: true,
                  id: true,
                  email: true,
                  gender: true,
                },
              },
              Owner: {
                select: {
                  name: true,
                  id: true,
                  email: true,
                  gender: true,
                },
              },
              likes: {
                select: {
                  userId: true,
                  lessonId: true,
                  leaderId: true,
                  teacheId: true,
                  adminId: true,
                  mangerId: true,
                  ownerId: true,
                  id: true,
                  like: true,
                  love: true,
                  disLike: true,
                  hate: true,
                },
              },
              replies: {
                select: {
                  id: true,
                  text: true,
                  User: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                  Teacher: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                  Admin: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                  AdminTeacher: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                  Manager: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                  Owner: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                  likes: {
                    select: {
                      userId: true,
                      lessonId: true,
                      leaderId: true,
                      teacheId: true,
                      adminId: true,
                      mangerId: true,
                      ownerId: true,
                      id: true,
                      like: true,
                      love: true,
                      disLike: true,
                      hate: true,
                    },
                  },
                },
                orderBy: {
                  createdAt: "asc",
                },
              },
              text: true,
            },
            orderBy: {
              updatedAt: "desc",
            },
          },
          Subjects: {
            select: {
              name: true,
              id: true,
            },
          },
          Assinments: true,
          Assinment_Result: true,
        },
      });
      if (!FindLessons) {
        return NextResponse.json(
          { message: "Lesson Not Found" },
          { status: 404 }
        );
      }
      return NextResponse.json(FindLessons, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Something Wen Wrong", error },
        { status: 400 }
      );
    }
}
