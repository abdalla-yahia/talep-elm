'use client'
import {  useAppDispatch, useAppSelector } from '@/lib/hooks'
import FullTitle from '@/Utils/FullTitle'
import FullAdmin_TeacherDetails from '@/Components/Admin-Teacher/FullAdmin_TeacherDetails'
import { useParams } from 'next/navigation'
import {  useEffect } from 'react'
import { fetchAdmin_TeacherById } from '@/lib/Actions/Admins_TeachersActions'
import { AdminTeacher } from '@prisma/client'

export default function Admin_TeacherMoreInformations() {
  const {id} = useParams() as unknown as {id:string}
  const {Admin_Teacher} = useAppSelector(state  => state.admin_teacher) as unknown as {Admin_Teacher:AdminTeacher}
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAdmin_TeacherById(id))
  },[dispatch,id])
  return (
        <>
        <FullTitle F_Title={Admin_Teacher?.name}/>
        <FullAdmin_TeacherDetails Admin_Teacher={Admin_Teacher} />
    </>

  )
}
