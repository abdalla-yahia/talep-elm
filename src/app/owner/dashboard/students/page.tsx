'use client'
import {fetchAllUsers, fetchAllUsersWithQuery} from '@/lib/Actions/UserActions'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import AllUsersTabel from '@/Components/User/AllUsersTabel';
import Pagination from '@/Components/User/Pagination';
import FullTitle from "@/Utils/FullTitle";
import { User } from '@prisma/client';
import { AllUserInterface } from '@/Interfaces/InterFaces';
import TopUsersTabel from '@/Components/User/TopStudents';

export default function UserStudents() {
  const {AllUsersByPage} = useAppSelector(state  => state.user) as unknown as {AllUsersByPage:{User:User[]}}
  const {UpdateUser} = useAppSelector(state  => state.user) as unknown as {UpdateUser:{status:number}}
  const {DeleteUser} = useAppSelector(state  => state.user) as unknown as {DeleteUser:{status:number}}
  const {AllUsers} = useAppSelector(state  => state.user) as unknown as {AllUsers:{User:User[],pageCount:number}}
  const [query,setQuery]=useState('')
  const dispatch = useAppDispatch()
  //Get All Users When Send Query Within Url
  useEffect(()=>{
    dispatch(fetchAllUsersWithQuery(query))
  },[dispatch,query,UpdateUser,DeleteUser])
  //Get All Users When Page Change
  useEffect(()=>{
    dispatch(fetchAllUsers())
  },[dispatch,UpdateUser,DeleteUser])
  //Count All Users [Male & Female]
  const MALEUSERS = AllUsers?.User?.filter(e=>e?.gender === 'MALE')?.length
  const FEMALEUSERS = AllUsers?.User?.filter(e=>e?.gender === 'FEMALE')?.length;
  return (
    <>
    <FullTitle F_Title={'جدول الطلاب المشتركين'}/>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="w-full flex justify-center items-center text-gray-700 my-2">
              <h3 className="card-title ">عدد الطلاب الرجال :</h3>
              <h4 className="card-body text-red-500">{MALEUSERS} طالب</h4>
              <h1 className="card-title"> إجمالي  عدد الطلاب :  </h1>
              <h1 className="card-body text-blue-500"> { AllUsers?.User?.length} طالب / طالبة</h1>
              <h3 className="card-title">عدد الطالبات الإناث  : </h3>
              <h4 className="card-tools text-fuchsia-600">{FEMALEUSERS} طالبة</h4>
          </div>
          <div className="card">
            <div className="card-header">
              <input type="text" className="form-control" placeholder=" بحث باسم الطالب / الطالبة" onChange={(e)=> setQuery(`userName=${e.target.value}`)} />
              </div>
                        {/*Show Only Top Students Table*/}
              <div className="card-body w-full">
                        <h1 className='w-full flex justify-center items-center'>جدول الأوائل</h1>
                        <TopUsersTabel />
              </div>
              <div className="card-body">
              <AllUsersTabel place={AllUsersByPage as unknown as {id:number,User:AllUserInterface[]}} query={query} setUserGender={setQuery} setUserGroup={setQuery}/>
              <Pagination query={query} setQuery={setQuery} pages={AllUsers?.pageCount}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
