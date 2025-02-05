import { cookies } from "next/headers";
import  Jwt  from "jsonwebtoken";
import { UserPayload } from "@/Interfaces/InterFaces";

export async function GetCookie(){

    const cookie =(await cookies()).get('JwtToken');
    const token:string = cookie?.value || "" ;
    const deccoade = Jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;
    if(!deccoade)
    return null;
    return deccoade;
}

const getCookie = GetCookie()

export default getCookie;