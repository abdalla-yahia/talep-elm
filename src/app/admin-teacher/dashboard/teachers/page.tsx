'use client'
import TeacherformationCardPage from "@/Components/Teacher/TeacherInformationCard";
import { fetchAllTeachers } from '@/lib/Actions/TeachersActions';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useEffect } from 'react'
import FullTitle from "@/Utils/FullTitle";
import { Teachers } from "@prisma/client";

export default function AllTeachers() {
  const { AllTeachers } = useAppSelector(
    (state) => state.teacher
  ) as unknown as { AllTeachers: { AllTeachers: Teachers[] } };
  const dispatch = useAppDispatch()
  //Get All Teachers
  useEffect(()=>{
    dispatch(fetchAllTeachers())
  },[dispatch])
  return (
    <>
      <FullTitle F_Title={"المدرسين في المجموعات"} />
      <TeacherformationCardPage Customer={AllTeachers?.AllTeachers} />
    </>
  );
}
