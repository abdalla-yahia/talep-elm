'use client'
import ExamInfo from "@/Components/Exams/ExamInfo";
import ExamResultTable from "@/Components/Exams/ExamResultTable";
import { AllExamsInterface, ExamResultInterface } from "@/Interfaces/InterFaces";
import { fetchExamByID } from "@/lib/Actions/ExamsActions";
import { fetchExamResultByID } from "@/lib/Actions/ExamsResultsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { useParams } from "next/navigation";
import { useEffect } from "react";
export default  function SubjectDetails() {
  const { Exam } = useAppSelector((state) => state.exam) as unknown as {
    Exam: { status: number; title: string; Exam: AllExamsInterface };
  };
      const {ExamResult} = useAppSelector((state ) => state.examResult) as unknown as {ExamResult:ExamResultInterface
        
      }
  
  const {id}  = useParams() as unknown as {id:string}
    const dispatch = useAppDispatch()
    //Get A Specific Exam 
    useEffect(()=>{
      dispatch(fetchExamByID(id))
    },[dispatch, id])
      useEffect(() => {
        dispatch(fetchExamResultByID(id as unknown as string));
      }, [dispatch, id]);
  return (
    <>
      <FullTitle
        F_Title={Exam?.status !== 400 ? Exam?.title : "درجتك في الإختبار"}
      />
      {Exam?.status !== 400 ? (
        <ExamInfo Exam={Exam as unknown as AllExamsInterface} />):
        (<ExamResultTable Exam={Exam as unknown as AllExamsInterface} ExamResult={ExamResult as ExamResultInterface} />
      )}
    </>
  );
}
