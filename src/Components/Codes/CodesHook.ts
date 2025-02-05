import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { deleteCodesById } from "@/lib/Actions/CodesActions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LogedUserInterface } from "@/Interfaces/InterFaces";

export default function CodesHook() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface};
    const {DeleteCodes} = useAppSelector(state=>state.code) as unknown as {DeleteCodes:{status:number}}

  const dispatch = useAppDispatch()
  
  //Delete Codes 
  const DeleteCodesHandeller =(id: string) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذا الكود؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات الكود',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف الكود',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCodesById(id as unknown as string))
        Swal.fire({
          title: "تم الحذف!",
          text: "تم الحذف بنجاح.",
          icon: "success"
        });
      }
    });
    
    }
  
  //Get Notifications of Success or fail of delete
  useEffect(()=>{
  if(DeleteCodes?.status){
     if (DeleteCodes?.status === 200){
      toast.success('تم حذف الكود بنجاح')
    } else if (DeleteCodes?.status === 500){
      toast.error('حدث خطأ في حذف الكود')
    }
  }
  },[DeleteCodes])
  
  return (
    {UserLogedData,DeleteCodesHandeller}
  )
}
