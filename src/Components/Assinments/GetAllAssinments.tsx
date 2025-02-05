'use client'
import { fetchAssinments } from "@/lib/Actions/AssinmentsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import AssinmentMap from "./AssinmentsMap"
import { AllAssinmentInterface } from "@/Interfaces/InterFaces"

export default function GetAllAssinments() {

    const {AllAssinments}    = useAppSelector(state=>state.assinment) as unknown as {AllAssinments:{data:AllAssinmentInterface[]}}
    const {UpdatedAssinment} = useAppSelector(state=>state.assinment)
    const {DeletedAssinment} = useAppSelector(state=>state.assinment)
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchAssinments())
    },[dispatch,UpdatedAssinment,DeletedAssinment])
    const assinments = AllAssinments?.data
  return (
    <>
    <AssinmentMap assinments ={assinments}/>
    </>
  )
}
