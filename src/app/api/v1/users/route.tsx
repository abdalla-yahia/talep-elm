import  prisma  from "@/Utils/db"
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";
import {USER_COUNT_PER_PAGE} from "@/Utils/Constant";
import { $Enums, Gender } from "@prisma/client";
/**
 * @method GET
 * @access Privite (Only Admins Or > )
 * @path ~/api/v1/users
 * @returns Get All Users Data
 */

export async function GET(request:NextRequest){
    const PAGE_NUMBER =request.nextUrl.searchParams.get('pageNumber') || '1';
    const SEARCH_BY_NAME = request.nextUrl.searchParams.get('userName') || '';
    const GET_USER_BY_GENDER = request.nextUrl.searchParams.get('userGender') || '';
    const GET_USER_BY_GROUP = request.nextUrl.searchParams.get('userGroup') || '';
    try {
    
    const cookie = request.cookies.get('JwtToken')
    if(!cookie){
        return NextResponse.json({message:'Unauthorized'}, {status:401})
    }
    const token =cookie.value;
    const SecretKey = process.env.JWT_SECRET_KEY as string;

    const UserFromToken =Jwt.verify(token,SecretKey) as TokenInterFace;
    
    if( Role(UserFromToken.role) < 1 ){
        return NextResponse.json({message:'غير مسموح للطلاب , المشرفين فقط'}, {status:401})
    }
    if( Role(UserFromToken.role) < 4 ){
    const User = await prisma.user.findMany({
        include:{
            UserOnAssinments:true,
            UserOnExams:true,
            UserOnSubject:true,
            FinalResult:true,
            AssinmentResult:true,
            ExamResult:true,
            Groups:true
        },
        orderBy:{
            name:'asc'
        },
        skip:USER_COUNT_PER_PAGE * (parseInt(PAGE_NUMBER) - 1 ) || 0,
        take:USER_COUNT_PER_PAGE,
        where:{name: {contains:SEARCH_BY_NAME},gender:(UserFromToken.gender as string) as $Enums.Gender}
    });
    if(!User){
        return NextResponse.json({message:'لا يوجد طلبة'}, {status:404})
    }
    const PageCount = Math.ceil(User?.length / USER_COUNT_PER_PAGE) ;
    return NextResponse.json({message:'تم جلب كل الطلبة بنجاح',length:User.length,User,pageCount:PageCount},{status:200});
    }else {
        const User = await prisma.user.findMany({
            include:{
                UserOnAssinments:true,
                UserOnExams:true,
                UserOnSubject:true,
                FinalResult:true,
                AssinmentResult:true,
                ExamResult:true,
                Groups:true
            },
            orderBy:{
                name:'asc',
            },
            skip:USER_COUNT_PER_PAGE * (parseInt(PAGE_NUMBER) - 1 ) || 0,
            take:(!GET_USER_BY_GENDER && !GET_USER_BY_GROUP) ? USER_COUNT_PER_PAGE : 1000,
            where:{
                name: {contains:SEARCH_BY_NAME || ''},
                gender:GET_USER_BY_GENDER as Gender || {in:['FEMALE','MALE']} ,
                Groups:{name:{contains:GET_USER_BY_GROUP}}
            },
        });

        if(!User){
            return NextResponse.json({message:'لا يوجد طلبة'}, {status:404})
        }
        const PageCount = Math.ceil(+User?.length / +USER_COUNT_PER_PAGE) ;
        return NextResponse.json({message:'تم جلب كل الطلبة بنجاح',length:User.length,User,pageCount:PageCount},{status:200});
    }
} catch (error) {
    return NextResponse.json({message:error})
}
}