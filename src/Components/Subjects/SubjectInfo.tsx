import { SubjectsInterface } from "@/Interfaces/InterFaces";
import Link from "next/link";

export default function SubjectInfo({Subject}:{Subject:SubjectsInterface}) {
  return (
    <>
     <div>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">معلومات عن المادة: 
        <p className="font-bold text-red-500">{Subject?.info} </p>
        </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">الطلاب المشتركين في المادة:
         <p className="font-bold text-slate-500">{Subject?.User?.length} طالب/طالبة</p>
         </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> دروس المادة:
        <p className="font-bold text-orange-700"> {Subject?.Lessons?.map((e,i:number)=><Link key={i} className="font-bold  hover:text-red-600 " href={`../../lessons/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> مدرسين المادة: 
        <p className="font-bold text-green-800">{Subject?.Teachers?.map((e,i:number)=><Link key={i} className="font-bold" href={`../../teachers/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> امتحانات المادة: 
        <p className="font-bold text-blue-500">{Subject?.Exam?.map((e,i:number)=><Link key={i} className="font-bold" href={`../../exams/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> تكليفات المادة: 
        <p className="font-bold text-orange-500">{Subject?.Assinments?.map((e,i:number)=><Link key={i} className="font-bold" href={`../../lessons/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> نتائج تكليفات المادة: 
        <p className="font-bold text-purple-500">{Subject?.AssinmentsResult?.map((e,i:number)=><Link key={i} className="font-bold text-green-700" href={`../../lessons/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> نتائج امتحانات المادة:
        <p className="font-bold text-fuchsia-500"> {Subject?.ExamResults?.map((e,i:number)=><Link key={i} className="font-bold text-green-700" href={`../../lessons/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>
    </div>
    </>
  )
}
