import DateConvert from "@/Utils/Date";
import { Articles } from "@prisma/client";
import style from './Articles.module.css';


export default function ArticleInfo({Article}:{Article:Articles}) {

  return (
    <>
     <div className={`${style.articleMain} 'bg-slate-300 max-w-full rounded`}>
      <h1 className="text-center flex gap-2 text-xl justify-center items-center my-3 font-bold text-gray-900"> 
        <p className="font-bold text-blue-500 shadow-sm w-full">{Article?.title} </p>
        </h1>
      <h2 className="text-center flex flex-col  gap-2 text-xl my-3 font-bold "> 
        <h3 className="text-red-500 text-xl ">محتوى  المقال </h3>
        <p className="font-bold flex justify-center items-center flex-col text-justify text-gray-900 px-3">{Article?.content?.slice(0,Article?.content?.indexOf('وكتبه'))} 
          <span className="text-red-500 flex justify-center items-center text-center w-[50%]">
            {
              Article?.content?.slice(Article?.content?.indexOf('وكتبه'),)
            }
          </span>
        </p>
        </h2>

      <h2 className="text-center  flex gap-2 text-sm  my-3 font-bold text-gray-900"> تاريخ نشر المقال: 
        <p className="font-bold text-fuchsia-800">{DateConvert(Article?.createdAt)} </p>
        </h2>

    </div>

    </>
  )
}
