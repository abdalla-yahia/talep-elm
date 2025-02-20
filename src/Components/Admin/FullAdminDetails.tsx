import Image from "next/image";
import * as images from '../../../public/avatar';
import DateConvert from "@/Utils/Date";
import { Admins } from "@prisma/client";

export default function FullAdminDetails({ Admin }: { Admin: Admins }) {

  return (
    <>
      <div key={Admin?.id} className={`${Admin?.gender === 'MALE' ? 'bg-slate-400 shadow' : 'bg-blue-300 shadow'} w-full min-h-36 text-center p-1 rounded flex flex-col mb-6  `}>
        <div className="w-full text-center  flex justify-between flex-wrap flex-row-reverse md:flex-col items-start sm:items-center py-5 ">
          <Image className="w-1/3 shadow shadow-orange-400" height={480} width={180} src={Admin?.image || (Admin?.gender === 'FEMALE' ? images.female_admin : images.male_admin)} alt="Admin" />

          <div className="w-full flex flex-col px-3 justify-start items-start lg:w-2/3  ">
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">الاسم :</span>
              <span className="lg:text-2xl font-bold">{Admin?.name}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color lg:text-xl">النوع : </span>
              <span className="lg:text-2xl font-bold">{Admin?.gender === 'FEMALE' ? 'أنثى' : 'ذكر'}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">رقم الهاتف :</span>
              <span className="lg:text-2xl font-bold">{Admin?.telephone}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">البريد الإلكتروني :</span>
              <span className="lg:text-2xl font-bold">{Admin?.email}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">رقم المجموعة :</span>
              <span className="lg:text-2xl font-bold">{Admin?.groupId}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> الوظيفة :</span>
              <span className="lg:text-2xl font-bold">{Admin?.gender === 'MALE' ? 'مشرف' : 'مشرفة'}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> العنوان :</span>
              <span className="lg:text-2xl font-bold">{Admin?.address}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> العمر :</span>
              <span className="lg:text-2xl font-bold">{Admin?.age}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> المؤهل :</span>
              <span className="lg:text-2xl font-bold">{Admin?.education}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> يوم التسجيل :</span>
              <span className="lg:text-2xl font-bold">{DateConvert(Admin?.createdAt)}</span>
            </div>

          </div>
        </div>

        <div className="details w-full bg-fuchisa-700 min-h-20">

        </div>
      </div>
    </>
  )
}
