import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (

    <footer  className="text-text_color rounded-lg max-w-full shadow bg-background_color mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex justify-between w-full items-start">
          {/**Site Title And Logo*/}
          <Link href="/" className="flex justify-center items-center font-bold text-text_color">
            <Image className="-scale-x-100" alt="logo" width={70} height={50} src={'/Salaf_Logo.png'} />
            <div className="flex flex-col justify-center items-center">
              <p className="inline-block">
                موقع
              </p>
              <span>
                طالب علم
              </span>
            </div>
          </Link>
          {/**Nav Links */}
          <ul className="text-text_color font-bold flex gap-1 flex-wrap">
            <li className="flex justify-center items-center mx-2 ">
              <Link className="text-text_color hover:text-blue-700 font-bold" href="/">الرئيسية</Link>
            </li>
            <li className="flex justify-center items-center mx-2 ">
              <Link className="text-text_color hover:text-blue-700 font-bold" href="/moshaf">المصحف</Link>
            </li>
            <li className="flex justify-center items-center mx-2 ">
              <Link className="text-text_color hover:text-blue-700 font-bold" href="/booksound">المكتبة</Link>
            </li>

          </ul>
        </div>
        <hr className="my-0 border-white  sm:mx-auto  lg:my-8" />
        <span className="block max-w-full text-sm text-text_color sm:text-center">جميع الحقوق محفوظة  ©  {new Date().getFullYear()} <Link href="mailto:abdalla_y2007@yahoo.com/" className="hover:underline text-orange-600 font-bold text-lg">موقع طالب علم™ </Link> </span>
      </div>
    </footer>


  )
}
