'use client'
import Exam_ResultInfo from "@/Components/Exams_Results/Exam_ResultInfo";
import { ExamResultInterface } from "@/Interfaces/InterFaces";
import { fetchExamResultByID } from "@/lib/Actions/ExamsResultsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default  function SubjectDetails() {
  const { ExamResult } = useAppSelector(
    (state) => state.examResult
  ) as unknown as {
    ExamResult: {
      status: number;
      User: { name: string };
      ExamResult: ExamResultInterface;
    };
  };

  const {id}  = useParams() as unknown as {id:string}
  const dispatch = useAppDispatch()
    //Get A Specific Exam Result 
    useEffect(()=>{
      dispatch(fetchExamResultByID(id))
    },[dispatch, id])
    
  return (
    <>
      <FullTitle F_Title={ExamResult?.User?.name} />
      {ExamResult?.status !== 400 && (
        <Exam_ResultInfo Exam_Result={ExamResult?.ExamResult} />
      )}
    </>
  );
}
