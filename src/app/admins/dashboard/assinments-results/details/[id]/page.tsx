'use client'
import Assinment_ResultInfo from "@/Components/Assinments_Results/Assinment_ResultInfo";
import { AssinmentResultInterface } from "@/Interfaces/InterFaces";
import { fetchAssinmentResultByID } from "@/lib/Actions/AssinmentsResultsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default  function SubjectDetails() {
  const { AssinmentResult } = useAppSelector(
    (state) => state.assinmentResult
  ) as unknown as {
    AssinmentResult: {
      status: number;
      User: { name: string };
      AssinmentResult:AssinmentResultInterface;
    };
  };
  const {id}  = useParams() as unknown as {id:string}
  const dispatch = useAppDispatch()
    //Get A Specific Assinment Result 
    useEffect(()=>{
      dispatch(fetchAssinmentResultByID(id))
    },[dispatch, id])
    
  return (
    <>
      <FullTitle F_Title={AssinmentResult?.User?.name} />
      {AssinmentResult?.status !== 400 && (
        <Assinment_ResultInfo
          Assinment_Result={
            AssinmentResult as unknown as AssinmentResultInterface
          }
        />
      )}
    </>
  );
}
