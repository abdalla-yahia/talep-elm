'use client'
import { createGroup } from "@/lib/Actions/GroupsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateAnewGroub() {
    const {CreateGroup} = useAppSelector(state=>state.group) as unknown as {CreateGroup:{status:number}}
    const [nameOfGroub,setNameOfGroub]=useState('')
    const [descriptionOfGroub,setdescriptionoOfGroub]=useState('')
    const [genderGroup,setGenderGroup]=useState('');

    const dispatch = useAppDispatch()
    // Create group Handeller
    const CreateGroubHandeller = ()=>{
        if(nameOfGroub && descriptionOfGroub && genderGroup){
            dispatch(createGroup({
                name:nameOfGroub,
                description:descriptionOfGroub,
                gender:genderGroup
            }))
        }else toast.warning('اكمل بيانات المجموعة أولاً')
    }
    //Get Notifications Of Creating Group
    useEffect(()=>{
        if(CreateGroup?.status){
            if(CreateGroup?.status === 201){
                toast.success('تم إنشاء المجموعة بنجاح')
                setNameOfGroub('')
                setdescriptionoOfGroub('')
            }else if(CreateGroup?.status === 400){
                toast.error('حدث خطأ في إنشاء المجموعة')
            }
        }
    },[CreateGroup])
  return (
    <>
    <FullTitle F_Title={'إضافة مجموعة جديدة'} />
    <div className="flex flex-col w-full gap-2 bg-green-400 rounded">
        <div className="flex justify-start items-center w-full p-3 gap-2">
            <h3>اسم المجموعة العلمية</h3>
            <input value={nameOfGroub} onChange={(e)=>setNameOfGroub(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="اسم المجموعة العلمية"/>
        </div>
        <div className="flex justify-start items-center w-full p-3 gap-2">
            <h3>وصف المجموعة العلمية</h3>
            <input value={descriptionOfGroub} onChange={(e)=>setdescriptionoOfGroub(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="وصف المجموعة العلمية"/>
        </div>
        <div className="flex justify-start items-center w-full p-3 gap-2">
            <h3>نوع المجموعة العلمية</h3>
                <select onChange={(e)=>setGenderGroup(e.target.value)} name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none">
                    <option disabled selected value="">اختر نوع المجموعة العلمية</option>
                        <option value="MALE">رجال</option>
                        <option value="FEMALE">نساء</option>
                </select>
        </div>
            <button onClick={()=>CreateGroubHandeller()} className="w-full bg-orange-200 text-gray-700 p-3 text-2xl cursor-pointer hover:bg-orange-400 rounded">إضافة المجموعة</button>

    </div>
    </>
  )
}
