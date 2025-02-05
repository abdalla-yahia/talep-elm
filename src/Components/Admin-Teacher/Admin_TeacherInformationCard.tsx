import Admin_TeacherDtails from "./Admin_TeacherDtails";
import { AdminTeacher } from '@prisma/client';


export default function AdminInformationCardPage({Customer}:{Customer:AdminTeacher[]}) {

  return (
    <div className='flex justify-center w-full items-center gap-2 flex-wrap'>
    {Customer?.map( (Admin_Teacher)=>
      <Admin_TeacherDtails admin_teacher={Admin_Teacher} key={Admin_Teacher.id}/>
    ) }
    </div>
  )
}
