'use client'
import LessonInfo from "@/Components/Lessons/LessonInfo";
import { useParams } from "next/navigation";

export default  function LessonDetails() {
  const {id} = useParams() as unknown as {id:string};
  return(
    <>
    <LessonInfo id={id as unknown as number}/>
    </>
    
  )
}