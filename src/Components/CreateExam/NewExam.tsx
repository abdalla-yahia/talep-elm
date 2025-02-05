'use client'
import { QuestionInbody } from "@/Interfaces/InterFaces";
import CreateExamHook from "./CreateExamHook";
import RadioQuestion from "./RadioQuestion"
import ShowQuestions from "./ShowQuestions";
import * as icon from '@/Components/Icons/icons'

export default function NewExam() {
    const {AllSubjects,timerToggle,setTimerToggle,hours,setHours,minutes,setMinutes,
        seconds,setSeconds,setSubjectId,
        countOfChoies,setCountOfChoies,ChoiesValue,setChoiesValue,
        QuestuionsInBody,SetQuestuionsInBody
        ,SetExamName,SetExamFullDegree,
        SendExamHandeller,FullDegree,setFullDegree,SelectFullDegree,setSelectFullDegree} =CreateExamHook()
   
    //Create 24 houres Option
   const hoursSelection = [] 
   for(let i =0 ;i<=24;i++)
       hoursSelection.push(<option value={i}>{i}</option>)
   //Create 60 minutes Option
   const minutesSelection = [] 
   for(let i =0 ;i<=60;i++)
       minutesSelection.push(<option value={i}>{i}</option>)
   //Create 60 seconds Option
   const secondsSelection = [] 
   for(let i =0 ;i<=60;i++)
       secondsSelection.push(<option value={i}>{i}</option>)
   //Create multible choice Option
   const ChoiesFieldCount = []
   for(let i = 0; i <= Number(countOfChoies)-1; i++)
   ChoiesFieldCount.push({id:i,input:<input id="" onChange={(e)=>ChoiesValue?.find((ele:{id:number})=>ele.id == i) ? setChoiesValue([...ChoiesValue.filter((ele: { id: number; }) =>ele.id !== i),{id:i,value:e.target.value}]):setChoiesValue([...ChoiesValue,{id:i,value:e.target.value}])} name="" className="text-gray-500 text-sm rounded lg:w-1/4 md:w-1/4 w-[50%] px-2 m-1" placeholder={` ${i+1} الاختيار`}/>})

  return (
    <>
    <div className="w-full shadow flex p-3 flex-col justify-start items-start">
        <div className="w-full flex justify-center items-center gap-3">
        <h1 className="hidden md:block lg:block">اسم الإختبار </h1>
        <input onChange={(e)=>SetExamName(e.target.value)} className="text-gray-700 rounded w-4/6  p-2" type="text" name="" id="" placeholder="اسم الإختبار"/>
        </div>
        <div className="w-full flex my-2 justify-center items-center gap-2">
        <h1 className="hidden md:block lg:block"> الدرجة النهائية للإختبار </h1>
        <input onChange={(e)=>SetExamFullDegree(e.target.value)} className="text-gray-700 rounded w-4/6 p-2" min={1} max={500} type="number" name="" id="" placeholder="الدرجة النهائية للإختبار"/>
        </div>
            {/* Data Of Exam */}
        <div className="data w-full flex flex-col justify-center items-center my-2">
                <h1 className="my-2 font-bold text-2xl text-gray-600">بيانات الإختبار </h1>
                <div className="flex flex-col gap-2 md:flex-row lg:flex-row justify-center items-center">
                <div className="flex w-full justify-center items-center">
                <h3 className="hidden md:block lg:block">اسم المادة  </h3>
                <select onChange={(e)=>{setSubjectId(e.target.value)}}  name="" id=""  className="md:w-2/3 lg:w-2/3 w-full rounded mx-2 p-1 text-gray-700 outline-none">
                <option selected disabled value="">اختر اسم المادة</option>
                {
                    AllSubjects?.Subjects && AllSubjects?.Subjects?.map((subject, index) => {
                        return ( <option key={index} value={subject?.id}>{subject?.name}</option> )
                    })
                }
                </select>
              </div>
              
           </div>
        </div>
            {/* Time Of Exam */}
        <div className="time w-full flex flex-col justify-center items-center my-2">
            {/* Is Timer Or Not */}
        <div className="flex w-full flex-col md:flex-row lg-flex-row justify-center items-center">
        <h1 className="my-2 font-bold text-2xl text-gray-600 mx-2 outline-none ">مؤقت الإختبار </h1>
            <select className="text-gray-600 rounded" onChange={()=>setTimerToggle(!timerToggle)} name="" id="">
                <option value={'false'}>لا يوجد</option>
                <option value={'true'}>نعم يوجد</option>
            </select>
        </div>
            {/* Set Value Of Timer If Is Timer */}
            <div className={`${timerToggle === false ? 'hidden':'block'} w-full flex-wrap  flex sm:justify-center gap-2 justify-between items-center`}>
            <div className="flex justify-center items-center">
                <h3 className="hidden md:block lg:block"> الساعات </h3>
                <select onChange={(e)=>setHours(e.target.value as unknown as number)} name="" id=""  className="w-2/3 rounded mx-2 p-1 text-gray-700 outline-none">
                {...hoursSelection}
                </select>
            </div>
            <div className="flex justify-center items-center">
                <h3 className="hidden md:block lg:block">الدقائق  </h3>
                <select  onChange={(e)=>setMinutes(e.target.value as unknown as number)} name="" id=""  className="w-2/3 rounded mx-2 p-1 text-gray-700 outline-none">
                {...minutesSelection}
                </select>
                </div>
            <div className="flex justify-center items-center">
                <h3 className="hidden md:block lg:block">الثواني  </h3>
                <select  onChange={(e)=>setSeconds(e.target.value as unknown as number)}  name="" id=""  className="w-2/3 rounded mx-2 p-1 text-gray-700 outline-none">
                {...secondsSelection}
                </select>
            </div>
            {/*Show Timer After Set Value Of Timer If Is Timer */}
            <div className="flex justify-center items-center">
                <h3 className="hidden md:block lg:block">المؤقت  سيكون :</h3>
                {hours > 0 && <h4 className="flex text-red-700 justify-center">
                    {hours}
                    <span className="text-gray-500 mx-1">ساعة</span>
                </h4>}
                {minutes > 0 && <h4 className="flex text-red-700 justify-center">
                    {minutes}
                    <span className="text-gray-500 mx-1">دقيقة</span>
                </h4>}
                {seconds > 0 && <h4 className="flex text-red-700 justify-center">
                    {seconds}
                    <span className="text-gray-500 mx-1">ثانية</span>
                </h4>}
            </div>
            </div> 
        </div>
        <div className="w-full flex justify-center gap-2 items-center my-2">
                <span className="text-blue-600 text-center w-1/3 hidden md:block lg:block">الدرجة الكلية :</span>
                <input  type='number' min={1} max={100}  onChange={(e)=>setSelectFullDegree(e.target.value as unknown as number)} className="w-full rounded text-green-700 text-xl " name="" id="" placeholder="ادخل الدرجة الكلية للإختبار"/>
            </div>
        {/*Show The Form Of Exam */}
            <div className="FormOfAssinmet w-full flex flex-col justify-center items-center my-2">
                <ShowQuestions QuestuionsInBody={QuestuionsInBody} SetQuestuionsInBody={SetQuestuionsInBody as React.Dispatch<React.SetStateAction<unknown[]>>}/>
            </div>

            
            <div className="w-full flex justify-center gap-2 items-center my-2">
                <span className="text-red-600 ">إجمالي درجات الأسأله  :</span>
                <span className="text-blue-700 text-2xl ">{FullDegree} درجة </span>
                <span className={`${+SelectFullDegree - +FullDegree === 0 ? 'text-green-700' : (+SelectFullDegree - +FullDegree > 0)?'text-yellow-500' : 'text-red-500' }  text-2xl `}>متبقي {+SelectFullDegree - +FullDegree} درجة </span>
                {+SelectFullDegree - +FullDegree === 0 ? <icon.GiCheckMark className="text-green-600"/> : <icon.FaXmark  className="text-red-500"/>}
            </div>
         {/* Set Quations  */}
         <div className="questions w-full bg-slate-400 shadow-md flex flex-col justify-center items-center my-2">
         <h1 className="my-2 font-bold text-2xl text-gray-800">اسألة الإختبار </h1>
                <div className="flex flex-col my-2">
                        <RadioQuestion  
                        setCountOfChoies={setCountOfChoies}
                        countOfChoies={countOfChoies} 
                        ChoiesFieldCount={ChoiesFieldCount} 
                        ChoiesValue={ChoiesValue} 
                        setChoiesValue={setChoiesValue} 
                        QuestuionsInBody={QuestuionsInBody} 
                        SetQuestuionsInBody={SetQuestuionsInBody  as unknown as React.Dispatch<React.SetStateAction<QuestionInbody>>}  
                        setFullDegree={setFullDegree}/>
                </div>
                
        </div>
        <button onClick={()=>{SendExamHandeller()}} className={`${(QuestuionsInBody.length ) ?'block':'hidden'} w-full rounded p-3 bg-orange-400 text-2xl cursor-pointer hover:shadow-md`}>اعتماد الإختبار وارسالة</button>
    </div>
    </>
  )
}

//