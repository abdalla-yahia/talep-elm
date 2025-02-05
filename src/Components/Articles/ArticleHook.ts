import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { deleteArticle, updateArticle } from "@/lib/Actions/ArticlesActions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LogedUserInterface } from "@/Interfaces/InterFaces";

export default function ArticleHook() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface}
    const {UpdateArticle} = useAppSelector(state=>state.article) as unknown as {UpdateArticle:{status:number}}
    const {DeleteArticle} = useAppSelector(state=>state.article) as unknown as {DeleteArticle:{status:number}}
    const [toggle, setToggle] = useState<boolean>(false)
    const [EditName, setEditName] = useState<string>('')
    const [EditDescription, setEditDescription] = useState<string>('')
    const [ArticleAccess, setArticleAccess] = useState<string>('')
    const [ArticleId,setArticleId] = useState<string>('')
  
  const dispatch = useAppDispatch()
  
  //Edit Article
  const EditArticleHandeller =(id: string) =>{
    if(EditName !== '' && EditDescription !== '' && ArticleAccess !== ''){
    dispatch(updateArticle({
      id:parseInt(id),
      title:EditName,
      content:EditDescription,
      access:ArticleAccess
    }))
  }else toast.warning('يرجي ملئ جميع الحقول')
  }
  
  //Delete Article 
  const DeleteArticleHandeller =(id:string) =>{
    Swal.fire({
      title: 'هل ستقوم بحذف هذا المقال؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات المقال',
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:'إلغاء',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'نعم ! قم بحذف المقال',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteArticle(id as unknown as string))
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
  if(UpdateArticle?.status){
    if(UpdateArticle?.status === 201){
      toast.success('تم تعديل المقال بنجاح')
      setEditName('')
      setArticleAccess('')
      setEditDescription('')
      setArticleId('')
      setToggle(false)
    }
   else if (UpdateArticle?.status === 400){
    toast.error('حدث خطأ في تعديل المقال')
   }
  }

  if(DeleteArticle?.status){
     if (DeleteArticle?.status === 200){
      toast.success('تم حذف المقال بنجاح')
    } else if (DeleteArticle?.status === 500){
      toast.error('حدث خطأ في حذف المقال')
    }
    
  }
  },[DeleteArticle,UpdateArticle])
  
  return (
    {UserLogedData,toggle, setToggle, setEditName, setEditDescription,
        setArticleAccess,ArticleId,setArticleId,EditArticleHandeller,DeleteArticleHandeller}
   
  )
}
