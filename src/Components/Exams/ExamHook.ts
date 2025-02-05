import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createExamResult, updateExamResult } from "@/lib/Actions/ExamsResultsActions";
import { redirect } from "next/navigation";
import { SetStateAction, useEffect,useState } from "react";
import { AllExamsInterface, LogedUserInterface } from "@/Interfaces/InterFaces";

export default function ExamHook({Exam}:{Exam:AllExamsInterface}) {
    const {UserLogedData} = useAppSelector((state ) => state.user) as unknown as {UserLogedData:LogedUserInterface}
    const [answers, setAnswers]=useState([])
    const [DetailsToggle, setDetailsToggle]=useState(false)
    const [CoorectAnswers, setCorrectAnswers]=useState([])
    const [toggle, setToggle]=useState(false)
    const [toggleExam, setToggleExam]=useState(true)
    const [UserDegree, setUserDegree]=useState(0)
    const dispatch = useAppDispatch()
    let Degree = 0
    const Correct: ((prevState: never[]) => never[]) | { id: unknown; answer: unknown; degree: unknown; type: unknown; }[]= []
    const [FullDegree, setFullDegree]=useState(0)

    useEffect(()=>{
      Exam?.Exambody?.questions?.map((e)=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Degree += parseInt(e.degree as unknown as string)
        Correct.push({id:e.id,answer:e.answer,degree:e.degree,type:e.type})
      })
      setCorrectAnswers(Correct as unknown as SetStateAction<never[]>)
      setFullDegree(+Degree)
    },[Exam])
    //On Click Button Open Exam
    const OpenExam = () => {
        dispatch(createExamResult({
      score:0,
      subjectId:parseInt(Exam?.Subjects?.id as unknown as string),
      userId:parseInt(UserLogedData?.id),
      teacherId:parseInt(Exam?.teacher?.id as unknown as string),
      examId:parseInt(Exam?.id as unknown as string),
      answersbody:null
    }))
      
    }
    //Update Answers Of Exam After Press Open Exam
  const SendAnswersHandeller =()=>{
    //Compare User Answer With Correct Answer
    let score = 0;
    CoorectAnswers.map((e: { id: unknown; type: string; answer: unknown[]; degree: string; })=>
      answers.map((el: { id: unknown; answer: unknown[]; })=>{
        if(el.id  === e.id && e.type === 'checkbox' && e.answer.length === el.answer.length){
         const found = el?.answer?.filter((item: unknown)=>!e.answer.includes(item) )
          if(found.length === 0){
            score += parseInt(e.degree)
          }
        }
        
        if(el.id === e.id && el.answer === e.answer){
          score += parseInt(e.degree)
        }
      }
      )
    )
    setUserDegree(score)
    dispatch(updateExamResult({
      score:score,
      examId:parseInt(Exam?.id as unknown as string),
      answersbody:JSON.stringify(answers)
    }))
    redirect('../')
  }


  return (
    {answers, setAnswers,DetailsToggle, setDetailsToggle,
        toggle, setToggle,toggleExam, setToggleExam,UserDegree,FullDegree,
        OpenExam,SendAnswersHandeller
}
  )
}
