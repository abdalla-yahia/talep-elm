'use client'
import Exam_ResultMap from "@/Components/Exams_Results/Exam_ResultMap";
import FullTitle from "@/Utils/FullTitle";

export default function UserExam_Result() {
  return (
    <>
    <FullTitle F_Title={'نتائج الطلاب في كل الإختبارات النهائية'}/>
    <Exam_ResultMap />
    </>
  )
}
