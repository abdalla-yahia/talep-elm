'use client'
import { useEffect, useState } from "react";
import * as icon from '@/Components/Icons/icons'
import FullTitle from "@/Utils/FullTitle";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchGroups } from "@/lib/Actions/GroupsActions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { createAdmin_Teacher } from "@/lib/Actions/Admins_TeachersActions";
import { fetchAllManagers } from "@/lib/Actions/ManagersActions";
import { Manager } from "@prisma/client";
import { permation } from "@/Interfaces/InterFaces";


export default function AdminTeacherRegister({permation}:{permation:permation|null}) {
  const {AllManagers}  = useAppSelector(state=>state.manager) as unknown as {AllManagers:{Managers:Manager[]}}
  const {CreateAdmin_Teacher} = useAppSelector(state=>state.admin_teacher) as unknown as {CreateAdmin_Teacher:{status:number}}
  const [name, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [ManagerId, setManagerId] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [age, setAge] = useState('')
  const [education, setEducation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(()=>{
    if(!permation){
      redirect('/')
    }else if(permation?.role !== 'ADMIN_TEACHER'){
      redirect('/')
    }
  },[permation])
  const dispatch = useAppDispatch()
useEffect(()=>{
  dispatch(fetchGroups())
  dispatch(fetchAllManagers())
},[dispatch,gender])
const handleRegister = () => {
  if(name !== '' && gender !== ''  && email !== '' && phone !== '' && password !== ''&& ManagerId !== ''){
    if(password === confirmPassword){
    dispatch(createAdmin_Teacher({
      name,
      email,
      telephone:phone,
      password,
      gender,
      managerId:parseInt(ManagerId),
      address,
      age,
      education,
    }))
  }else {
    setPassword('')
    setConfirmPassword('')
    toast.warning('الرقم السري غير متطابق')
  }
  }else toast.warning('يرجى ملئ جميع الحقول')
}

useEffect(()=>{
if(CreateAdmin_Teacher?.status){
  if(CreateAdmin_Teacher?.status === 201){
    toast.success('تم إنشاء الحساب بنجاح')
    setUsername('')
    setGender('')
    setEmail('')
    setPhone('')
    setPassword('')
    setConfirmPassword('')
    setAddress('')
    setAge('')
    setEducation('')
    redirect('/admin-teacher/dashboard/articles')
  }else if(CreateAdmin_Teacher?.status === 400){
    toast.error('حدث خطأ في إنشاء الحساب')
  }
}
},[CreateAdmin_Teacher])

  return (
    <>
    <FullTitle F_Title={'إنشاء مشرف عام جديد'}/>
    <div className="container w-full md:w-2/3 lg:w-1/2 flex-col justify-center items-center mt-2">
      <div className="flex justify-between items-center relative gap-2 w-full ">
        <span className="text-red-600 absolute left-1 top-0">*</span>
        <h2 className="hidden md:block lg:block ">اسم المشرف العام</h2>
        <input value={name} onChange={(e)=>setUsername(e?.target?.value)} type="text" name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder="ادخل اسم المشرف العام" />
      </div>
      <div className="flex justify-between items-center relative gap-2 w-full ">
        <span className="text-red-600 absolute left-1 top-0">*</span>
        <h2 className="hidden md:block lg:block ">جنس المشرف العام</h2>
        <select value={gender} onChange={(e)=>setGender(e?.target?.value)}  name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"    >
          <option selected disabled value=""> اختر جنس المشرف العام</option>
          <option value="MALE">ذكر</option>
          <option value="FEMALE">أنثى</option>
          </select>
      </div>

      <div className="flex justify-between items-center relative gap-2 w-full ">
        <span className="text-red-600 absolute left-1 top-0">*</span>
        <h2 className="hidden md:block lg:block ">المدير</h2>
        <select value={ManagerId} disabled={gender === '' ? true : false} onChange={(e)=>setManagerId(e?.target?.value)}  name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"    >
          <option selected disabled value=""> اختر المدير</option>
            {
              AllManagers?.Managers?.length > 0 && AllManagers?.Managers?.filter(el=>el.gender == gender)?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>{item.name}</option>
                  )
              })
            }
          </select>
      </div>
      <div className="flex justify-between items-center relative gap-2 w-full ">
        <span className="text-red-600 absolute left-1 top-0">*</span>
        <h2 className="hidden md:block lg:block ">ايميل المشرف العام</h2>
        <input value={email} onChange={(e)=>setEmail(e?.target?.value)} type="email" name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder="ادخل ايميل المشرف العام" />
      </div>
      <div className="flex justify-between items-center relative gap-2 w-full ">
        <span className="text-red-600 absolute left-1 top-0">*</span>
        <h2 className="hidden md:block lg:block ">رقم هاتف المشرف العام</h2>
        <input value={phone} onChange={(e)=>setPhone(e?.target?.value)} type='tel' dir="rtl" name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder="ادخل رقم هاتف المشرف العام" />
      </div>
      <div className="flex justify-between items-center relative gap-2 w-full ">
        <span className="text-red-600 absolute left-1 top-0">*</span>
        <h2 className="hidden md:block lg:block ">الرقم السري</h2>
        <div className="flex justify-between items-center gap-2 my-1 px-2 text-gray-700 bg-white rounded w-full  md:w-2/3 lg:w-2/3 ">
        <input value={password} onChange={(e)=>setPassword(e?.target?.value)} type={showPassword === false ? 'password' :'text'} name="" id="" className="rounded px-2 my-1 border-none outline-none  caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder="الرقم السري يجب أن لا يقل عن 8 احرف" />
        {showPassword === true ?<icon.FaRegEye onClick={()=>setShowPassword(false)} className="cursor-pointer"/>:
        <icon.FaEyeSlash onClick={()=>setShowPassword(true)} className="cursor-pointer"/>}
        </div>
      </div>
      <div className="flex justify-between items-center relative gap-2 w-full ">
        <span className="text-red-600 absolute left-1 top-0">*</span>
        <h2 className="hidden md:block lg:block ">تأكيد الرقم السري   </h2>
        <div className="flex justify-between items-center gap-2 my-1 px-2 text-gray-700 bg-white rounded w-full  md:w-2/3 lg:w-2/3 ">
        <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e?.target?.value)} type={showConfirmPassword === false ? 'password' :'text'} name="" id="" className="rounded px-2 my-1 border-none outline-none  caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder="ادخل  الرقم السري مرة أخرى" />
        {showConfirmPassword === true ?<icon.FaRegEye onClick={()=>setShowConfirmPassword(false)} className="cursor-pointer"/>:
        <icon.FaEyeSlash onClick={()=>setShowConfirmPassword(true)} className="cursor-pointer"/>}
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 w-full ">
        <h2 className="hidden md:block lg:block ">  العنوان</h2>
        <input value={address} onChange={(e)=>setAddress(e?.target?.value)} type="text" name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder=" العنوان" />
      </div>
      <div className="flex justify-between items-center gap-2 w-full ">
        <h2 className="hidden md:block lg:block ">  العمر</h2>
        <input value={age} onChange={(e)=>setAge(e?.target?.value)} type="number" min={5} max={120} name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder=" العمر" />
      </div>
      <div className="flex justify-between items-center gap-2 w-full ">
        <h2 className="hidden md:block lg:block ">  التعليم</h2>
        <input value={education} onChange={(e)=>setEducation(e?.target?.value)} type="text" min={5} max={120} name="" id="" className="rounded px-2 my-1 caret-red-700 w-full  md:w-2/3 lg:w-2/3  text-gray-700"   placeholder=" التعليم" />
      </div>
    <button onClick={()=>handleRegister()} className="w-full cursor-pointer p-2 bg-orange-600 hover:bg-orange-800 rounded">إنشاء حساب جديد</button>
    </div>
    <div className="w-full flex flex-col justify-center items-center my-2">
     <p className="my-2 text-gray-300">العلامة <span className="text-red-600 ">*</span> تعنى أن الحقل مطلوب</p>
   </div>
    </>
  )
}
