import { QuestionInbody } from "@/Interfaces/InterFaces";
import CreateAssinmentHook from "./CreateExamHook";
import {FaRegEdit,CiTrash} from '@/Components/Icons/icons';

export default function ShowQuestions({QuestuionsInBody,SetQuestuionsInBody}: { QuestuionsInBody:QuestionInbody[]; SetQuestuionsInBody: React.Dispatch<React.SetStateAction<unknown[]>> }) {
    const {EditQuestionToggle,setEditQuestionToggle,
        EditQuestion,EditDegree,setEditDegree,handellQuestionEdit,QuestionIdForEdit,setQuestionIdForEdit} =CreateAssinmentHook()

  return (
    <>
         {
                    QuestuionsInBody.length && QuestuionsInBody.map((item,index)=>{
                        return <>
                        
                        <div className={`${index % 2 == 0? 'bg-slate-400':'bg-slate-500'} relative shadow p-2 w-full flex justify-between items-start my-2`}>
                            <div key={index} className={`  w-full flex flex-col justify-start items-start px-2 my-2`}>
                                <div className="flex justify-center items-center gap-2">
                                    <h1>{index + +1 + ' )'}</h1>
                                        <p  className="rounded py-1 px-2 text-blue-700">
                                        {item.question} 
                                        </p>
                                </div>
                                <div className="flex justify-center flex-col items-center gap-2">
                                    {item?.choase?.length && item?.choase?.map((el,i)=> 
                                    <div key={i} className="flex justify-center  items-center gap-2">
                                            <h1 className="border w-2 h-2"></h1>
                                                <p  className="rounded py-1 px-2 text-gray-700">
                                                {el} 
                                                </p>
                                        </div>)
                                        }
                                        <div className="flex justify-center items-center gap-2">
                                        <h1>درجة السؤال</h1>
                                        <p  className="rounded py-1 px-2 text-red-700">
                                        {item.degree + ' درجة'} 
                                        </p>
                                </div>
                                    </div>
                            </div>
                                <div className="flex justify-between  w-1/6 items-center gap-2">
                                <FaRegEdit onClick={()=>{setEditQuestionToggle(!EditQuestionToggle);setQuestionIdForEdit(item.id)}} title="تعديل السؤال" className="text-green-800 cursor-pointer"/>
                                <CiTrash onClick={()=>SetQuestuionsInBody([...QuestuionsInBody.filter(ele=>ele.id !== item.id)])} title=" حذف السؤال" className="text-red-800 cursor-pointer"/>
                                {
                                    EditQuestionToggle && QuestionIdForEdit === item.id && 
                                    <div className="flex flex-col justify-center absolute top-0 left-0 w-full rounded py-3 bg-blue-300 text-red-600 items-center gap-2">
                                        <div className="flex justify-center items-center gap-2">
                                            <h1>{index + +1 + ' )'}</h1>
                                            <input  defaultValue={item.question} onChange={(e)=>handellQuestionEdit(e)} type="text"  className="rounded px-2 my-2 text-gray-600"/>
                                        </div>
                                        <div className="flex justify-center items-center gap-2">
                                        <h1>درجة السؤال</h1>
                                        <input onChange={(e)=>setEditDegree(e.target.value as unknown as number)} type="number" min={1} max={100} defaultValue={item.degree} className="rounded px-2 my-2 text-red-700"/>
                                        <span className="text-blue"> درجة </span>
                                        </div>
                                    <button className="p-2 rounded bg-slate-600 cursor-pointer" onClick={()=>{SetQuestuionsInBody([...QuestuionsInBody.filter(ele=>ele.id !== item.id),{
                                        id:item.id,
                                        question:EditQuestion,
                                        degree:EditDegree,
                                        choase:item?.choase,
                                        answer:item.answer,
                                        type:item.type,
                                    }])  ; setEditQuestionToggle(!EditQuestionToggle) }}>حفظ التعديلات</button>
                                    </div>
                                }
                                </div>
                            </div>
                        </>
                    })
                }
    </>
  )
}
