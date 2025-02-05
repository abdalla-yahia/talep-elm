'use client'
import { useEffect } from 'react'
import FullTitle from "@/Utils/FullTitle";
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import Admin_TeacherInformationCardPage from "@/Components/Admin-Teacher/Admin_TeacherInformationCard";
import { fetchAllAdmins_Teachers } from '@/lib/Actions/Admins_TeachersActions';
import { AdminTeacher } from '@prisma/client';

export default function Admin_Teachers() {
  const {AllAdmins_Teachers}  = useAppSelector(state  => state.admin_teacher) as unknown as {AllAdmins_Teachers:{data:AdminTeacher[]}}
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAllAdmins_Teachers())
  },[dispatch])
  return (
    <>
    <FullTitle F_Title={'القادة على المجموعات'}/>
    <Admin_TeacherInformationCardPage Customer={AllAdmins_Teachers?.data} />
    </>
  )
}
