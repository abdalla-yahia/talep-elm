import Image from "next/image";
import * as images from '../../../public/avatar';
import DateConvert from "@/Utils/Date";
import { AllUserInterface } from "@/Interfaces/InterFaces";
export default function FullUserDetails({ user }: { user: AllUserInterface }) {
  return (
    <>
      <div key={user?.id} className={`${user?.gender === 'MALE' ? 'bg-slate-400 shadow' : 'bg-blue-300 shadow'} w-full min-h-36 text-center p-1 rounded flex flex-col mb-6  `}>
        <div className="w-full text-center text-purple-800  flex justify-center flex-wrap flex-row-reverse md:flex-col  items-start py-5 ">

          <Image loading="lazy" className="shadow mb-3 shadow-orange-400 rounded-[10%]" height={480} width={180} src={user?.image || (user?.gender === 'FEMALE' ? images.female_user2 : images.male_admin)} alt="user" />

          <div className="w-full flex flex-col px-3 justify-start items-start lg:w-2/3  ">
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">الاسم :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.name}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color lg:text-xl">النوع : </span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.gender === 'FEMALE' ? 'أنثى' : 'ذكر'}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">رقم الهاتف :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.telephone}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">البريد الإلكتروني :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.email}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">رقم المجموعة :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.groupId}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> الوظيفة :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.gender === 'MALE' ? 'طالب' : 'طالبة'}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> العنوان :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.address}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> العمر :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.age}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> المؤهل :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.education}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> يوم التسجيل :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{DateConvert(user?.createdAt)}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> نتيجة التكليفات :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.AssinmentResult?.length > 0 && user?.AssinmentResult?.map((e, i) => <span key={i}>{`${e.score}  , `}</span>)}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> نتيجة  الإختبارات :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.ExamResult?.length > 0 && user?.ExamResult?.map((e, i) => <span key={i}>{e.score + ' , '}</span>)}</span>
            </div>
            <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
              <span className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> إجمالي النتيجة النهائية :</span>
              <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{(user?.AssinmentResult?.length > 0 && user?.AssinmentResult?.map((e) => +e.score)?.reduce((acc, curr) => +acc + +curr)) as unknown as number + (user?.ExamResult?.length > 0 ? (user?.ExamResult?.map((e) => +e.score)?.reduce((acc, curr) => +acc + +curr)) : 0)}</span>
            </div>
            {/* <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
            <span  className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl"> عدد المواد :</span>
            <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{(user?.UserOnSubject)?.length > 0}</span>
          </div>
          <div className="flex justify-start flex-wrap items-center w-full gap-2 mb-2">
            <span  className="lg:px-2 px-0 font-bold text-text_color  lg:text-xl">  المواد :</span>
            <span className="text-sm text-wrap md:text-xl lg:text-2xl line-clamp-1 font-bold">{user?.UserOnSubject?.map((e,i)=><span key={i}>{e + ' , '}</span>)}</span>
          </div> */}
          </div>
        </div>

        <div className="details w-full bg-fuchisa-700 min-h-20">

        </div>
      </div>
    </>
  )
}
