'use client'
import FullManagerDetails from '@/Components/Manager/FullManagerDetails'
import { fetchManagerById } from '@/lib/Actions/ManagersActions'
import {  useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useParams } from 'next/navigation'
import {  useEffect } from 'react'
import FullTitle from '@/Utils/FullTitle'
import { Manager } from '@prisma/client'

export default function ManagerMoreInformations() {
  const {Manager} = useAppSelector(state  => state.manager) as unknown as {Manager:Manager}
  const {id} = useParams() as unknown as {id:string}
  const dispatch = useAppDispatch()
  //Get A Specific Manager
  useEffect(()=>{
    dispatch(fetchManagerById(id))
  },[dispatch,id])
  return (
    <>
      <FullTitle F_Title={Manager?.name}/>
      <FullManagerDetails Manager={Manager} />
    </>

  )
}
