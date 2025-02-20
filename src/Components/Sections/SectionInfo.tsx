import { SectionInterface } from "@/Interfaces/InterFaces";
import DateConvert from "@/Utils/Date";
import Link from "next/link";

export default function SectionInfo({ Section }: { Section: SectionInterface }) {

  return (
    <>
      <div>
        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">معلومات عن القسم:
          <p className="font-bold text-accent_color">{Section?.description} </p>
        </h2>
        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">المواد الموجودة في القسم:
          <p className="font-bold text-slate-500">{Section?.subjects?.length && Section?.subjects?.map((e, i) => <Link key={i} href={`../../subjects/details/${e.id}`} > {e.name} </Link>)} </p>
        </h2>

        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> مدير القسم:
          <p className="font-bold text-green-700">{<Link className="font-bold" href={`../../managers/details/${Section?.manager?.id}`}>{Section?.manager?.name} </Link>} </p>
        </h2>

        <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900"> تاريخ إنشاء القسم:
          <p className="font-bold text-fuchsia-800">{DateConvert(Section?.createdAt)} </p>
        </h2>

      </div>
    </>
  )
}
