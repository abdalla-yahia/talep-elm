import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { deleteNews, updateNews } from "@/lib/Actions/NewsActions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LogedUserInterface } from "@/Interfaces/InterFaces";

export default function NewsHook() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface};
    const {UpdateNews} = useAppSelector(state=>state.news)as unknown as {UpdateNews:{status:number}}
    const {DeleteNews} = useAppSelector(state=>state.news)as unknown as {DeleteNews:{status:number}}
    const [toggle, setToggle] = useState(false)
    const [EditDescription, setEditDescription] = useState('')
    const [NewsId,setNewsId] = useState('')
  
  const dispatch = useAppDispatch()
  
  //Edit News
  const EditNewsHandeller =(id:string) =>{
    if( EditDescription !== '' ){
    dispatch(updateNews({
      id:parseInt(id),
      content:EditDescription,
      author:{id:UserLogedData?.id, name:UserLogedData?.name }
    }))
  }else toast.warning('يرجي ملئ جميع الحقول')
  }
  
  //Delete News 
  const DeleteNewsHandeller =(id:string) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذا الخبر؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات الخبر',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف الخبر',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNews(id as unknown as string));
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
  if(UpdateNews?.status){
    if(UpdateNews?.status === 201){
      toast.success('تم تعديل الخبر بنجاح')
      setEditDescription('')
      setNewsId('')
      setToggle(false)
    }
   else if (UpdateNews?.status === 400){
    toast.error('حدث خطأ في تعديل الخبر')
   }
  }

  if(DeleteNews?.status){
     if (DeleteNews?.status === 200){
      toast.success('تم حذف الخبر بنجاح')
    } else if (DeleteNews?.status === 500){
      toast.error('حدث خطأ في حذف الخبر')
    }
    
  }
  },[DeleteNews,UpdateNews])
  
  return (
    {UserLogedData,toggle, setToggle, setEditDescription,NewsId,setNewsId,EditNewsHandeller,DeleteNewsHandeller}
   
  )
}
