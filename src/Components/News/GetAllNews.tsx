'use client'
import { createNews, fetchNews } from "@/lib/Actions/NewsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect, useState } from "react"
import NewssMap from "./NewsMap"
import { toast } from "react-toastify"
import { CreateNewsInterface, LogedUserInterface } from "@/Interfaces/InterFaces"
import { News } from "@prisma/client"

export default function GetAllNews() {
  const { UserLogedData } = useAppSelector(state => state.user) as unknown as { UserLogedData: LogedUserInterface }
  const { AllNews } = useAppSelector(state => state.news) as unknown as { AllNews: { News: CreateNewsInterface[] } }
  const { News } = useAppSelector(state => state.news) as unknown as { News: News }
  const { CreateNews } = useAppSelector(state => state.news) as unknown as { CreateNews: { status: number } }
  const { UpdateNews } = useAppSelector(state => state.news) as unknown as { UpdateNews: { status: number } }
  const { DeleteNews } = useAppSelector(state => state.news) as unknown as { DeleteNews: { status: number } }
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()

  const CreateNewsHandeller = () => {
    if (content !== '') {

      dispatch(createNews({
        content,
        author: { id: UserLogedData?.id, name: UserLogedData?.name, image: UserLogedData?.image }
      }))
    } else toast.warning('أكتب محتوي الخبر أولاً')
  }
  useEffect(() => {
    if (CreateNews?.status) {
      if (CreateNews?.status === 201) {
        toast.success('تم إنشاء الخبر بنجاح')
        setContent('')
      } else if (CreateNews?.status === 400) {
        toast.error('حدث خطأ في إنشاء الخبر')
      }
    }
  }, [CreateNews])
  useEffect(() => {
    dispatch(fetchNews())
  }, [News, dispatch, UpdateNews, DeleteNews, CreateNews])
  const news = AllNews?.News;
  return (
    <>
      <h2 className="text-2xl text-gray-700 font-bold w-full flex justify-center items-center">إنشاء خبر جديد </h2>
      <div className="flex text-gray-800 justify-center flex-col gap-2 items-center w-full">
        <input value={content} onChange={(e) => setContent(e.target.value)} type="text" name="" id="" className="rounded px-2" placeholder="ادخل محتوى الخبر" />
        <button onClick={() => CreateNewsHandeller()} className="p-2 rounded bg-gray-600 text-text_color">حفظ الخبر</button>
      </div>
      <NewssMap News={news} />
    </>
  )
}
