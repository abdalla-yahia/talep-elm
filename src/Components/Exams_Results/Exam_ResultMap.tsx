import { AllExamsInterface } from "@/Interfaces/InterFaces";
import { fetchExams } from "@/lib/Actions/ExamsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function Exam_ResultMap() {
  const {AllExams}  = useAppSelector(state=>state.exam) as unknown as {AllExams: {data:AllExamsInterface[]}}
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchExams())
  },[dispatch])

  return (
    <>

    <div className="w-full flex flex-col gap-2 p-2">
      <div className="table ">
        <div className="table-row-group bg-slate-300 text-gray-700">
          <span className="table-cell text-center border-1 border-blue-500">مسلسل</span>
          <span className="table-cell text-center border-1 border-blue-500">الإختبار</span>
          <span className="table-cell text-center border-1 border-blue-500">المادة</span>
          <span className="table-cell text-center border-1 border-blue-500">عدد الطلاب</span>
          <span className="table-cell text-center border-1 border-blue-500">نسبة النجاح</span>
        </div>
        {
        AllExams?.data?.length > 0 && AllExams?.data?.map((Exam, index:number) => 

          <div key={index} className={`${index % 2 === 0 ? 'bg-yellow-100 text-blue-800' :'bg-blue-100 text-red-600'} table-row-group text-red-800`}>
          <span className="table-cell text-center border-1 border-blue-500">{index + 1}</span>
          <span className="table-cell text-center border-1 border-blue-500"><Link className="border-none bg-transparent hover:text-blue-500  transition-all" href={`./exams/info/${Exam?.id}`}>{Exam?.title}</Link></span>
          <span className="table-cell text-center border-1 border-blue-500"><Link className="border-none bg-transparent hover:text-blue-500  transition-all" href={`./subjects/details/${Exam?.Subjects?.id}`}>{Exam?.Subjects?.name} </Link></span>
          <span className="table-cell text-center border-1 border-blue-500">{Exam?.ExamResult?.length} </span>
          <span className="table-cell text-center border-1 border-blue-500"> {((Exam?.ExamResult as unknown as AllExamsInterface[])?.filter(el=>el.score as unknown as number >= ((Exam?.Exambody?.questions as unknown as AllExamsInterface[])?.map((fir)=>+fir?.degree).reduce((arc,curr)=>arc+curr) * 0.75) ).length / (Exam?.ExamResult as unknown as AllExamsInterface[])?.length * 100).toFixed(2)} %</span>
        {
          
        }
       
        </div>
        )}
      </div>
    </div>
    </>
  )
}
