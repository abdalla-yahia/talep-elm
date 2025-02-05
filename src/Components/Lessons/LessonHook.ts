import { AllLessonsInterFace, LogedUserInterface } from "@/Interfaces/InterFaces";
import { createComment, deleteComment, updateComment } from "@/lib/Actions/CommentsActions";
import { fetchLessonById } from "@/lib/Actions/LessonsActions";
import { createReComment, deleteReComment, updateReComment } from "@/lib/Actions/ReCommentsActions";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UnknownAction } from "redux";
import Swal from "sweetalert2";

export default  function LessonHook({id}:{id:number}) {
  const {UserLogedData} = useAppSelector((state ) => state.user) as unknown as {UserLogedData:LogedUserInterface}
  const Lesson = useAppSelector(state  => state.lesson.LessonByID) as unknown as AllLessonsInterFace
  const [comment,setComment] = useState('')
  const [reCommentToggle,setReCommentToggle] = useState(false)
  const [ReCommentValue,setReCommentValue] = useState('')
  const [loading,setLoading] = useState(false)
  const [toggle,setToggle] = useState(false)
  const [NewComment,setNewComment] = useState('')
  const [commentId,setCommentId] = useState('')
  const [NewReComment,setNewReComment] = useState('')
  const [RecommentId,setReCommentId] = useState('')
  const [EditReCommentToggle,setEditReCommentToggle] = useState(false)
    const dispatch = useDispatch()

    // Create A Comment
    const CreateCommentHandeller = ()=>{
      if(comment !== '' && comment.length > 3){
        dispatch(createComment({
          text:comment,
          lessonId:parseInt(Lesson.id as unknown as string),
          subjectId:parseInt(Lesson.subjectId),
          userId:UserLogedData?.role === 'USER' ? parseInt(UserLogedData.id) : null,
          adminId:UserLogedData?.role === 'ADMIN' ? parseInt(UserLogedData.id) : null,
          teacheId:UserLogedData?.role === 'TEACHER' ? parseInt(UserLogedData.id) : null,
          leaderId:UserLogedData?.role === 'ADMIN_TEACHER' ? parseInt(UserLogedData.id) : null,
          mangerId:UserLogedData?.role === 'MANAGER' ? parseInt(UserLogedData.id) : null,
          ownerId:UserLogedData?.role === 'OWNER' ? parseInt(UserLogedData.id) : null,
        }) as unknown as UnknownAction)
        setComment('')
        setLoading(!loading)
        }else toast.warning('يرجى كتابة تعليق')
    }

    //Delete A Comment
    const DeleteCommentHandeller = (id : number)=>{
      Swal.fire({
        title: 'هل ستقوم بحذف هذا التعليق؟',
        text: '!!سيؤدي هذا إلى حذف جميع بيانات التعليق',
        icon: "warning",
        showCancelButton: true,
        cancelButtonText:'إلغاء',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'نعم ! قم بحذف التعليق',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteComment(id as unknown as string) as unknown as UnknownAction)
          setLoading(!loading)
          Swal.fire({
            title: "تم الحذف!",
            text: "تم الحذف بنجاح.",
            icon: "success"
          });
        }
      });
    }

    //Edit A Comment
    const EditCommentHandeller = (comment : {id:string})=>{
      if(NewComment !== '' && NewComment.length > 3){
      dispatch(updateComment({
        text:NewComment,
        id:parseInt(comment.id)
      }) as unknown as UnknownAction)
      setLoading(!loading)
      setNewComment('')
      setToggle(false)
    }else toast.warning('يجب أن يكون التعليق أكبر من 3 حروف')
  }

    //Create Re Comment 
    const CreateReCommentHandeller = (id: number)=>{
      if(ReCommentValue !== '' && ReCommentValue.length > 3){
      dispatch(createReComment({
        text:ReCommentValue,
        commentId:id,
        userId:UserLogedData?.role === 'USER' ? parseInt(UserLogedData.id) : null,
        adminId:UserLogedData?.role === 'ADMIN' ? parseInt(UserLogedData.id) : null,
        teacheId:UserLogedData?.role === 'TEACHER' ? parseInt(UserLogedData.id) : null,
        leaderId:UserLogedData?.role === 'ADMIN_TEACHER' ? parseInt(UserLogedData.id) : null,
        mangerId:UserLogedData?.role === 'MANAGER' ? parseInt(UserLogedData.id) : null,
        ownerId:UserLogedData?.role === 'OWNER' ? parseInt(UserLogedData.id) : null,
        lessonId:parseInt(Lesson.id as unknown as string) ,
        subjectId:parseInt(Lesson.subjectId)
      }) as unknown as UnknownAction)
      setLoading(!loading)
      setReCommentValue('')
      setToggle(false)
      }else {toast.warning('يجب أن يكون التعليق أكبر من 3 حروف')}
    }

    //Delete Re Comment 
    const DeleteReCommentHandeller = (id : number)=>{
      Swal.fire({
        title: 'هل ستقوم بحذف هذا التعليق؟',
        text: '!!سيؤدي هذا إلى حذف جميع بيانات التعليق',
        icon: "warning",
        showCancelButton: true,
        cancelButtonText:'إلغاء',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'نعم ! قم بحذف التعليق',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteReComment(id as unknown as string) as unknown as UnknownAction)
          setLoading(!loading)
          Swal.fire({
            title: "تم الحذف!",
            text: "تم الحذف بنجاح.",
            icon: "success"
          });
        }
      });
    }

    //Update Re Comment
    const EditReCommentHandeller = (id : number)=>{
      dispatch(updateReComment({
        text:NewReComment,
        id:id,
      }) as unknown as UnknownAction)
      setLoading(!loading)
      setNewReComment('')
      setEditReCommentToggle(false)
    }

    //Get A Specifc Lesson
      useEffect(()=>{
        dispatch(fetchLessonById(id as unknown as string) as unknown as UnknownAction)
      },[id,dispatch,loading])
  return (
    {comment,setComment,toggle,setToggle,NewComment,setNewComment,commentId,setCommentId,
      Lesson,CreateCommentHandeller,DeleteCommentHandeller,EditCommentHandeller,setLoading,loading,reCommentToggle,setReCommentToggle,CreateReCommentHandeller,setReCommentValue
    ,ReCommentValue,DeleteReCommentHandeller,UserLogedData,EditReCommentHandeller,NewReComment,setNewReComment,RecommentId,setReCommentId,EditReCommentToggle,setEditReCommentToggle
    }
    )
}
