import { LogedUserInterface } from "@/Interfaces/InterFaces"
import { createPost } from "@/lib/Actions/PostsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function CreatePost() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface}
    const {CreatePost} = useAppSelector(state=>state.post) as unknown as {CreatePost:{status:number}}
    const [toggle,setToggle]= useState(false)
    const [title,setTitle]= useState('')
    const [content,setContent]= useState('')
    const [body,setBody]= useState({src:''})
    const dispatch = useAppDispatch();

    const CreatePostHandeller = ()=>{
        dispatch(createPost({
            title,
            content,
            body:body,
            author:{id:parseInt(UserLogedData?.id),name:UserLogedData?.name,image:UserLogedData?.image}}))
    }
    useEffect(()=>{
        if(CreatePost.status){
            if(CreatePost?.status === 201){
                toast.success('تم إنشاء البوست بنجاح')
                setToggle(false)
            }else if(CreatePost?.status === 400){
                toast.error('حدث خطأ في إنشاء البوست')
            }
        }
    },[CreatePost])
  return (
      <>
              
        {!toggle && UserLogedData?.role  as React.ReactNode && UserLogedData?.role === 'OWNER' && <button onClick={()=>setToggle(!toggle)} className="hover:text-blue-600 my-1 bg-[#01403c] text-white w-full px-3 rounded cursor-pointer">إنشاء منشور</button> }
       {toggle &&  <div className="container text-gray-700 w-full flex flex-col justify-center items-center">
        <div className="w-full flex gap-2 mb-2  justify-center items-center">
            <h3 className="flex text-gray-200">عنوان المنشور : </h3>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="" id="" className="rounded px-2" placeholder="ادخل عنوان المنشور"/>
        </div>
        <div className="w-full flex gap-2 mb-2  justify-center items-center">
            <h3 className="flex text-blue-400">محتوي المنشور :</h3>
            <input value={content} onChange={(e)=>setContent(e.target.value)} type="text" name="" id="" className="rounded px-2" placeholder="ادخل محتوي المنشور"/>
        </div>
        <div className="w-full flex gap-2 mb-2  justify-center items-center">
            <h3 className="flex text-red-500"> رابط الفيديو :</h3>
            <input  onChange={(e)=>setBody({src:e.target.value})} type="text" name="" id="" className="rounded px-2" placeholder="ادخل رابط فيديو المنشور"/>
        </div>
        <button onClick={()=>CreatePostHandeller()} className="p-2 rounded text-white hover:bg-blue-700 bg-blue-500 cursor-pointer">إنشاء المنشور</button>
        </div>}
    </>
    
  )
}
