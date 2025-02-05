'use client'
import { fetchSections } from "@/lib/Actions/SectionsActions";
import { createSubject } from "@/lib/Actions/SubjectsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { Sections } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateAnewSubject() {
    const [nameOfSubject,setNameOfSubject]=useState('')
    const [infoOfSubject,setInfoOfSubject]=useState('')
    const [SectionId,setSectionId]=useState('')
    const {AllSections} = useAppSelector(state=>state.section) as unknown as {AllSections:{sections:Sections[]}}
    const {CreateSubject} = useAppSelector(state=>state.subject) as unknown as {CreateSubject:{status:number}}
    const dispatch = useAppDispatch()
    
    //Get All Sections
    useEffect(()=>{
        dispatch(fetchSections())
    },[dispatch])
    //Create a New Subject Handeller
    const CreateSubjectHandeller = ()=>{
        if(nameOfSubject && infoOfSubject && SectionId ){
            dispatch(createSubject({
                name:nameOfSubject,
                info:infoOfSubject,
                sectionId:parseInt(SectionId)
            }))
            
        }else toast.warning('اكمل بيانات المادة أولاً')
    }
    //Get Notifications Of Creator If Subject Is Created Successfully
    useEffect(()=>{
        if(CreateSubject?.status){
            if(CreateSubject?.status === 201){
                toast.success('تم إنشاء المادة بنجاح')
            setNameOfSubject('')
            setInfoOfSubject('')
            }else if (CreateSubject?.status === 400){
                toast.error('حدث خطأ في إنشاء المادة')
            }
        }
    },[CreateSubject])
  return (
    <>
    <FullTitle F_Title={'إضافة مادة جديدة'} />
    <div className="flex flex-col w-full gap-2 bg-fuchsia-500 rounded">
        <div className="flex justify-start items-center w-full p-3 gap-2">
            <h3>اسم المادة العلمية</h3>
            <input value={nameOfSubject} onChange={(e)=>setNameOfSubject(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="اسم المادة العلمية"/>
        </div>
        <div className="flex justify-start items-center w-full p-3 gap-2">
            <h3>وصف المادة العلمية</h3>
            <input value={infoOfSubject} onChange={(e)=>setInfoOfSubject(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="وصف المادة العلمية"/>
        </div>
        <div className="flex justify-start items-center w-full p-3 gap-2">
            <h3>القسم التابع له المادة العلمية</h3>
            <select defaultValue={infoOfSubject} onChange={(e)=>setSectionId(e.target.value)}  name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" >
                <option selected disabled value="">اختر القسم </option>
                {
                    AllSections?.sections && AllSections?.sections?.map((item,index)=>
                    <option key={index} value={item.id}>{item.name}</option>
                    )
                }
                 </select>
        </div>
            <button onClick={()=>CreateSubjectHandeller()} className="w-full bg-blue-300 text-gray-700 p-3 text-2xl cursor-pointer hover:bg-blue-400 rounded">إضافة المادة</button>

    </div>
    </>
  )
}
