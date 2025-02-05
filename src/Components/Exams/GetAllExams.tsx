'use client'
import { fetchExams } from "@/lib/Actions/ExamsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import ExamMap from "./ExamsMap"
import { AllExamsInterface } from "@/Interfaces/InterFaces"

export default function GetAllExams() {

    const {AllExams} = useAppSelector(state  => state.exam)as unknown as {AllExams:{data:AllExamsInterface[]}}
    const {UpdatedExam} = useAppSelector(state=>state.exam)
    const {DeletedExam} = useAppSelector(state=>state.exam)
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchExams())
    },[dispatch,UpdatedExam,DeletedExam])
    const Exams = AllExams?.data
  return (
    <>
    <ExamMap Exams ={Exams}/>
    </>
  )
}
