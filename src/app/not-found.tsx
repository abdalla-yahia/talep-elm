import Link from "next/link";

export default function NotFoundPage() {
  return (

    <section className="flex w-full justify-start items-start gap-1">
      
      <div className=" flex justify-center items-center flex-col gap-12 rounded-md p-4  w-full mx-auto">
      
      <h1 className="text-5xl font-bold text-orange-700">404</h1>
      <h2 className="text-2xl font-bold text-red-700">نعتذر لكم !! هذا المسار غير موجود</h2>
      <Link href={'/'} className="p-2 bg-blue-600 rounded hover:bg-blue-800">الذهاب إلى الرئيسيه</Link>
      </div>
    </section>

  )
}
