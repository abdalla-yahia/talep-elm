import { useState } from "react"
import style from './style.module.css';

export default function TimerQuestions({houres,minutes,seconds, setToggle,setToggleAssinment,SendAnswersHandeller}:
    {
    houres:number,
    minutes:number,
    seconds:number, 
    setToggle:React.Dispatch<React.SetStateAction<boolean>>,
    setToggleAssinment:React.Dispatch<React.SetStateAction<boolean>>,
    SendAnswersHandeller:() => void
}
) {
    const [Houres,setHoures]=useState(houres)
    const [Minutes,setMinutes]=useState(minutes)
    const [Seconds,setSeconds]=useState(seconds)

   const Timer = setTimeout(()=>{
        setSeconds(+Seconds - +1)
        if(Seconds == 0){
            setMinutes(+Minutes - +1)
            if(Minutes == 0){
                setHoures(+Houres - +1)
                setMinutes(59)
            }
            setSeconds(59)
        }
    },1000)


    if(Houres === 0 && Minutes === 0 && Seconds === 0){
        clearTimeout(Timer)
        setToggle(false as unknown as boolean)
        setToggleAssinment(false as unknown as boolean)  
        SendAnswersHandeller()
    }

  return (
    <div className="flex w-full justify-center items-start">
        <span className="text-green-700 font-bold mx-1">{+Seconds <= +9 ? `0${+Seconds}`:`${+Seconds}`}</span> 
        <span className={style.animateDelay}>:</span>
        <span className="text-orange-800 font-bold mx-1">{+Minutes <= +9 ? `0${+Minutes}`:`${+Minutes}`}</span>
        <span className="font-bold ">:</span>  
        <span className="text-fuchsia-800 font-bold mx-1">{+Houres <= +9 ? `0${+Houres}` : `${+Houres}`} </span> 
        <h2 className="text-white">{+Houres >=1 ? 'ساعة' :(+Minutes > 10 ? 'دقيقة':(+Minutes > 1 ?'دقائق':'دقيقة'))}</h2>

</div>
  )
}
