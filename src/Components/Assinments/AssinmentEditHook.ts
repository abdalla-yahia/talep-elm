import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { deleteAssinment, updateAssinment } from "@/lib/Actions/AssinmentsActions";
import { toast } from "react-toastify";
import { fetchAllLesson } from "@/lib/Actions/LessonsActions";
import { fetchSubjects } from "@/lib/Actions/SubjectsActions";
import { fetchAllTeachers } from "@/lib/Actions/TeachersActions";
import Swal from "sweetalert2";
import { LogedUserInterface } from "@/Interfaces/InterFaces";
import { Lessons, Subjects, Teachers } from "@prisma/client";

export default function AssinmentEditHook() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface};
    const {Lessons} = useAppSelector(state=>state.lesson) as unknown as {Lessons:{data:Lessons[]}};
    const {AllTeachers} = useAppSelector(state=>state.teacher) as unknown as {AllTeachers:{Teachers:Teachers[]}};
    const {AllSubjects} = useAppSelector(state=>state.subject) as unknown as {AllSubjects:{Subjects:Subjects[]}};
    const {UpdatedAssinment} = useAppSelector(state=>state.assinment) as unknown as {UpdatedAssinment:{status:number}};
    const {DeletedAssinment} = useAppSelector(state=>state.assinment) as unknown as {DeletedAssinment:{status:number}};
    const [toggle, setToggle] = useState(false)
    const [EditName, setEditName] = useState('')
    const [EditDescription, setEditDescription] = useState('')
    const [AssinmentId,setAssinmentId] = useState('')
    const [subjectId,setsubjectId] = useState('')
    const [lessonId,setlessonId] = useState('')
    const [teacherId,setteacherId] = useState('')

  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAllLesson())
    dispatch(fetchSubjects())
    dispatch(fetchAllTeachers())
  },[dispatch])
  //Edit Assinment
  const EditAssinmentHandeller =(id:string) =>{
    if(EditName !== '' && EditDescription !== '' && subjectId !== '' && lessonId !== '' && teacherId !== ''){
    dispatch(updateAssinment({
      id:parseInt(id),
      name:EditName,
      description:EditDescription,
      lessonId:parseInt(lessonId),
      subjectId:parseInt(subjectId),
      teacherId:parseInt(teacherId)
    }))
  }else toast.warning('يرجي ملئ جميع الحقول')
  }
  
  //Delete Assinment 
  const DeleteAssinmentHandeller =(id:string) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذا التكليف؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات التكليف',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف التكليف',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAssinment(id as unknown as string))
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
  if(UpdatedAssinment?.status){
    if(UpdatedAssinment?.status === 201){
      toast.success('تم تعديل التكليف بنجاح')
      setEditName('')
      setEditDescription('')
      setAssinmentId('')
      setsubjectId('')
      setlessonId('')
      setteacherId('')
      setToggle(false)
    }else if (UpdatedAssinment?.status === 400){
      toast.error('حدث خطأ في تعديل التكليف')
    }
  }
  if(DeletedAssinment?.status){
    if (DeletedAssinment?.status === 200){
      toast.success('تم حذف التكليف بنجاح')
    
    } else if (DeletedAssinment?.status === 500){
      toast.error('حدث خطأ في حذف التكليف')
    }
    
  }
  },[UpdatedAssinment,DeletedAssinment])
  
  return (
    {UserLogedData,toggle, setToggle, setEditName, setEditDescription,
        AssinmentId,setAssinmentId,EditAssinmentHandeller,DeleteAssinmentHandeller,
        AllSubjects,AllTeachers,Lessons,setsubjectId,setlessonId,setteacherId
    }
   
  )
}
