'use client'
import { fetchSubjectByID, fetchSubjects } from "@/lib/Actions/SubjectsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { SetStateAction, useEffect, useState } from "react"
import { createExam } from "@/lib/Actions/ExamsActions"
import { toast } from "react-toastify"
import { AllSubjectsInterFace } from "@/Interfaces/InterFaces"
import { Subjects } from "@prisma/client"

export default function CreateExamHook() {
    const {Subject} = useAppSelector(state => state.subject) as unknown as {Subject:AllSubjectsInterFace}
    const {AllSubjects} = useAppSelector(state => state.subject)  as unknown as {AllSubjects:{Subjects:Subjects[]}}
    const {CreatedExam} = useAppSelector(state=>state.exam) as unknown as {CreatedExam:{status:number}}
    const [hours,setHours]=useState(0)
    const [minutes,setMinutes]=useState(0)
    const [seconds,setSeconds]=useState(0)
    const [teacherId,setteacherId]=useState([{id:0}])
    const [subjectId,setSubjectId]=useState('')
    const [EditDegree,setEditDegree]=useState(0)
    const [FullDegree,setFullDegree]=useState(0)
    const [SelectFullDegree,setSelectFullDegree]=useState(0)
    const [timerToggle,setTimerToggle]=useState(false)
    const [ChoiesValue,setChoiesValue]=useState([{id:0,value:''}])
    const [EditQuestion,setEditQuestion]=useState('')
    const [ExamName,SetExamName]=useState('')
    const [countOfChoies,setCountOfChoies]=useState<number>(0)
    const [QuestuionsInBody,SetQuestuionsInBody]=useState([])
    const [QuestionIdForEdit,setQuestionIdForEdit]=useState(0)
    const [EditQuestionToggle,setEditQuestionToggle]=useState(false)
    const [ExamFullDegree,SetExamFullDegree]=useState('')

    const dispatch = useAppDispatch()
    //Get A Specific subject By ID
    useEffect(()=>{
        dispatch(fetchSubjectByID(subjectId))
    },[dispatch, subjectId])
    
    //Get All Lessons Of Subject
    useEffect(()=>{
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
    //Send Exam To Server
    const SendExamHandeller = ()=>{
        if(ExamName !== '' && ExamFullDegree != '' && subjectId!=='' &&teacherId != null && QuestuionsInBody.length !== 0  ){
             dispatch(createExam({
                title:ExamName,
                fullDegree:parseInt(ExamFullDegree),
                subjectId:parseInt(subjectId),
                teacherId:teacherId && parseInt(teacherId[0]?.id as unknown as string),
                Exambody:{
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
        if(CreatedExam?.status){
            if(CreatedExam?.status === 201){
                toast.success('تم انشاء الإختبار بنجاح')
                SetQuestuionsInBody([])
                SetExamName('')
                SetExamFullDegree('')
            }else toast.error('حدثت مشكلة في انشاء الإختبار')
        }
    },[CreatedExam])
  return (
    {AllSubjects,timerToggle,setTimerToggle,hours,setHours,minutes,setMinutes,
        seconds,setSeconds,setSubjectId,
        countOfChoies,setCountOfChoies,ChoiesValue,setChoiesValue,EditQuestionToggle,setEditQuestionToggle,
        EditQuestion,EditDegree,setEditDegree,QuestuionsInBody,SetQuestuionsInBody
        ,SetExamName,SetExamFullDegree,handellQuestionEdit,
        SendExamHandeller,QuestionIdForEdit,setQuestionIdForEdit,FullDegree,setFullDegree,SelectFullDegree,setSelectFullDegree
    }
  )
}
