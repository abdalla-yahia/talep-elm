'use client'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LoginUser } from "@/lib/Actions/UserActions";
import { redirect} from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import FullTitle from "@/Utils/FullTitle";

export default function LoginPage() {
  const {loginUser} = useAppSelector(state=>state.user) as unknown as {loginUser:{status:number}};
  const Roles = [{role:'users',name:'طالب / طالبة'},
    {role:'admins',name:'مشرف / مشرفة'},
    {role:'teachers',name:'مدرس  /مدرسة'},
    {role:'admin-teacher',name:'مشرف / مشرفة عام'},
    {role:'managers',name:'  مدير/ مديرة'},
    {role:'owner',name:'الدكتور '}];
    const [userName,setUserName]= useState('')
    const [password,setPassword]= useState('')
    const [userRole,setUserRole]= useState('users')
    const [seePass,setSeePass]= useState(true)
    const dispatch = useAppDispatch()

    const data1 = {
      telephone:userName,
    password:password,
    role:userRole
    }
    const data2 = {
      email:userName,
    password:password,
    role:userRole
    }

const LoginHandeller = ()=>{
  if(userName !== '' && password !== ''){
    if(!userName.includes('@')){
       dispatch(LoginUser(data1))
    }
   else { dispatch(LoginUser(data2))}
}else {
  toast.warning('يرجى ملء جميع الحقول')
  }
}
useEffect(()=>{
  if(loginUser?.status){
    if (loginUser?.status === 200) {
      toast.success('تم تسجيل الدخول بنجاح')
      setTimeout(() => { window.location.reload()}, 1000 * 10);
      redirect(`/${userRole}/dashboard/articles`)
  }else if(loginUser?.status === 404) {
    toast.error('هذا المستخدم غير موجود أو الرقم السري غير صحيح')
  }else if(loginUser?.status === 400){
    toast.error('حدث خطأ أثناء تسجيل الدخول')
  }
}
},[loginUser, userRole])

  return (
    <>
    <FullTitle F_Title={'تسجيل الدخول'}/>
   <div className="flex justify-center items-center flex-col w-full">
      <div  className="w-full font-bold md:w-2/3 lg:w-2/3 flex justify-center items-center flex-col py-5">
        <label className="hidden md:block lg:block  mt-1 mb-0  w-full" htmlFor="username"> رقم الهاتف أو الإيميل:</label><br/>
        <input value={userName} onChange={(e)=>setUserName(e.target.value)} className="w-full rounded pe-2 text-black p-1" placeholder="ادخل رقم الهاتف او الإيميل" type="text" id="username" name="username" required/><br/>
       
        <label  className="hidden md:block lg:block  my-1  w-full" htmlFor="password">الرقم السري:</label><br/>
        <div className="w-full flex rounded justify-center items-center my-1 text-black pl-1 bg-white">
        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded pe-2 border-none outline-none text-black p-1" placeholder="ادخل الرقم السري" type={seePass?"password":'text'} id="password" name="password" required/><br/>
        {
         seePass ? 
         (<FaEyeSlash onClick={()=>setSeePass(!seePass)}  className="cursor-pointer"/>):
         (<FaEye onClick={()=>setSeePass(!seePass)}  className="cursor-pointer"/>)
          }
        </div>
        <label className="hidden md:block lg:block my-1  w-full" htmlFor="username"> طريقة الدخول :</label><br/>
        <select value={userRole}  defaultValue={'users'} onChange={(e)=>setUserRole(e.target.value)} className="w-full rounded p-1 my-1 text-black cursor-pointer" name="" id="">
          <option selected value="إختر طريقة الدخول" disabled  > إختر طريقة الدخول</option>
            {
              Roles.map((role, index) => 
                <option key={index} value={role.role}>{role.name}</option>
              )
            }
        </select>
        <Button disabled={(userName !== '' && password !== '') ? false : true } onClick={()=>LoginHandeller()} className="w-full bg-slate-500 p-2 rounded hover:bg-slate-400 hover:text-purple-600" > تسجيل الدخول</Button>
      </div>
   </div >
   <div className="w-full flex justify-center mb-3 items-center">
     نسيت الرقم السري ؟
   <Link className="text-blue-400 cursor-pointer hover:text-blue-500" href={`/forgetpassword`}>اضغط هنا</Link>
   </div>
   <div className="w-full flex justify-center items-center">
   ليس لديك حساب؟
   <Link className="text-red-600 cursor-pointer hover:text-red-400" href={`/register`}>اضغط هنا</Link>
   </div>
    </>
  
  )
}
