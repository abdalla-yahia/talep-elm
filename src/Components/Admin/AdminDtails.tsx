import Link from "next/link";
import DateConvert from "@/Utils/Date";
import { Admins } from "@prisma/client";
import Image from "next/image";
import * as img from '../../../public/avatar/index'
export default function AdminDtails({admin}:{admin:Admins}) {
  return (
    <>
    <Link href={`./admins/details/${admin.id}`} className="bg-gray-300 text-gray-700 cursor-pointer w-full md:w-1/2 lg:w-1/3 min-h-36 text-center p-1 rounded flex flex-col ">
     <div key={admin.id} >
        <div className="flex justify-between">
          <div>
          <div className="flex ">
            <span  className="px-2">الاسم :</span>
            <span className="line-clamp-4">{admin?.name}</span>
          </div>
          <div className="flex ">
            <span className="px-2">النوع : </span>
            <span className="line-clamp-4">{admin?.gender === 'MALE'?'ذكر':'أنثى'}</span>
          </div>
          <div className="flex ">
            <span  className="px-2">رقم الهاتف :</span>
            <span className="line-clamp-4">{admin?.telephone}</span>
          </div>
          <div className="flex ">
            <span  className="px-2">رقم المجموعة :</span>
            <span className="line-clamp-4">{admin?.groupId}</span>
          </div>
          <div className="flex ">
            <span  className="px-2">تاريخ التسجيل :</span>
            <span className="line-clamp-4">{DateConvert(admin?.createdAt)}</span>
          </div>
          </div>
          <Image height={480} width={80} src={admin?.image || (admin?.gender === 'MALE'?img.male_admin:img.female_admin) } alt="admin-image"  />
        </div>

        <div className="details w-full bg-red-200 min-h-10">
            
        </div>
        </div>
        </Link>
    </>
  )
}
