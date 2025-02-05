import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createAssinmentResult, updateAssinmentResult } from "@/lib/Actions/AssinmentsResultsActions";
import { redirect } from "next/navigation";
import { SetStateAction, useEffect,useState } from "react";
import { AllAssinmentInterface, AssinmentResultInterface, LogedUserInterface } from "@/Interfaces/InterFaces";

export default function AssinmentHook({Assinment}:{Assinment:AllAssinmentInterface}) {
    const {UserLogedData} = useAppSelector((state ) => state.user) as unknown as {UserLogedData:LogedUserInterface}
    const {AssinmentResult} = useAppSelector((state ) => state.assinmentResult) as unknown as {AssinmentResult:AssinmentResultInterface}
    const [answers, setAnswers]=useState([])
    const [DetailsToggle, setDetailsToggle]=useState(false)
    const [CoorectAnswers, setCorrectAnswers]=useState([])
    const [toggle, setToggle]=useState(false)
    const [toggleAssinment, setToggleAssinment]=useState(true)
    const [UserDegree, setUserDegree]=useState(0)
    const dispatch = useAppDispatch()


    let Degree = 0
    const Correct: ((prevState: never[]) => never[]) | { id: unknown; answer: unknown; degree: unknown; type: unknown; }[]= []
    const [FullDegree, setFullDegree]=useState(0)
    useEffect(()=>{
      Assinment?.assinmentbody?.questions?.map((e)=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Degree += parseInt(e.degree as unknown as string)
        Correct.push({id:e.id,answer:e.answer,degree:e.degree,type:e.type})
      })
      setCorrectAnswers(Correct as unknown as SetStateAction<never[]>)
      setFullDegree(+Degree)
    },[Assinment,AssinmentResult])
    //On Click Button Open Assinment
    const OpenAssinment = () => {
        dispatch(createAssinmentResult({
      score:0,
      subjectId:Assinment?.Subjects?.id,
      lessonId:Assinment?.Lessons?.id,
      userId:UserLogedData?.id,
      teacherId:Assinment?.teacher?.id,
      assinmentId:Assinment?.id,
      answersbody:null
    }))
      
    }

    //Update Answers Of Assinment After Press Open Assinment
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
    dispatch(updateAssinmentResult({
      score:score,
      assinmentId:Assinment?.id,
      answersbody:JSON.stringify(answers)
    }))
    redirect('../')
  }


  return (
    {answers, setAnswers,DetailsToggle, setDetailsToggle,
        toggle, setToggle,toggleAssinment, setToggleAssinment,UserDegree,FullDegree,
        OpenAssinment,SendAnswersHandeller
}
  )
}
