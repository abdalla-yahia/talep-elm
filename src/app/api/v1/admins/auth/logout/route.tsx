import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";

/**
 * @method GET
 * @param request
 * @path ~/api/v1/admins/auth/logout
 * @description Logout a Admins
 * @returns Logout A Admins With Delete Token
 * @access Privite
 */

export async function GET(request:NextRequest){
    try {
        
        const cookie = request.cookies.get('JwtToken')
        if(!cookie?.value){
            return NextResponse.json({message:'Forbiden'},{status:403})
        }
            (await cookies()).delete('JwtToken')
            return NextResponse.json({message:'Logout Successfull'},{status:200})
    } catch (error) {
    return NextResponse.json({
        message:'Something Went Wrong!!',error
    },{status:500})
    }
}