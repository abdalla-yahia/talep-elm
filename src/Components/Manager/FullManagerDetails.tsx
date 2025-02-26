import Image from "next/image";
import * as images from '../../../public/avatar';
import DateConvert from "@/Utils/Date";
import { Manager } from "@prisma/client";

export default function FullManagerDetails({ Manager }: { Manager: Manager }) {

  return (
    <>
      <div key={Manager?.id} className={`${Manager?.gender === 'MALE' ? 'bg-slate-400 shadow' : 'bg-blue-300 shadow'} w-full min-h-36 text-center p-1 rounded flex flex-col mb-6  `}>
        <div className="w-full text-center  flex justify-between flex-wrap flex-row-reverse md:flex-col items-start sm:items-center py-5 ">
          <Image loading="lazy" className="w-1/3 shadow shadow-orange-400" height={480} width={180} src={Manager?.image || (Manager?.gender === 'FEMALE' ? images.female_manager : images.mal_manager)} alt="Manager" />

          <div className="w-full flex flex-col px-3 justify-start items-start lg:w-2/3  ">
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">الاسم :</span>
              <span className="lg:text-2xl font-bold">{Manager?.name}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color lg:text-xl">النوع : </span>
              <span className="lg:text-2xl font-bold">{Manager?.gender === 'FEMALE' ? 'أنثى' : 'ذكر'}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">رقم الهاتف :</span>
              <span className="lg:text-2xl font-bold">{Manager?.telephone}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">البريد الإلكتروني :</span>
              <span className="lg:text-2xl font-bold">{Manager?.email}</span>
            </div>

            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> الوظيفة :</span>
              <span className="lg:text-2xl font-bold">{Manager?.gender === 'MALE' ? 'مدير' : 'مديرة'}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> العنوان :</span>
              <span className="lg:text-2xl font-bold">{Manager?.address}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> العمر :</span>
              <span className="lg:text-2xl font-bold">{Manager?.age}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> المؤهل :</span>
              <span className="lg:text-2xl font-bold">{Manager?.education}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> يوم التسجيل :</span>
              <span className="lg:text-2xl font-bold">{DateConvert(Manager?.createdAt)}</span>
            </div>

          </div>
        </div>
        <div className="details w-full bg-fuchisa-700 min-h-20">

        </div>
      </div>
    </>
  )
}
