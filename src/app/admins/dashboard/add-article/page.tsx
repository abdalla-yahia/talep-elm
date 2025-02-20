'use client'
import { createArticle } from "@/lib/Actions/ArticlesActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateAnewArticle() {
    const { CreateArticle } = useAppSelector(state => state.article) as unknown as { CreateArticle: { status: number } }
    const [nameOfArticle, setNameOfArticle] = useState('')
    const [DescriptionOfArticle, setDescriptionOfArticle] = useState('')
    const [Access, setAccess] = useState('')

    const dispatch = useAppDispatch()
    //Create Article Handeller
    const CreateArticleHandeller = () => {
        if (nameOfArticle !== '' && DescriptionOfArticle !== '' && Access !== '') {
            dispatch(createArticle({
                title: nameOfArticle,
                content: DescriptionOfArticle,
                access: Access,
            }))

        } else toast.warning('اكمل بيانات المقال أولاً')
    }
    //Get Notification Of Create Article
    useEffect(() => {
        if (CreateArticle?.status) {
            if (CreateArticle?.status === 201) {
                toast.success('تم إنشاء المقال بنجاح')
                setNameOfArticle('')
                setDescriptionOfArticle('')
                setAccess('')
            } else if (CreateArticle?.status === 400) {
                toast.error('حدث خطأ أثناء إنشاء المقال')
            }
        }
    }, [CreateArticle])
    return (
        <>
            <FullTitle F_Title={'إضافة مقال جديد'} />
            <div className="flex flex-col w-full gap-2 bg-secondary_color0 rounded">
                <div className="flex justify-start items-center w-full p-3 gap-2">
                    <h3>اسم المقال </h3>
                    <input value={nameOfArticle} onChange={(e) => setNameOfArticle(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="اسم المقال العلمي" />
                </div>
                <div className="flex justify-start items-center w-full p-3 gap-2">
                    <h3>محتوى المقال </h3>
                    <input value={DescriptionOfArticle} onChange={(e) => setDescriptionOfArticle(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="محتوى المقال العلمي" />
                </div>
                <div className="flex justify-start items-center w-full p-3 gap-2">
                    <h3>نوع المقال </h3>
                    <select value={Access} onChange={(e) => setAccess(e.target.value)} name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" >
                        <option selected disabled value="">اختر نوع المقال </option>
                        <option value="public">عام</option>
                        <option value="privite">خاص</option>
                    </select>
                </div>
                <button onClick={() => CreateArticleHandeller()} className="w-full bg-blue-300 text-gray-700 p-3 text-2xl cursor-pointer hover:bg-blue-400 rounded">إضافة المقال</button>
            </div>
        </>
    )
}
