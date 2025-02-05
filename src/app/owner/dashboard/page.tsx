'use client'
import BarChartPage from "@/Components/Chartes/BarChart";
import FullTitle from "@/Utils/FullTitle";
import { fetchAssinments } from "@/lib/Actions/AssinmentsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { AllAssinmentInterface, AllUserInterface } from "@/Interfaces/InterFaces";
import PieChartPage from "@/Components/Chartes/PieChart";
import { fetchAllUsers } from "@/lib/Actions/UserActions";
export default function Dashboard() {
    const {AllAssinments} = useAppSelector(state=>state.assinment) as unknown as {AllAssinments:{data:AllAssinmentInterface[]}}
    const {AllUsers} = useAppSelector(state=>state.user)  as unknown  as {AllUsers:{User:AllUserInterface[]}}
    const dispatch = useAppDispatch()
    //Get All Assinments
    useEffect(()=>{
        dispatch(fetchAssinments())
        dispatch(fetchAllUsers())
    },[dispatch])
  return (
    <section className="flex w-full justify-start flex-col items-start gap-1">
        <FullTitle F_Title="تحليل البيانات" />
            <div className="flex w-full h-[350px] flex-row gap-1">
            <BarChartPage data={AllAssinments?.data as unknown as AllAssinmentInterface[]}/>
            </div>
            <div className="flex w-full h-[350px] flex-row gap-1">
            <PieChartPage 
            male={AllUsers?.User?.filter(el=>el.gender === 'MALE') as unknown as AllUserInterface[]}
            female={AllUsers?.User?.filter(el=>el.gender === 'FEMALE') as unknown as AllUserInterface[]}
            />
            </div>
        
    
    </section>
  )
}
