'use client'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import { fetchAllLesson } from "@/lib/Actions/LessonsActions"
import LessonsMap from "./LessonsMap"
import { AllLessonsInterFace } from "@/Interfaces/InterFaces"

export default function GetAllLessons() {

    const {Lessons} = useAppSelector(state=> state.lesson) as unknown as {Lessons: {data: AllLessonsInterFace[]}}
    const {UpdateLesson}= useAppSelector(state=>state.lesson)
    const {DeleteLesson}= useAppSelector(state=>state.lesson)
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchAllLesson())
    },[UpdateLesson,DeleteLesson,dispatch])
    const lessons = Lessons?.data
  return (
    <>
    <LessonsMap lessons ={lessons}/>
    </>
  )
}
