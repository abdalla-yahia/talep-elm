
import { AssinmentResultInterface } from "@/Interfaces/InterFaces";
import AssinmentResultTable from "./Assinment_ResultTable";

export default  function Assinment_ResultInfo({Assinment_Result}:{Assinment_Result:AssinmentResultInterface}) {
return (
    <>
    {
      Assinment_Result &&
      <>
      <div className="w-full   flex items-start justify-center">
        <div className="flex gap-3 flex-col md:flex-row lg:flex-row justify-center items-center font-bold text-2xl">
        <h1 className="text-red-600">درجة <span className="text-blue-200">{Assinment_Result?.User?.name}</span> فى هذا الإختبار : </h1>
        <h2 className="text-blue-600  ">{Assinment_Result?.score} 
          <span className="text-gray-600">درجة</span>      
          </h2> 

        </div>
      </div>
      { <AssinmentResultTable sorce={Assinment_Result}/>}
      </>
    }
    </>
  )
}
