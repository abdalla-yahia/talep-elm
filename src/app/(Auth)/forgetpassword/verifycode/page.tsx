'use client'
import { veifyCode } from "@/lib/Actions/ForgetPasswordActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import FullTitle from "@/Utils/FullTitle"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function VerifyCode() {
    const {VerifyCode}  = useAppSelector(state=>state.forgetpass) as unknown as {VerifyCode: {status:number}}
    const [codeVerify, setcodeVerify] = useState('')
    const dispatch = useAppDispatch()

    const SendcodeVerifyHandeller = () =>{
        if(codeVerify !== ''){
            dispatch(veifyCode(
                {
                    code: codeVerify
                }
            ))
            
        }else toast.warning('يرجى إدخال كود التفعيل')
    }
    useEffect(()=>{
        if(VerifyCode?.status){
        if(VerifyCode?.status === 200){
            toast.success('تم تفعيل الكود بنجاح')
            redirect('/forgetpassword/newpassword')
        }else {
            toast.error(' حدث خطأ في تفعيل الكود يرجى طلب كود جديد')
            }

        }
    },[VerifyCode])
  return (
    <>
    <FullTitle F_Title={'ادخل كود التفعيل'}/>
    <div className="w-full gap-3 flex flex-col justify-center items-center mt-11">
    <div className="md:w-2/3 lg:w-2/3 w-full gap-3 flex flex-col justify-center items-center mt-11">
    <input value={codeVerify} onChange={(e)=>setcodeVerify(e?.target?.value)} type="text" className="px-2 w-full rounded text-gray-600" placeholder="ادخل كود التفعيل"/>
    <button onClick={()=>SendcodeVerifyHandeller()} className="w-full p-2 cursor-pointer rounded bg-orange-700 hover:bg-orange-500">إرسال</button>
    </div>
    </div>
        
    </>
  )
}
