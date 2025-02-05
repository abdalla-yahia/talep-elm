import ManagerDtails from "./ManagerDtails";
import { Manager } from '@prisma/client';


export default function ManagerInformationCardPage({Customer}:{Customer:Manager[]}) {

  return (
    <div className='flex w-full justify-center items-center gap-2 flex-wrap'>
    {Customer?.map( (Manager)=>
      <ManagerDtails manager={Manager} key={Manager.id}/>
    ) }
    </div>
  )
}
