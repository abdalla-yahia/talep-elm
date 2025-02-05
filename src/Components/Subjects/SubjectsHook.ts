import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { deleteSubject, updateSubject } from "@/lib/Actions/SubjectsActions";
import { toast } from "react-toastify";
import { fetchSections } from "@/lib/Actions/SectionsActions";
import Swal from "sweetalert2";
import { LogedUserInterface, SectionInterface } from "@/Interfaces/InterFaces";

export default function SubjectHook() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface};
    const {UpdateSubject} = useAppSelector(state=>state.subject) as unknown as {UpdateSubject:{status:number}}
    const {DeleteSubject} = useAppSelector(state=>state.subject) as unknown as {DeleteSubject:{status:number}}
    const {AllSections} = useAppSelector(state=>state.section) as unknown as {AllSections:{sections:SectionInterface[]}}
    const [toggle, setToggle] = useState(false)
    const [EditName, setEditName] = useState('')
    const [EditDescription, setEditDescription] = useState('')
    const [SectionId, setSectionId] = useState('')
    const [SubjectId,setSubjectId] = useState('')
  
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchSections())
  },[dispatch])
  //Edit Subject
  const EditSubjectHandeller =(id:string) =>{
    if(EditName !== '' && EditDescription !== '' && SectionId !== ''){
    dispatch(updateSubject({
      id:parseInt(id),
      name:EditName,
      info:EditDescription,
      sectionId:parseInt(SectionId)
    }))
  }else toast.warning('يرجي ملئ جميع الحقول')
  }
  
  //Delete Subject 
  const DeleteSubjectHandeller =(id:string) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذه المادة؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات المادة',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف المادة',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSubject(parseInt(id) as unknown as string))
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
  if(UpdateSubject?.status){
    if(UpdateSubject?.status === 201){
      toast.success('تم تعديل المادة بنجاح')
      setEditName('')
      setSectionId('')
      setEditDescription('')
      setSubjectId('')
      setToggle(false)
    }else if (UpdateSubject?.status === 400){
      toast.error('حدث خطأ في تعديل المادة')
      }
    }
    if(DeleteSubject?.status){
     if (DeleteSubject?.status === 200){
      toast.success('تم حذف المادة بنجاح')
    } 
     else if (DeleteSubject?.status === 500){
      toast.error('حدث خطأ في حذف المادة')
    }
    
  }
  },[UpdateSubject,DeleteSubject])
  
  return (
    {UserLogedData,toggle, setToggle, setEditName, setEditDescription,
      setSectionId,SubjectId,setSubjectId,EditSubjectHandeller,DeleteSubjectHandeller,AllSections}
   
  )
}
