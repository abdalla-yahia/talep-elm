'use client'
import { GroupInterface } from "@/Interfaces/InterFaces";
import DateConvert from "@/Utils/Date";
import Link from "next/link";


export default function GroupInfo({Group}:{Group: GroupInterface}) {
  // const [query,setQuery]=useState('')


  return (
    <>
     <div className={`${Group?.gender === 'MALE'?'bg-slate-300':'bg-blue-200'} w-full p-2 rounded`}>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">معلومات عن المجموعة: 
        <p className="font-bold text-red-500">{Group?.description} </p>
        </h2>
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">نوع المجموعة: 
        <p className="font-bold text-blue-500">{Group?.gender === 'MALE'?'رجال':'نساء'} </p>
        </h2>
        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> مدرسين المجموعة: 
        <p className="font-bold text-green-800">{Group?.Teachers?.map((e ,i:number)=><Link key={i} className="font-bold" href={`../../teachers/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>

      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> مشرفين المجموعة: 
        <p className="font-bold text-green-800">{Group?.Admins?.map((e ,i:number)=><Link key={i} className="font-bold" href={`../../admins/details/${e.id}`}>{e.name} , </Link>)} </p>
        </h2>

      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> تاريخ إنشاء المجموعة: 
        <p className="font-bold text-fuchsia-800">{DateConvert(Group?.createdAt)} </p>
        </h2>
      
      <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">الطلاب المشتركين في المجموعة:
         <p className="font-bold text-slate-500">{Group?.User?.length} {Group?.gender === 'MALE'?'طالب':'طالبة'}</p>
         </h2>
    </div>

    </>
  )
}
