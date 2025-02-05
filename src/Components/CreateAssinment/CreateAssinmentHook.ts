'use client'
import { fetchSubjectByID, fetchSubjects } from "@/lib/Actions/SubjectsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { SetStateAction, useEffect, useState } from "react"
import { createAssinment } from "@/lib/Actions/AssinmentsActions"
import { toast } from "react-toastify"
import { Subjects } from "@prisma/client"
import { AllLessonsInterFace, AllSubjectsInterFace } from "@/Interfaces/InterFaces"

export default function CreateAssinmentHook() {
    const {Subject} = useAppSelector(state => state.subject) as unknown as {Subject:AllSubjectsInterFace}
    const {AllSubjects} = useAppSelector(state => state.subject) as unknown as {AllSubjects:{Subjects:Subjects[]}}
    const {CreatedAssinment} = useAppSelector(state=>state.assinment) as unknown as {CreatedAssinment:{status:number}}
    const [hours,setHours]=useState(0)
    const [minutes,setMinutes]=useState(0)
    const [seconds,setSeconds]=useState(0)
    const [Lessons,setLessons]=useState<AllLessonsInterFace[]>([])
    const [lessonId,setLessonId]=useState(0)
    const [teacherId,setteacherId]=useState([{id:0}])
    const [subjectId,setSubjectId]=useState('')
    const [EditDegree,setEditDegree]=useState(0)
    const [FullDegree,setFullDegree]=useState(0)
    const [SelectFullDegree,setSelectFullDegree]=useState(0)
    const [timerToggle,setTimerToggle]=useState(false)
    const [ChoiesValue,setChoiesValue]=useState([{id:0,value:''}])
    const [EditQuestion,setEditQuestion]=useState('')
    const [AssinmentName,SetAssinmentName]=useState('')
    const [countOfChoies,setCountOfChoies]=useState('')
    const [QuestuionsInBody,SetQuestuionsInBody]=useState([])
    const [QuestionIdForEdit,setQuestionIdForEdit]=useState(0)
    const [EditQuestionToggle,setEditQuestionToggle]=useState(false)
    const [AssinmentDescription,SetAssinmentDescription]=useState('')

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchSubjectByID(subjectId))
    },[dispatch, subjectId])
    //Get A Specific subject By ID
    useEffect(()=>{
        setLessons(Subject?.Lessons as unknown as AllLessonsInterFace[])
    },[Subject, dispatch])
    
    //Get All Lessons Of Subject
    useEffect(()=>{
        setLessons(Subject?.Lessons as unknown as AllLessonsInterFace[])
        setteacherId(Subject?.Teachers as unknown as [{id:number}])
    },[Subject])
    //Get All Subjects To Choase 
    useEffect(()=>{
        dispatch(fetchSubjects())
      },[dispatch])
     //Change Input Question
    const handellQuestionEdit =(e: { target: { value: SetStateAction<string> } })=>{
        setEditQuestion(e.target.value)
    }
    //Send Assinment To Server
    const SendAssinmentHandeller = ()=>{
        if(AssinmentName !== '' && AssinmentDescription != '' && subjectId!=='' && lessonId !== 0 &&teacherId != null && QuestuionsInBody.length !== 0  ){
             dispatch(createAssinment({
                name:AssinmentName,
                description:AssinmentDescription,
                subjectId:parseInt(subjectId),
                lessonId:parseInt(lessonId as unknown as string),
                teacherId:teacherId && parseInt(teacherId[0]?.id as unknown as string) ,
                assinmentbody:{
                time:timerToggle?{
                    hours:hours,
                    minutes:minutes,
                    seconds:seconds
                }:null,
                questions:QuestuionsInBody,
            }
        }))

        
    }else toast.warning('يرجي إكمال البيانات')
    }

    useEffect(()=>{
        if(CreatedAssinment?.status){
            if(CreatedAssinment?.status === 201){
                toast.success('تم انشاء التكليف بنجاح')
                SetQuestuionsInBody([])
                SetAssinmentName('')
                SetAssinmentDescription('')
            }else toast.error('حدثت مشكلة في انشاء التكليف')
        }
    },[CreatedAssinment])
  return (
    {AllSubjects,timerToggle,setTimerToggle,hours,setHours,minutes,setMinutes,
        seconds,setSeconds,setSubjectId,setLessonId,
        countOfChoies,setCountOfChoies,Lessons,ChoiesValue,setChoiesValue,EditQuestionToggle,setEditQuestionToggle,
        EditQuestion,EditDegree,setEditDegree,QuestuionsInBody,SetQuestuionsInBody
        ,SetAssinmentName,SetAssinmentDescription,handellQuestionEdit,
        SendAssinmentHandeller,QuestionIdForEdit,setQuestionIdForEdit,FullDegree,setFullDegree,SelectFullDegree,setSelectFullDegree
    }
  )
}
