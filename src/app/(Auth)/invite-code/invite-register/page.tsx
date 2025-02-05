import AdminRegister from "./admin/page";
import TeacherRegister from "./teacher/page";
import FullTitle from "@/Utils/FullTitle";
import { cookies } from "next/headers";
import  Jwt from "jsonwebtoken";
import AdminTeacherRegister from "./admin_teacher/page";
import ManagerRegister from "./manager/page";
import OwnerRegister from "./owner/page";
interface DecodeInterface {
  role:string ,
  email:string
}
/**
 * Retrieves user permissions from a JWT token and renders the appropriate registration component.
 * 
 * This function performs the following steps:
 * 1. Retrieves the 'RegisterToken' from cookies.
 * 2. Verifies and decodes the JWT token.
 * 3. Renders the appropriate registration component based on the user's role.
 * 
 * @async
 * @returns {Promise<JSX.Element>} A Promise that resolves to a JSX element containing the appropriate registration component.
 * @throws {Error} If the JWT verification fails or if there's an issue with cookie retrieval.
 */
export default async function GetPermations(): Promise<JSX.Element>{
  const cookie = (await cookies()).get('RegisterToken')
  const token = cookie?.value;
  const Decode  = Jwt.verify(token as string,process.env.JWT_SECRET_KEY as unknown as string) as DecodeInterface | never
  return (
    <>
    <FullTitle F_Title={'إنشاء حساب موظف جديد'}/>
    {Decode?.role !== null && Decode?.role === 'ADMIN'  ?  <AdminRegister permation={Decode}/>:null}
    {Decode?.role !== null && Decode?.role === 'TEACHER'? <TeacherRegister permation={Decode}/>:null}
    {Decode?.role !== null && Decode?.role === 'ADMIN_TEACHER'? <AdminTeacherRegister permation={Decode}/>:null}
    {Decode?.role !== null && Decode?.role === 'MANAGER'? <ManagerRegister permation={Decode}/>:null}
    {Decode?.role !== null && Decode?.role === 'OWNER'? <OwnerRegister permation={Decode}/>:null}
    {/* {
      (Decode?.role !== undefined && Decode?.role === 'ADMIN')?
      (<AdminRegister permation={Decode || undefined}/>):
      (Decode?.role !== undefined && Decode?.role === 'TEACHER')?
      <TeacherRegister permation={Decode || undefined}/>:
      (Decode?.role !== undefined && Decode?.role === 'ADMIN_TEACHER')?
      <AdminTeacherRegister permation={Decode || undefined}/>:
      (Decode?.role !== undefined && Decode?.role === 'MANAGER')?
      <ManagerRegister permation={Decode || undefined}/>:
      (Decode?.role !== undefined && Decode?.role === 'OWNER')?
      <OwnerRegister permation={Decode || undefined}/>: undefined
    } */}
    </>
  );
}
