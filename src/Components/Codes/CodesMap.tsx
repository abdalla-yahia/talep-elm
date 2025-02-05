import Role from "@/Utils/Role";
import * as icon from '@/Components/Icons/icons';
import CodesHook from "./CodesHook";
import DateConvert from "@/Utils/Date";
import { Codes } from "@prisma/client";

export default function CodessMap({AllCodes}:{AllCodes:Codes[]}) {
  const  {UserLogedData,DeleteCodesHandeller} = CodesHook()
  return (
    <>
    {
        AllCodes?.map((Codes, index:number) => 
          <div key={index} className="relative w-full my-2">
            <div  key={index} className={`${ (( (new Date() as unknown as number) - (new Date(Codes?.createdAt) as unknown as number) ) /1000 /60 )  >= 10 ?'bg-red-300 opacity-50':'bg-green-100'}   text-gray-700  w-full cursor-pointer min-h-36 text-center p-3 rounded flex flex-col`}>
               <p className="text-green-600 self-start">{`( ${Codes?.id} )`}</p>
               <p className="text-sm text-blue-700"> ايميل المستخدم : {Codes?.email}</p>
               <p className="text-sm text-green-700"> وظيفة المستخدم : {Codes?.role}</p>
               <p className="text-sm text-gray-700">تاريخ ارسال الكود : {DateConvert(Codes?.createdAt)}</p>
               <p className="text-sm text-gray-700 w-full flex justify-center items-center">صلاحية الكود : 
              {
               (( (new Date() as unknown as number) - (new Date(Codes?.createdAt) as unknown as number) ) /1000 /60 )  >= 10 ?<span className="text-red-600 font-bold flex justify-center items-center">كود منتهي الصلاحية <icon.FaXmark className="text-red-600" /></span> :<span className="text-green-600 font-bold  flex justify-center items-center">كود  صالح لللإستخدام <icon.GiCheckMark className="text-green-600" /></span>
                  
                }
                
               </p>
                </div>
                {/* Setting Buttons*/}
                {Role(UserLogedData?.role as unknown as string) === 5 && <div className="bg-red-100 w-full gap-1 rounded py-1 flex justify-between px-2">
                    <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                      <label htmlFor="delete-Codes" className="text-sm flex gap-1  text-gray-400">حذف الكود</label>
                      <icon.CiTrash  id="delete-Codes"  title="حذف الكود" className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer" onClick={()=>DeleteCodesHandeller(Codes?.id as unknown as string)} />
                    </div>
                </div>}
      </div>
        )
      }
    </>
  )
}
