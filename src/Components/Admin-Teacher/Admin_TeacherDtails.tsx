import Image from "next/image";
import * as images  from '../../../public/avatar';
import Link from "next/link";
import DateConvert from '@/Utils/Date'
import { AdminTeacher } from "@prisma/client";
export default function Admin_TeacherDtails({admin_teacher}:{admin_teacher:AdminTeacher}) {


  return (
    <>
    <Link href={`./admins-teachers/details/${admin_teacher.id}`} className={`${admin_teacher?.gender === 'MALE'? 'bg-gray-300':'bg-purple-200'} text-gray-700 cursor-pointer w-full md:w-1/2 lg:w-1/3 min-h-36 text-center p-1 rounded flex flex-col `}>
     <div key={admin_teacher.id} >
        <div className="flex justify-between">
          <div>
          <div className="flex ">
            <span  className="px-2">الاسم :</span>
            <span className="line-clamp-1">{admin_teacher?.name}</span>
          </div>
          <div className="flex ">
            <span className="px-2">النوع : </span>
            <span className="line-clamp-1">{admin_teacher?.gender === 'MALE'?'ذكر':'أنثى'}</span>
          </div>
          <div className="flex ">
            <span  className="px-2">رقم الهاتف :</span>
            <span className="line-clamp-1">{admin_teacher?.telephone}</span>
          </div>

          </div>
          <Image height={480} width={80} src={admin_teacher?.image || (admin_teacher?.gender === 'MALE'?images.male_admin:images.female_teatcher) } alt="admin_teacher-image"  />
        </div>
        <div className={`${admin_teacher?.gender === 'MALE'?'bg-gray-700 ':'bg-fuchsia-400 '} details flex justify-center items-center w-full min-h-10`}>
        <div className="flex justify-center items-center text-gray-300 text-[12px]">
            <span  className="px-2">تاريخ التسجيل :</span>
            <span className="line-clamp-4">{DateConvert(admin_teacher?.createdAt)}</span>
          </div>
        </div>
        </div>
        </Link>
    </>
  )
}
