import  prisma  from "@/Utils/db"
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import Role from "@/Utils/Role";
import {USER_COUNT_PER_PAGE} from "@/Utils/Constant";
/**
 * @method GET
 * @access Privite (Only Admins Or > )
 * @path ~/api/v1/users
 * @returns Get All Users Data
 */

export async function GET(request:NextRequest){
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
    });
    if(!User){
        return NextResponse.json({message:'لا يوجد طلبة'}, {status:404})
    }
    const PageCount = Math.ceil(+User?.length / +USER_COUNT_PER_PAGE) ;
    return NextResponse.json({message:'تم جلب كل الطلبة بنجاح',length:User.length,User,pageCount:PageCount},{status:200});
} catch (error) {
    return NextResponse.json({message:error})
}
}