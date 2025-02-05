'use client'
import { fetchAdminById } from '@/lib/Actions/AdminsActions'
import {  useAppDispatch, useAppSelector } from '@/lib/hooks'
import FullTitle from '@/Utils/FullTitle'
import FullAdminDetails from '@/Components/Admin/FullAdminDetails'
import { useParams } from 'next/navigation'
import {  useEffect } from 'react'
import { Admins } from '@prisma/client'

export default function AdminMoreInformations() {
  const {id} = useParams() as unknown as {id:string}
  const {Admin} = useAppSelector(state => state.admin) as unknown as {Admin:Admins}
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAdminById(id))
  },[id,dispatch])
  return (
        <>
        <FullTitle F_Title={Admin?.name}/>
        <FullAdminDetails Admin={Admin} />
    </>

  )
}
