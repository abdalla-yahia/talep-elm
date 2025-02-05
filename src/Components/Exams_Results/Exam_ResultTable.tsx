import * as icon from '@/Components/Icons/icons'
import { ExamResultInterface } from '@/Interfaces/InterFaces'
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key } from 'react'

export default function ExamResultTable({sorce}:{sorce:ExamResultInterface}) {
  return (
    <div className="w-full text-gray-700 border-black flex justify-center items-center">

         <div className="table w-full bg-green-200 border-1 border-blue-400">
              <div className="table-row-group">
                <span className=" text-sm p-0 hidden md:table-cell lg:table-cell text-center -rotate-45 md:-rotate-90 ">مسلسل</span>
                <span className="border-1 border-blue-400  py-2  table-cell text-center  ">السؤال</span>
                <span className="border-1 border-blue-400  py-2  table-cell text-center  ">الإختيار</span>
                <span className="border-1 border-blue-400  py-2  table-cell text-center  ">الإجابة الصحيحة</span>
                <span className="border-1 border-blue-400  py-2  table-cell text-center  "> إجابتك</span>
                <span className="border-1 border-blue-400  py-2 hidden md:table-cell lg:table-cell text-center "> درجة السؤال</span>
              </div>
                {
          sorce?.Exams?.Exambody?.questions?.map((e,i)=>
            <>
            <div key={i} className={`${i % 2 == 0 ? 'bg-yellow-50  text-purple-600':'bg-blue-100 text-orange-700'} table-row-group `}>
                  <span className="border-1 border-blue-400  hidden md:table-cell lg:table-cell text-center ">{e.id}</span>
                  <span className="border-1 border-blue-400  table-cell text-center ">{e.question}</span>
                  <span className="border-1 border-blue-400  table-cell text-center ">
                  {e.choase.map((ch,i)=><span key={i} className="flex flex-col bg-transparent border-none">{ch}</span>)}
                  </span>
                  <div className=" border-1 border-blue-400  table-cell text-center ">
                  {e?.type === 'checkbox'? e?.answer?.map((ss,i)=><span className="bg-transparent border-none flex flex-col" key={i}>{ss}</span> ):e?.answer}
                  </div>
                  {/* Show user answer */}
                  <div className=" border-1 border-blue-400  table-cell text-center items-center ">
                {
                sorce?.answersbody && JSON.parse(sorce?.answersbody).filter((ele: { id: string })=>
                  ele.id === e.id
                )[0]?.type === 'checkbox'? 
                //If type is checkbox
                <div className="bg-transparent border-none">
                {(JSON.parse(sorce?.answersbody).filter((ele: { id: string })=>
                  ele.id === e.id
                )[0]?.answer.length < e.answer.length?
                // If answer is less than the number of choices
                <div className="flex flex-col bg-transparent border-none  items-center">{
                e?.answer?.map((ans,i)=>
                { return <div key={i} className="flex flex-col bg-transparent border-none">
                   {(JSON.parse(sorce?.answersbody)?.filter((ele: { id: string })=>
                    ele.id === e.id
                  )[0])?.answer?.includes(ans)?
                  <span className="text-green-700 flex bg-transparent border-none justify-center items-center ">
                    {ans}
                    <icon.GiCheckMark  className="text-green-700 bg-transparent border-none"/>
                    </span>
                    :<span className="text-gray-300 relative flex bg-transparent border-none justify-center items-center ">
                    {ans} 
                    <icon.FaXmark  className="text-red-700 absolute bg-transparent border-none"/>
                    </span>}
                    </div>
                }
                  )
                }</div>
                : // If answer is equal to the number of choices or more
                <div className="flex flex-col bg-transparent border-none justify-center items-center">{
                JSON.parse(sorce?.answersbody).filter((ele: { id: string })=>
                  ele.id === e.id
                )[0]?.answer.map((it: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined,i: Key | null | undefined)=>
                  {return e?.answer?.includes(it as unknown as string) ?  
                  (<span key={i} className="text-green-700 flex bg-transparent border-none justify-center mb-2 gap-2  items-center ">
                    {it}
                    <icon.GiCheckMark  className="text-green-700 bg-transparent border-none"/>
                    </span>)
                    :<span key={i} className="text-gray-600 flex bg-transparent border-none justify-center mb-2 gap-2  items-center ">
                    {it} 
                    <icon.FaXmark  className="text-red-700 bg-transparent border-none"/>
                    </span>
                    
                  }
                ) 
              }</div>
              )}
              </div>
              : // If type is radio or textarea
              <div className="flex flex-col bg-transparent border-none justify-center items-center">{
                (JSON.parse(sorce?.answersbody).filter((ele: { id: string })=>
                  ele.id === e.id
                )[0]?.answer === e.answer ? <span className="text-green-700 gap-2 flex bg-transparent border-none justify-center items-center ">{JSON.parse(sorce?.answersbody).filter((ele: { id: string })=>
                  ele.id === e.id
                )[0]?.answer }
                <icon.GiCheckMark  className="text-green-700 bg-transparent border-none"/>
                </span> : 
                <span className="text-red-700 gap-2 flex bg-transparent border-none justify-center items-center ">{JSON.parse(sorce?.answersbody)?.filter((ele: { id: string })=>
                  ele.id === e.id
                )[0]?.answer }
              <icon.FaXmark  className="text-red-700 bg-transparent border-none"/>
                </span>)
                  }</div>
                 }
                </div>
                <span className=" border-1 border-blue-400  hidden md:table-cell lg:table-cell text-center">{e.degree} درجة</span>
                </div>
            </>
          )
        }
            </div> 

      </div>
  )
}
