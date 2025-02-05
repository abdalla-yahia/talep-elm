'use client'
import AssinmentInfo from "@/Components/Assinments/AssinmentInfo";
import { fetchAssinmentByID } from "@/lib/Actions/AssinmentsActions";
import { useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FullTitle from "@/Utils/FullTitle";
import { UnknownAction } from "redux";
import { AllAssinmentInterface, AssinmentResultInterface } from "@/Interfaces/InterFaces";
import AssinmentResultTable from "@/Components/Assinments/AssinmentResultTable";
import { fetchAssinmentResultByID } from "@/lib/Actions/AssinmentsResultsActions";

export default function SubjectDetails() {
        const { AssinmentResult } = useAppSelector(
          (state) => state.assinmentResult
        ) as unknown as { AssinmentResult: AssinmentResultInterface };

  const { Assinment } = useAppSelector(
    (state) => state.assinment
  ) as unknown as {
    Assinment: {
      status: number;
      name: string;
      Assinment: AllAssinmentInterface;
    };
  };
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch();
  //Get A Specific Assinment
  useEffect(() => {
    dispatch(fetchAssinmentByID(id) as unknown as UnknownAction);
  }, [dispatch, id]);
  //Get the Assignment Result By ID
  useEffect(() => {
    dispatch(fetchAssinmentResultByID(id) as unknown as UnknownAction);
  }, [dispatch, id]);
  return (
    <>
      <FullTitle
        F_Title={
          Assinment?.status !== 400 ? Assinment?.name : "درجتك في التكليف"
        }
      />
      {Assinment?.status !== 400 ? (
        <AssinmentInfo
          Assinment={Assinment as unknown as AllAssinmentInterface}
        />
      ) : (
        <AssinmentResultTable AssinmentResult={AssinmentResult} Assinment={Assinment as unknown as AllAssinmentInterface} />
      )}
    </>
  );
}
