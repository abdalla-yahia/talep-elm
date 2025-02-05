import { TokenInterFace } from "@/Interfaces/InterFaces";
import Jwt  from "jsonwebtoken";
import { serialize } from "cookie";

export default function GenerateToken(userPayload:TokenInterFace):string {
  const SecretKey = process.env.JWT_SECRET_KEY as string
  const token = Jwt.sign(userPayload,SecretKey,{expiresIn:60 * 60 * 24 * 30})
  return token
}

export const SetCookies =(userPayload:TokenInterFace)=>{
  const token = GenerateToken(userPayload)
  const cookieOptions = {
    maxAge:  30 * 24 * 60 * 60,
    httpOnly: false,
    secure:process.env.NODE_ENV === 'production' && true,
    path:'/',
}
const cookie = serialize('JwtToken',token,cookieOptions)
return cookie
}