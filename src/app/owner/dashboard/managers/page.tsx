'use client'
import ManagerInformationCardPage from "@/Components/Manager/ManagerInformationCard";
import { fetchAllManagers } from '@/lib/Actions/ManagersActions';
import { useAppSelector, useAppDispatch} from '@/lib/hooks'
import { useEffect } from 'react'
import FullTitle from "@/Utils/FullTitle";
import { Manager } from "@prisma/client";

export default function Managers() {
  const {AllManagers}  = useAppSelector(state  => state.manager) as unknown as {AllManagers:{Managers:Manager[]}}
  const dispatch = useAppDispatch()
  //Get All Managers
  useEffect(()=>{
    dispatch(fetchAllManagers())
  },[dispatch])
  return (
    <>
    <FullTitle F_Title={'المديرين في الموقع'}/>
    <ManagerInformationCardPage Customer={AllManagers?.Managers} />
    </>
  )
}
