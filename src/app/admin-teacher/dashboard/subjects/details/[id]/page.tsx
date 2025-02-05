'use client'
import SubjectInfo from "@/Components/Subjects/SubjectInfo";
import { fetchSubjectByID } from "@/lib/Actions/SubjectsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import FullTitle from "@/Utils/FullTitle";
import { useParams } from "next/navigation";
import { SubjectsInterface } from "@/Interfaces/InterFaces";

export default  function SubjectDetails() {
  const { Subject } = useAppSelector((state) => state.subject) as unknown as {
    Subject: { name: string; Subject: SubjectsInterface };
  };
  const {id}  = useParams() as unknown as {id:string}
  const dispatch = useAppDispatch()
  //Get subject by id
  useEffect(()=>{
    dispatch(fetchSubjectByID(id))
  },[id,dispatch])
  return (
    <>
      <FullTitle F_Title={Subject.name}/>
      <SubjectInfo Subject={Subject?.Subject} />
    </>
  )
}
