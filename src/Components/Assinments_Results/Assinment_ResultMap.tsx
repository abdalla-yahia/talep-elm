import { AllAssinmentInterface } from "@/Interfaces/InterFaces";
import { fetchAssinments } from "@/lib/Actions/AssinmentsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function Assinment_ResultMap() {
  const {AllAssinments}  = useAppSelector(state=>state.assinment) as unknown as {AllAssinments: {data:AllAssinmentInterface[]}};
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAssinments())
  },[dispatch])
  return (
    <>

    <div className="w-full flex flex-col gap-2 p-2">
      <div className="table ">
        <div className="table-row-group bg-slate-300 text-gray-700">
          <span className="table-cell text-center border-1 border-blue-500">مسلسل</span>
          <span className="table-cell text-center border-1 border-blue-500">التكليف</span>
          <span className="table-cell text-center border-1 border-blue-500">المادة</span>
          <span className="table-cell text-center border-1 border-blue-500">المحاضرة</span>
          <span className="table-cell text-center border-1 border-blue-500">عدد الطلاب</span>
          <span className="table-cell text-center border-1 border-blue-500">نسبة النجاح</span>
        </div>
        {
        AllAssinments?.data?.length > 0 && AllAssinments?.data?.map((assinment, index:number) => 

          <div key={index} className={`${index % 2 === 0 ? 'bg-yellow-100 text-blue-800' :'bg-blue-100 text-red-600'} table-row-group text-red-800`}>
          <span className="table-cell text-center border-1 border-blue-500">{index + 1}</span>
          <span className="table-cell text-center border-1 border-blue-500"><Link className="border-none bg-transparent hover:text-blue-500  transition-all" href={`./assinments/info/${assinment?.id}`}>{assinment?.name}</Link></span>
          <span className="table-cell text-center border-1 border-blue-500"><Link className="border-none bg-transparent hover:text-blue-500  transition-all" href={`./subjects/details/${assinment?.Subjects?.id}`}>{assinment?.Subjects?.name} </Link></span>
          <span className="table-cell text-center border-1 border-blue-500"><Link className="border-none bg-transparent hover:text-blue-500  transition-all" href={`./lessons/details/${assinment?.Lessons?.id}`}>{assinment?.Lessons?.name} </Link></span>
          <span className="table-cell text-center border-1 border-blue-500">{assinment?.AssinmentResult?.length} </span>
          <span className="table-cell text-center border-1 border-blue-500"> {((assinment?.AssinmentResult  as unknown as AllAssinmentInterface[])?.filter(el=>el.score as unknown as number >= ((assinment?.assinmentbody?.questions  as unknown as AllAssinmentInterface[])?.map(fir=>+fir?.degree).reduce((arc,curr)=>arc+curr) * 0.75) ).length / (assinment?.AssinmentResult  as unknown as AllAssinmentInterface[])?.length * 100).toFixed(2)} %</span>
        {
          
        }
       
        </div>
        )}
      </div>
    </div>
    </>
  )
}
