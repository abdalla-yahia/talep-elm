import { deleteLesson, updateLesson } from "@/lib/Actions/LessonsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { fetchSubjects } from "@/lib/Actions/SubjectsActions";
import { fetchAllTeachers } from "@/lib/Actions/TeachersActions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Subjects, Teachers } from "@prisma/client";
import { LogedUserInterface } from "@/Interfaces/InterFaces";

export default function LessonHookEdit() {
    
    const {AllSubjects} = useAppSelector(state=>state.subject)   as unknown as {AllSubjects:{Subjects:Subjects[]}}
    const {AllTeachers}  =useAppSelector(state => state.teacher) as unknown as {AllTeachers:{Teachers:Teachers[]}}
    const {UpdateLesson}= useAppSelector(state=>state.lesson)    as unknown as {UpdateLesson:{status:number}}
    const {DeleteLesson}= useAppSelector(state=>state.lesson)    as unknown as {DeleteLesson:{status:number}}
    const {UserLogedData}  =useAppSelector(state=>state.user)    as unknown as {UserLogedData:LogedUserInterface}
    const [toggle,setToggle] = useState(false)
    const [lessonId,setLessonId] = useState('') 
    const [EditName,setEditName] = useState('')
    const [EditDescription,setEditDescription] = useState('')
    const [SubjectId,setSubjectId] = useState('')
    const [TeacherID,setTeacherID] = useState('')
    
    const dispatch = useAppDispatch()
    //Delete Lesson
    const DeleteLessonHandeller = (id:string)=>{
      Swal.fire({
        title: 'هل ستقوم بحذف هذا الدرس؟',
        text: '!!سيؤدي هذا إلى حذف جميع بيانات الدرس',
        icon: "warning",
        showCancelButton: true,
        cancelButtonText:'إلغاء',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'نعم ! قم بحذف الدرس',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteLesson(id as unknown as string))
          if(DeleteLesson?.status === 200){
            Swal.fire({
              title: "تم الحذف!",
              text: "تم الحذف بنجاح.",
              icon: "success"
            });
          }
        }
      });
    }
    //Update Lesson
    const EditLessonHandeller = (id:string) => {
      if(lessonId !== '' && lessonId === id && EditName !== '' && EditDescription !== '' && SubjectId !== '' && TeacherID !== ''){
      dispatch(updateLesson({
        id:parseInt(lessonId),
        name:EditName,
        description:EditDescription,
        subjectId:parseInt(SubjectId),
        teacherId:parseInt(TeacherID),
      }))
    }else toast.warning('أكمل البيانات')
    }
    //Get Lesson by ID and All Subjects and Teachers
    useEffect(()=>{
      dispatch(fetchSubjects())
      dispatch(fetchAllTeachers())
    },[dispatch])
    //Send Notifcation of fail or success update Lesson
    useEffect(()=>{
      if(UpdateLesson?.status){
        if(UpdateLesson?.status === 201){
          toast.success('تم تحديث المحاضرة بنجاح' )
          setEditName('')
          setEditDescription('')
          setSubjectId('')
          setTeacherID('')
          setToggle(false)  
          setLessonId('')
        }else if(UpdateLesson?.status === 400)toast.error('لم يتم تحديث المحاضرة')
      }
    },[UpdateLesson])
    //Send Notifcation of fail or success Delete Lesson
    useEffect(()=>{
      if(DeleteLesson?.status){
        if(DeleteLesson?.status === 200){
          toast.success('تم حذف المحاضرة بنجاح' )

        }else if(DeleteLesson?.status === 400)toast.error('لم يتم حذف المحاضرة')
      }
    },[DeleteLesson])
    return (
    {setLessonId,DeleteLessonHandeller,AllSubjects,AllTeachers,toggle,setToggle,lessonId,setEditName,
        setEditDescription,setSubjectId,setTeacherID,
        EditLessonHandeller,UserLogedData}
    
  )
}
