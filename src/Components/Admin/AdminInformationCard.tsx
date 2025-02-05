import AdminDtails from "./AdminDtails";
import { Admins } from '@prisma/client';


export default function AdminInformationCardPage({Customer}:{Customer:Admins[]}) {

  return (
    <>
    {Customer?.map( (admin)=>
     <AdminDtails admin={admin} key={admin.id}/>
    ) }
    </>
  )
}
