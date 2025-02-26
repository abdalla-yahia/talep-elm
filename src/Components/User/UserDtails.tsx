import Image from "next/image";
import * as images  from '../../../public/avatar';
import Link from "next/link";
import DateConvert from "@/Utils/Date";
import { AllUserInterface } from "@/Interfaces/InterFaces";

export default function UserDtails({user}:{user:AllUserInterface}) {
  return (
    <>
    <Link href={`./students/details/${user.id}`} className="bg-gray-300 text-gray-700 cursor-pointer w-full md:w-1/2 lg:w-1/3 min-h-36 text-center p-1 rounded flex flex-col ">
     <div key={user.id} >
        <div className="flex justify-between">
          <div>
          <div className="flex ">
            <span  className="px-2">الاسم :</span>
            <span className="line-clamp-4">{user?.name}</span>
          </div>
          <div className="flex ">
            <span className="px-2">النوع : </span>
            <span className="line-clamp-4">{user?.gender === 'MALE'?'ذكر':'أنثى'}</span>
          </div>
          <div className="flex ">
            <span  className="px-2">رقم الهاتف :</span>
            <span className="line-clamp-4">{user?.telephone}</span>
          </div>
          <div className="flex ">
            <span  className="px-2">رقم المجموعة :</span>
            <span className="line-clamp-4">{user?.groupId}</span>
          </div>
          <div className="flex ">
            <span  className="px-2">تاريخ التسجيل :</span>
            <span className="line-clamp-4">{DateConvert(user?.createdAt)}</span>
          </div>
          </div>
          <Image loading="lazy" height={480} width={80} src={user?.image || (user?.gender === 'MALE'?images.male_admin:images.female_user2) } alt="user-image"  />
        </div>

        <div className="details w-full bg-red-200 min-h-10">
            
        </div>
        </div>
        </Link>
    </>
  )
}
