
import { ExamResultInterface } from "@/Interfaces/InterFaces";
import ExamResultTable from "./Exam_ResultTable";

export default  function Exam_ResultInfo({Exam_Result}:{Exam_Result:ExamResultInterface}) {
return (
    <>
    {
      Exam_Result &&
      <>
      <div className="w-full   flex items-start justify-center">
        <div className="flex gap-3 flex-col md:flex-row lg:flex-row justify-center items-center font-bold text-2xl">
        <h1 className="text-red-600">درجة <span className="text-blue-200">{Exam_Result?.User?.name}</span> فى هذا الإختبار : </h1>
        <h2 className="text-blue-600  ">{Exam_Result?.score} 
          <span className="text-gray-600">درجة</span>      
          </h2> 

        </div>
      </div>
      { <ExamResultTable sorce={Exam_Result}/>}
      </>
    }
    </>
  )
}
