'use client'
import { fetchSections } from "@/lib/Actions/SectionsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import SectionsMap from "./SectionsMap"
import { SectionInterface } from "@/Interfaces/InterFaces"

export default function GetAllSections() {

    const {AllSections} = useAppSelector(state=> state.section) as unknown as {AllSections:{sections:SectionInterface[]}}
    const {DeleteSection} = useAppSelector(state=>state.section)
    const {UpdateSection} = useAppSelector(state=>state.section)   
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchSections())
    },[DeleteSection,UpdateSection,dispatch])
    const Sections = AllSections?.sections
  return (
    <>
    <SectionsMap Sections ={Sections}/>
    </>
  )
}
