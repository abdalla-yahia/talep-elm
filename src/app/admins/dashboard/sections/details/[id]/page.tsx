'use client'
import SectionInfo from "@/Components/Sections/SectionInfo";
import { fetchSectionByID } from "@/lib/Actions/SectionsActions";
import { useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FullTitle from "@/Utils/FullTitle";
import { UnknownAction } from "redux";
import { SectionInterface } from "@/Interfaces/InterFaces";

export default  function SsectionDetails() {
  const { Section } = useAppSelector((state) => state.section) as unknown as {
    Section: { name: string , Section: SectionInterface };
  };
  const {id}  = useParams() as unknown as {id:string}
    const dispatch = useDispatch()
    //Get A Specific Section By ID
    useEffect(()=>{
      dispatch(fetchSectionByID(id) as unknown as UnknownAction)
    },[id,dispatch])
  return (
    <>
      <FullTitle F_Title={Section?.name} />
      <SectionInfo Section={Section?.Section} />
    </>
  );
}
