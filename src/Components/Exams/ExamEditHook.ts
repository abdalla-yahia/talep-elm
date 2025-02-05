import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { deleteExam, updateExam } from "@/lib/Actions/ExamsActions";
import { toast } from "react-toastify";
import { fetchAllLesson } from "@/lib/Actions/LessonsActions";
import { fetchSubjects } from "@/lib/Actions/SubjectsActions";
import { fetchAllTeachers } from "@/lib/Actions/TeachersActions";
import Swal from "sweetalert2";
import { LogedUserInterface } from "@/Interfaces/InterFaces";
import { Subjects, Teachers } from "@prisma/client";

export default function ExamEditHook() {
    const {UserLogedData} = useAppSelector(state=>state.user)  as unknown as {UserLogedData:LogedUserInterface};;
    const {AllTeachers} = useAppSelector(state=>state.teacher) as unknown as {AllTeachers:{Teachers:Teachers[]}};
    const {AllSubjects} = useAppSelector(state=>state.subject) as unknown as {AllSubjects:{Subjects:Subjects[]}};
    const {UpdatedExam} = useAppSelector(state=>state.exam)    as unknown as {UpdatedExam:{status:number}};
    const {DeletedExam} = useAppSelector(state=>state.exam)    as unknown as {DeletedExam:{status:number}};
    const [toggle, setToggle] = useState(false)
    const [EditName, setEditName] = useState('')
    const [EditFullDegree, setEditFullDegree] = useState('')
    const [ExamId,setExamId] = useState('')
    const [subjectId,setsubjectId] = useState('')
    const [teacherId,setteacherId] = useState('')

  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAllLesson())
    dispatch(fetchSubjects())
    dispatch(fetchAllTeachers())
  },[dispatch])
  //Edit Exam
  const EditExamHandeller =(id: string) =>{
    if(EditName !== '' && EditFullDegree !== '' && subjectId !== '' && teacherId !== ''){
    dispatch(updateExam({
      id:parseInt(id),
      title:EditName,
      fullDegree:parseInt(EditFullDegree),
      subjectId:parseInt(subjectId),
      teacherId:parseInt(teacherId)
    }))
  }else toast.warning('يرجي ملئ جميع الحقول')
  }
  
  //Delete Exam 
  const DeleteExamHandeller =(id: unknown) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذا الإختبار؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات الإختبار',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف الإختبار',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExam(id as unknown as string));
        Swal.fire({
          title: "تم الحذف!",
          text: "تم الحذف بنجاح.",
          icon: "success"
        });
      }
    });
    }
  
  //Get Notifications of Success or fail update or delete
  useEffect(()=>{
  if(UpdatedExam?.status){
    if(UpdatedExam?.status === 201){
      toast.success('تم تعديل الإختبار بنجاح')
      setEditName('')
      setEditFullDegree('')
      setExamId('')
      setsubjectId('')
      setteacherId('')
      setToggle(false)
    }else if (UpdatedExam?.status === 400){
      toast.error('حدث خطأ في تعديل الإختبار')
    }
  }
  if(DeletedExam?.status){
    if (DeletedExam?.status === 200){
      toast.success('تم حذف الإختبار بنجاح')
    
    } else if (DeletedExam?.status === 500){
      toast.error('حدث خطأ في حذف الإختبار')
    }
    
  }
  },[UpdatedExam,DeletedExam])
  
  return (
    {UserLogedData,toggle, setToggle, setEditName, setEditFullDegree,
      ExamId,setExamId,EditExamHandeller,DeleteExamHandeller,
      AllSubjects,AllTeachers,setsubjectId,setteacherId
} 
   
  )
}
