'use client'
import Link from "next/link";
import LessonHook from "./LessonHook";
import FullTitle from "@/Utils/FullTitle";
import CommentPage from "../Comments/CommentPage";
import LessonContent from "./LessonContent";
import { CreateComment } from "@/Interfaces/InterFaces";

export default function LessonInfo({ id }: { id: number }) {
  const { comment, setComment, Lesson, CreateCommentHandeller, UserLogedData } = LessonHook({ id });

  return (
    <>
      <FullTitle F_Title={Lesson.name} />
      <div className="w-full">
        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">معلومات عن الدرس:
          <p className="font-bold text-accent_color">{Lesson.description}  </p>
        </h2>

        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> المادة التابع لها الدرس:
          <p className="font-bold text-orange-700">{Lesson?.Subjects?.name} </p>
        </h2>

        <h2 className="text-center flex flex-col  gap-2 text-2xl my-3 font-bold text-gray-900">  محتوى الدرس:
          <LessonContent id={Lesson?.name} src={Lesson?.body as unknown as { linkVideo: string; fileName: string[]; body: string; }} title={Lesson?.name} date={Lesson?.createdAt} number={Lesson?.name} desc={Lesson?.description} />
        </h2>
        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> مدرسين الدرس:
          <p className="font-bold text-green-800">{Lesson?.teacher?.name} </p>
        </h2>

        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> تكليفات الدرس:
          <p className="font-bold text-orange-700">{Lesson?.Assinments?.map((e, i: number) => <Link key={i} className="font-bold" href={`../../assinments/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>

        <div className="text-2xl relative text-red-700 w-full p-2 my-2 font-bold shadow-sm rounded">  تعليقات على الدرس:
          {UserLogedData?.role !== 'OWNER' ?
            (Lesson?.comments?.filter(el => (el?.User?.gender || el?.Teacher?.gender || el?.Admin?.gender || el?.AdminTeacher?.gender || el?.Manager?.gender) === (UserLogedData?.gender) || el?.Owner).map((e, i) => <CommentPage key={i} e={e as unknown as CreateComment} id={id} />)) :
            (Lesson?.comments?.map((e, i) => <CommentPage key={i} e={e as unknown as CreateComment} id={id} />))
          } </div>

        <div className="flex w-full flex-col ">
          <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="أضف تعليق على الدرس" className="w-full p-2 rounded text-slate-700" />
          <button onClick={() => CreateCommentHandeller()} className="bg-blue-300 cursor-pointer text-gray-600 font-bold mt-2 px-4 py-2 self-end rounded">أضف تعليق</button>
        </div>

      </div>
    </>
  )
}
