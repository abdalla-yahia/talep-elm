import { NextRequest, NextResponse } from "next/server"
import  Jwt  from "jsonwebtoken";
import Cookies from 'js-cookie';

export default function middleware(request:NextRequest) {
    const jwetoken = request.cookies.get('JwtToken')
    const token = jwetoken?.value as string;
    const secret_Key = process.env.JWT_SECRET_KEY
 
    const decoded = Jwt.verify(token, secret_Key as string)
    if(!decoded){
        return NextResponse.redirect(new URL('/login', request.url))
    }
Cookies.set('cookieToken', JSON.stringify(decoded), { expires: 7 });
    return NextResponse.next()


}

export const config = {
    matcher:'/(!*./auth/login?)',
}