'use client'
import FullTeacherDetails from '@/Components/Teacher/FullTeacherDetails'
import { fetchTeacherById } from '@/lib/Actions/TeachersActions'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import FullTitle from '@/Utils/FullTitle'
import { Teachers } from '@prisma/client'

export default function TeacherMoreInformations() {
  const {Teacher} = useAppSelector(state => state.teacher) as unknown as {Teacher:{Teacher:Teachers}}
  const {id} = useParams() as unknown as {id:string}
  const dispatch = useAppDispatch()
  //Get A Specific Teacher By Id
  useEffect(()=>{
    dispatch(fetchTeacherById(id))
  },[dispatch,id])
  return (
        <>
        <FullTitle F_Title={Teacher?.Teacher?.name}/>
        <FullTeacherDetails Teacher={Teacher?.Teacher} />
    </>

  )
}
