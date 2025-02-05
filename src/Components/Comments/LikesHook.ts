import { createLikesComment, deleteLikesComment } from "@/lib/Actions/LikesCommentsActions"
import { useAppSelector } from "@/lib/hooks"
import { useDispatch } from "react-redux"
import LessonHook from "../Lessons/LessonHook"
import { AllLessonsInterFace, LogedUserInterface } from "@/Interfaces/InterFaces"
import { UnknownAction } from "redux"

export default function LikesHook({id}:{id:number}) {
    const {UserLogedData} = useAppSelector(state  => state.user)  as unknown as {UserLogedData:LogedUserInterface}
    const Lesson = useAppSelector(state => state.lesson.LessonByID) as unknown as AllLessonsInterFace
    const {setLoading,loading} = LessonHook({id})

    const dispatch = useDispatch()

  //Create A Like Comment
  const CreateLikeCommentHandeller = (e: [{userId:string,id:string}],type:string,subjectId:number,commentId:number,lessonId:number,reId: unknown)=>{
    if(e.length && e.find(el=>el.userId === UserLogedData.id)) {
      dispatch(deleteLikesComment(e[e.findIndex(el=>el.userId === UserLogedData.id)].id)  as unknown as UnknownAction)
      setLoading(!loading)
      dispatch(createLikesComment({
        like:(type == 'like' ? true : false) ,
        disLike:(type == 'disLike' ? true : false) ,
        love:(type == 'love' ? true : false) ,
        hate:(type == 'hate' ? true : false) ,
        userId:UserLogedData?.role === 'USER' && parseInt(UserLogedData.id) || null,
        adminId:UserLogedData?.role === 'ADMIN' && parseInt(UserLogedData.id) || null,
        teacheId:UserLogedData?.role === 'TEACHER' && parseInt(UserLogedData.id) || null,
        leaderId:UserLogedData?.role === 'ADMIN_TEACHER' && parseInt(UserLogedData.id) || null,
        mangerId:UserLogedData?.role === 'MANAGER' && parseInt(UserLogedData.id) || null,
        ownerId:UserLogedData?.role === 'OWNER' && parseInt(UserLogedData.id) || null,
        subjectId:subjectId,
        commentId:commentId,
        lessonId:lessonId,
      }) as unknown as UnknownAction) 
      setLoading(!loading)
    }else{
    dispatch(createLikesComment({
      like:(type == 'like' ? true : false) ,
      disLike:(type == 'disLike' ? true : false) ,
      love:(type == 'love' ? true : false) ,
      hate:(type == 'hate' ? true : false) ,
      userId:UserLogedData?.role === 'USER' && parseInt(UserLogedData.id) || null,
      adminId:UserLogedData?.role === 'ADMIN' && parseInt(UserLogedData.id) || null,
      teacheId:UserLogedData?.role === 'TEACHER' && parseInt(UserLogedData.id) || null,
      leaderId:UserLogedData?.role === 'ADMIN_TEACHER' && parseInt(UserLogedData.id) || null,
      mangerId:UserLogedData?.role === 'MANAGER' && parseInt(UserLogedData.id) || null,
      ownerId:UserLogedData?.role === 'OWNER' && parseInt(UserLogedData.id) || null,
      subjectId:subjectId,
      commentId:commentId,
      lessonId:lessonId,
      reCommentId:reId
    })  as unknown as UnknownAction) 
    setLoading(!loading)
    }
  }
  //Delete A Like Comment
  const DeleteLikeCommentHandeller = (id: string)=>{
    dispatch(deleteLikesComment(id)  as unknown as UnknownAction)
    setLoading(!loading)
  }

  return (
    {CreateLikeCommentHandeller,DeleteLikeCommentHandeller,Lesson}
  )
}
