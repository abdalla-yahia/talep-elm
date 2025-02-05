'use client'
import GetAllArticles from "@/Components/Articles/GetAllArticles";
import FullTitle from "@/Utils/FullTitle";
import { useState } from "react";

export default function ArticlesPage() {
  const [SearchText,setSearchText] = useState('')
  return (
    <>
    <FullTitle F_Title={'مقالات الشيخ الدكتور خالد منصور '}/>
    <input onChange={(e)=>setSearchText(e.target.value)} type="search" name="" id="" className="w-full bg-orange-200 text-black rounded my-1 p-1" placeholder="بحث عن عنوان مقالة ...."/>
    <GetAllArticles SearchText={SearchText}/>
    </>
  )
}
