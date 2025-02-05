import Role from "@/Utils/Role";
import * as icon from '@/Components/Icons/icons';
import NewsHook from "./NewsHook";
import DateConvert from "@/Utils/Date";
import { CreateNewsInterface } from "@/Interfaces/InterFaces";

export default function NewssMap({News}:{News:CreateNewsInterface[]}) {
  const  {UserLogedData,toggle, setToggle, setEditDescription,NewsId,setNewsId,EditNewsHandeller,DeleteNewsHandeller} = NewsHook()
  return (
    <>
    {
        News?.map((News, index:number) => 
          <div key={index} className="relative w-full my-2">
        
            <div  key={index} className="bg-blue-100   text-gray-700  w-full cursor-pointer min-h-36 text-center p-3 rounded flex flex-col   ">
               <p className="text-green-600 self-start">{`( ${News?.id} )`}</p>
               <h1 className="text-3xl mb-2 text-sh">
                <span className="text-lg text-red-600"> محتوي الخبر : </span>
                 {News?.content}</h1>
               <p className="text-sm text-blue-700">كاتب الخبر : {News?.author?.name}</p>
               <p className="text-sm text-red-700">تاريخ الخبر : {DateConvert(News?.createdAt  as unknown as number )}</p>
                </div>

                      {/* Edite News Box */}
                      {toggle && parseInt(NewsId  as unknown as string ) === News?.id  as unknown as number && <div className="w-full flex z-50  top-0 left-0 flex-col gap-3  justify-start items-start absolute bg-green-200 p-3 rounded ">
                    
                    <div className="flex items-center gap-2 text-gray-700">
                      <h1>محتوي الخبر</h1>
                      <input defaultValue={News?.content} onChange={(e)=>setEditDescription(e.target.value as unknown as string )} type="text" className="rounded px-2" placeholder="ادخل المحتوى الجديد" />
                    </div>
                      <button onClick={()=>{EditNewsHandeller(News?.id as unknown as string )}} className="w-full rounded p-2 bg-green-500 text-xl cursor-pointer text-white shadow-sm ">حفظ التعديلات</button>
                </div>}
              
                {/* Setting Buttons*/}
                {Role(UserLogedData?.role  as unknown as string ) > 1 && <div className="bg-red-100 w-full gap-1 rounded py-1 flex justify-between px-2">
                    <div className=" w-full gap-2 flex  px-3 items-start">
                      <span className="text-sm text-gray-400">تعديل الخبر</span>
                      <icon.FaRegEdit  title="تعديل الخبر" className="self-end text-green-600 hover:text-3xl transition-all cursor-pointer" onClick={()=>{setNewsId(News?.id as unknown as string );setToggle(!toggle)}}/>
                    </div>
                    <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                      <label htmlFor="delete-News" className="text-sm flex gap-1  text-gray-400">حذف الخبر</label>
                      <icon.CiTrash  id="delete-News"  title="حذف الخبر" className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer" onClick={()=>DeleteNewsHandeller(News?.id as unknown as string )}/>
                    </div>
                </div>}
      </div>
        )
      }
    </>
  )
}
