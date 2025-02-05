'use client'
import { resetPassword } from "@/lib/Actions/ForgetPasswordActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import FullTitle from "@/Utils/FullTitle"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function NewPassword() {
    const {ResetPassword} = useAppSelector(state=>state.forgetpass) as unknown as {ResetPassword: {status:number}}
    const [password, setpassword] = useState('')
    const [ConfimPassword, setConfimPassword] = useState('')
    const dispatch = useAppDispatch()

    const SendpasswordHandeller = () =>{
        if(password !== ''){
            if(password !== ConfimPassword){
                toast.warning('الرقم السري غير متطابق')
                setpassword('')
                setConfimPassword('')
            }else{
                dispatch(resetPassword({
                    newPassword:password
                }))
            }
        }else toast.warning('يرجى إدخال الرقم السري الجديد')
    }
    useEffect(()=>{
        if(ResetPassword?.status){
            if(ResetPassword?.status === 200){
                toast.success('تم تغيير كلمة المرور بنجاح')
                redirect('/login')
            }else if(ResetPassword?.status === 400){
                toast.error('خطأ في تغيير كلمة المرور')
                }
        }
    },[ResetPassword])
  return (
    <>
    <FullTitle F_Title={'ادخل الرقم السري الجديد'}/>
    <div className="w-full gap-3 flex flex-col justify-center items-center mt-11">
    <div className="md:w-2/3 lg:w-2/3 w-full gap-3 flex flex-col justify-center items-center mt-11">
    <input value={password} onChange={(e)=>setpassword(e?.target?.value)} type="text" className="px-2 w-full rounded text-gray-600" placeholder="ادخل  الرقم السري"/>
    <input value={ConfimPassword} onChange={(e)=>setConfimPassword(e?.target?.value)} type="text" className="px-2 w-full rounded text-gray-600" placeholder="ادخل تأكيد الرقم السري"/>
    <button onClick={()=>SendpasswordHandeller()} className="w-full p-2 cursor-pointer rounded bg-orange-700 hover:bg-orange-500">إرسال</button>
    </div>
    </div>
        
    </>
  )
}
