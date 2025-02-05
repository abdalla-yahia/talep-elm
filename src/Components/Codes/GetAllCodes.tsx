'use client'
import { createCodes, fetchCodes } from "@/lib/Actions/CodesActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect, useState } from "react"
import CodessMap from "./CodesMap"
import { toast } from "react-toastify"
import { Codes } from "@prisma/client"
export default function GetAllCodes() {
    const {AllCodes} = useAppSelector(state => state.code) as unknown as {AllCodes:{Codes:Codes[]}}
    const {CreateCodes} = useAppSelector(state=>state.code) as unknown as {CreateCodes:{status:number}}
    const {UpdateCodes} = useAppSelector(state=>state.code) as unknown as {UpdateCodes:{status:number}}
    const {DeleteCodes} = useAppSelector(state=>state.code) as unknown as {DeleteCodes:{status:number}}
    const {CreateAdmin} = useAppSelector(state=>state.admin)
    const {CreateTeacher} = useAppSelector(state=>state.teacher)
    const {CreateAdmin_Teacher} = useAppSelector(state=>state.admin_teacher)
    const {CreateManager} = useAppSelector(state=>state.manager)
    const {CreateOwner} = useAppSelector(state=>state.owner)
    const [code,setCode]=useState('')
    const [email,setEmail]=useState('')
    const [role,setRole]=useState('')
    const dispatch = useAppDispatch()

    //Generate A Specific Code
    const GenerateCode = () =>{
      let code ='';
      const num = '0123456789abcdefghijklmnopqrstuvwxyz@#$%^&*'
        for(let i =0 ; i <= 8 ; i++){
          code += num.charAt(Math.floor(Math.random() * num.length))
        }
        setCode(code)
    }
    const CreateCodesHandeller =async () =>{
      if(code !== '' && email !== '' && role !== ''){
        dispatch(createCodes({
          code,
          email,
          role,
        }))
      }else toast.warning('أكتب محتوي الكود أولاً')
    }
    useEffect(()=>{
      if(CreateCodes?.status){
      if(CreateCodes?.status === 201){
        toast.success('تم إنشاء الكود بنجاح')
        setCode('')
        setEmail('')
      }else if (CreateCodes?.status === 400){
        toast.error('حدث خطأ في إنشاء الكود')
      }
      }
    },[CreateCodes])
    useEffect(()=>{
      dispatch(fetchCodes())
    },[dispatch,UpdateCodes,DeleteCodes,CreateCodes,CreateAdmin,CreateTeacher,CreateAdmin_Teacher,CreateManager,CreateOwner])
    const codes = AllCodes?.Codes;
  return (
    <>
    <h2 className="text-2xl text-gray-700 font-bold w-full flex justify-center items-center">إنشاء كود جديد </h2>
    <div className="flex text-gray-800 justify-center flex-col gap-2 items-center w-full">
      <div className="flex justify-between items-center rounded">
      <label  className="rounded px-2 bg-white mx-2" >{code}</label>
      <button onClick={()=>GenerateCode()} className="p-1 bg-green-600 rounded">إنشاء كود عشوائي</button>
      </div>

      <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' name="" id="" className="rounded px-2" placeholder="ادخل بريد المستخدم الجديد"/>
      <select onChange={(e)=>setRole(e.target.value)} name="" id="" className="rounded px-2">
        <option selected disabled value="">اختر الوظيفه</option>
        <option value={'ADMIN'}>مشرف</option>
        <option value={'TEACHER'}>مدرس</option>
        <option value={'ADMIN_TEACHER'}>مشرف عام</option>
        <option value={'MANAGER'}>مدير</option>
        <option value={'OWNER'}>مالك الموقع</option>
      </select>
      <button  onClick={()=>CreateCodesHandeller()} className="p-2 rounded bg-gray-600 text-white">إرسال الكود</button>
    </div>
    <CodessMap AllCodes ={codes}/>
    </>
  )
}
