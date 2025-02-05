import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";

/**
 * @method GET
 * @param request
 * @path ~/api/v1/users/logout
 * @description Logout a user
 * @returns Logout A User With Delete Token
 * @access Privite
 */

export async function GET(request:NextRequest){
    try {
        
        const cookie = request.cookies.get('JwtToken')
        if(!cookie?.value){
            return NextResponse.json({message:'لا يوجد مستخدم مسجل'},{status:403})
        }
            (await cookies()).delete('JwtToken')
            return NextResponse.json({message:'تم الخروج بنجاح'},{status:200})
    } catch (error) {
    return NextResponse.json({
        message:'شىء خطأ حدث يرجي مراجعة البيانات!!',error
    },{status:500})
    }
}