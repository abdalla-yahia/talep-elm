import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { deleteGroup, updateGroup } from "@/lib/Actions/GroupsActions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LogedUserInterface } from "@/Interfaces/InterFaces";

export default function GroupHook() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface};
    const {Group} = useAppSelector(state=>state.group) as unknown as {Group:{status:number}}
    const [toggle, setToggle] = useState(false)
    const [EditName, setEditName] = useState('')
    const [EditDescription, setEditDescription] = useState('')
    const [GroupGender, setGroupGender] = useState('')
    const [GroupId,setGroupId] = useState('')
  
  const dispatch = useAppDispatch()
  
  //Edit Group
  const EditGroupHandeller =(id: string) =>{
    if(EditName !== '' && EditDescription !== '' && GroupGender !== ''){
    dispatch(updateGroup({
      id:parseInt(id),
      name:EditName,
      description:EditDescription,
      gender:GroupGender
    }))
  }else toast.warning('يرجي ملئ جميع الحقول')
  }
  
  //Delete Group 
  const DeleteGroupHandeller =(id: string) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذه المجموعة؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات المجموعة',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف المجموعة',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGroup(id as unknown as string));
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
  if(Group?.status){
    if(Group?.status === 201){
      toast.success('تم تعديل المجموعة بنجاح')
      setEditName('')
      setGroupGender('')
      setEditDescription('')
      setGroupId('')
      setToggle(false)
    }else if (Group?.status === 200){
      toast.success('تم حذف المجموعة بنجاح')
    } else if (Group?.status === 400){
      toast.error('حدث خطأ في تعديل المجموعة')
    } else if (Group?.status === 500){
      toast.error('حدث خطأ في حذف المجموعة')
    }
    
  }
  },[Group])
  
  return (
    {UserLogedData,toggle, setToggle, setEditName, setEditDescription,
        setGroupGender,GroupId,setGroupId,EditGroupHandeller,DeleteGroupHandeller}
   
  )
}
