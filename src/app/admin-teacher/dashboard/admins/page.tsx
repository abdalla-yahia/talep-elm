'use client'
import { useEffect } from 'react'
import FullTitle from "@/Utils/FullTitle";
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import AdminInformationCardPage from "@/Components/Admin/AdminInformationCard";
import { fetchAllAdmins } from '@/lib/Actions/AdminsActions';
import { Admins } from '@prisma/client';

export default function AdminsPage() {
  const {AllAdmins}  = useAppSelector(state  => state.admin) as unknown as {AllAdmins:{Admins:Admins[]}}
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchAllAdmins())
  },[dispatch])
  return (
    <>
    <FullTitle F_Title={'المشرفين على المجموعات'}/>
    <AdminInformationCardPage Customer={AllAdmins?.Admins} />
    </>
  )
}
