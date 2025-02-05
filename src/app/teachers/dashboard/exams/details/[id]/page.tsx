'use client'
import ExamInfo from "@/Components/Exams/ExamInfo";
import { AllExamsInterface } from "@/Interfaces/InterFaces";
import { fetchExamByID } from "@/lib/Actions/ExamsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { useParams } from "next/navigation";
import { useEffect } from "react";
export default  function SubjectDetails() {
  const { Exam } = useAppSelector((state) => state.exam) as unknown as {
    Exam: { status: number; title: string; Exam: AllExamsInterface };
  };
  const {id}  = useParams() as unknown as {id:string}
    const dispatch = useAppDispatch()
    //Get A Specific Exam 
    useEffect(()=>{
      dispatch(fetchExamByID(id))
    },[dispatch, id])
    
  return (
    <>
      <FullTitle F_Title={Exam?.status !== 400 ? Exam?.title : 'درجتك في الإختبار'}/>
      {Exam?.status !== 400 &&   <ExamInfo Exam={Exam as unknown as AllExamsInterface} />
      }
    </>
  )
}
