import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { deleteSection, updateSection } from "@/lib/Actions/SectionsActions";
import { toast } from "react-toastify";
import { fetchAllManagers } from "@/lib/Actions/ManagersActions";
import Swal from "sweetalert2";
import { Manager } from "@prisma/client";
import { LogedUserInterface } from "@/Interfaces/InterFaces";

export default function SectionHook() {
    const {AllManagers}  =useAppSelector(state=> state.manager) as unknown as {AllManagers:{Managers:Manager[]}}
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface}
    const {DeleteSection} = useAppSelector(state=>state.section) as unknown as {DeleteSection:{status:number}}
    const {UpdateSection} = useAppSelector(state=>state.section) as unknown as {UpdateSection:{status:number}}
    const [toggle, setToggle] = useState(false)
    const [EditName, setEditName] = useState('')
    const [EditDescription, setEditDescription] = useState('')
    const [SectionId,setSectionId] = useState('')
    const [ManagerId,setManagerId] = useState('')
  
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAllManagers())
  },[dispatch])
  //Edit Section
  const EditSectionHandeller =(id:string) =>{
    if(EditName !== '' && EditDescription !== ''){
    dispatch(updateSection({
      id:parseInt(id),
      name:EditName,
      description:EditDescription,
      managerId:parseInt(ManagerId)
    }))
  }else toast.warning('يرجي ملئ جميع الحقول')
  }
  
  //Delete Section 
  const DeleteSectionHandeller =(id:string) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذا القسم؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات القسم',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف القسم',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSection(id as unknown as string));
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
    //Update Section Notifications
  if(UpdateSection?.status){
    if(UpdateSection?.status === 201){
      toast.success('تم تعديل القسم بنجاح')
      setEditName('')
      setEditDescription('')
      setSectionId('')
      setToggle(false)
    }else if (UpdateSection?.status === 400){
      toast.error('حدث خطأ في تعديل القسم')
    }
  }
    //Delete Section Notifications
    if(DeleteSection?.status){
    if (DeleteSection?.status === 200){
      toast.success('تم حذف القسم بنجاح')
    
    } else if (DeleteSection?.status === 500){
      toast.error('حدث خطأ في حذف القسم')
    }
    
  }
  },[DeleteSection,UpdateSection])
  
  return (
    {UserLogedData,toggle, setToggle, setEditName, setEditDescription
        ,SectionId,setSectionId,EditSectionHandeller,DeleteSectionHandeller,
        AllManagers,setManagerId}
   
  )
}
