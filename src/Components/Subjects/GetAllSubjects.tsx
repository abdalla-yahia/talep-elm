'use client'
import { fetchSubjects } from "@/lib/Actions/SubjectsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import SubjectsMap from "./SubjectsMap"
import { SubjectsInterface } from "@/Interfaces/InterFaces"

export default function GetAllSubjects() {

    const {AllSubjects} = useAppSelector(state  => state.subject) as unknown as {AllSubjects:{Subjects:SubjectsInterface[]}}
    const {UpdateSubject} = useAppSelector(state=>state.subject)
    const {DeleteSubject} = useAppSelector(state=>state.subject)
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchSubjects())
    },[UpdateSubject,DeleteSubject,dispatch])
    const subjects = AllSubjects?.Subjects
  return (
    <>
    <SubjectsMap subjects ={subjects}/>
    </>
  )
}
