import TeacherDtails from "./TeacherDtails";
import { Teachers } from '@prisma/client';


export default function TeacherInformationCardPage({Customer}:{Customer:Teachers[]}) {

  return (
    <div className='flex justify-center w-full items-center gap-2 flex-wrap'>
    {Customer?.map( (Teacher)=>
     <TeacherDtails Teacher={Teacher} key={Teacher.id}/>
    ) }
    </div>
  )
}
