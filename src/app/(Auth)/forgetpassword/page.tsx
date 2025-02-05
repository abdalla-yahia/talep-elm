'use client'
import { forgetPassword } from "@/lib/Actions/ForgetPasswordActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import FullTitle from "@/Utils/FullTitle"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function ForgetPassword() {
    const {forgetpass} = useAppSelector(state=>state.forgetpass) as unknown as {forgetpass:{status:number}}
    const Roles = [{role:'USER',name:'طالب / طالبة'},
                   {role:'ADMIN',name:'مشرف / مشرفة'},
                   {role:'TEACHER',name:'مدرس  /مدرسة'},
                   {role:'ADMIN_TEACHER',name:'مشرف عام / مشرفة عام'},
                   {role:'MANAGER',name:'  مدير/ مديرة'},
                   {role:'OWNER',name:'الدكتور '}];

    const [email, setEmail] = useState('')
    const [userRole, setUserRole] = useState('USER')
    const dispatch = useAppDispatch()

    const SendEmailHandeller = () =>{
        if(email !== ''){
            dispatch(forgetPassword({
                email: email,
                Role:userRole
            }))
           
        }else toast.warning('يرجى إدخال البريد الإلكتروني')
    }
    useEffect(()=>{
        if(forgetpass?.status){
            if(forgetpass?.status === 200){
                toast.success('تم إرسال البريد الإلكتروني')
                setEmail('')
                redirect('/forgetpassword/verifycode')
            }else if(forgetpass?.status === 400){
                toast.error(' حدث خطأ غير معروف')
                }
        }
    },[forgetpass])
  return (
    <>
    <FullTitle F_Title={'ادخل بريدك الألكتروني'}/>
    <div className="w-full gap-3 flex flex-col justify-center items-center mt-11">
    <div className="md:w-2/3 lg:w-2/3 w-full gap-3 flex flex-col justify-center items-center mt-11">
    <input value={email} onChange={(e)=>setEmail(e?.target?.value)} type="email" className="px-2 w-full rounded text-gray-600" placeholder="ادخل بريدك الإلكتروني"/>
    <select defaultValue={'USER'} onChange={(e)=>setUserRole(e.target.value)} className="w-full rounded p-1 my-1 text-black cursor-pointer" name="" id="">
          <option selected value="إختر طريقة الدخول" disabled  > إختر طريقة الدخول</option>
            {
              Roles.map((role, index) => 
                <option key={index} value={role.role}>{role.name}</option>
              )
            }
        </select>
    <button onClick={()=>SendEmailHandeller()} className="w-full p-2 cursor-pointer rounded bg-orange-700 hover:bg-orange-500">إرسال</button>
    </div>
    </div>
        
    </>
  )
}
