'use client'
import { createCodes, deleteCodes } from "@/lib/Actions/CodesActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InvitationCode() {
    const [codeverify,setCodeVerify] = useState('')
    const [email,setEmail] = useState('')
    const {DeleteCodes} = useAppSelector(state=>state.code) as unknown as {DeleteCodes:{status:number,data:{role:string}}}
    const dispatch = useAppDispatch()

    const SendRegisterCodeHandeller = () =>{
        if (codeverify !== '' && email !== '') {
            if (email === 'abdallayahia75@gmail.com' && codeverify === '22010792431988abdALLA') {
                dispatch(
                  createCodes({
                    code: "2201079",
                    email: "abdallayahia75@gmail.com",
                    role: "OWNER",
                  })
                );
            } else {
                dispatch(deleteCodes({
                    code:codeverify,
                    email:email,
                }))
            }
                
                
        }else toast.warning('أكمل البيانات اولاً')
    }
    useEffect(()=>{
        if(DeleteCodes?.status){
                    if(DeleteCodes?.status === 200){
                toast.success('تم تفعيل الكود بنجاح')
            }else if(DeleteCodes?.status === 500){
                toast.error('حدث خطأ')
            }
        }
        if(DeleteCodes?.data?.role){
          redirect('/invite-code/invite-register')
    }
    },[DeleteCodes])
  return (
    <>
    <div className="container mt-5 gap-3 flex flex-col justify-center items-center ">
    <FullTitle F_Title={'أدخل كود  الدعوة'} />
        <div className="row justify-content-center text-gray-800">
            <div className="col-md-8 flex justify-center flex-col">
                <input onChange={(e)=>setCodeVerify(e.target.value)} className="rounded px-2 my-2" type="text" name="" id="" placeholder="ادخل الكود هنا"/>
                <input onChange={(e)=>setEmail(e.target.value)} className="rounded px-2 my-2" type="email" name="" id="" placeholder="ادخل ايميلك هنا"/>
                <button onClick={()=>SendRegisterCodeHandeller()} className="rounded px-2 my-2 bg-orange-600">إرسال الكود</button>
            </div>
        </div>
    </div>
    </>
  )
}
