'use client'
import FullUserDetails from '@/Components/User/FullUserDetails'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchUserById } from '@/lib/Actions/UserActions'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import FullTitle from '@/Utils/FullTitle'
import { AllUserInterface } from '@/Interfaces/InterFaces'

export default function UserMoreInformations() {
  const {user} = useAppSelector(state => state.user) as unknown as {user:{user:AllUserInterface}}
  const {id} = useParams() as unknown as {id:string}
  const dispatch = useAppDispatch()
  //Get A Specific User By Id
  useEffect(()=>{
    dispatch(fetchUserById(id))
  },[dispatch,id])
  return (
      <>
        <FullTitle F_Title={user?.user?.name}/>
        <FullUserDetails user={user?.user} />
      </>
  )
}
