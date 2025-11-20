import Image from "next/image";
import Link from "next/link";
import * as icon from '@/Components/Icons/icons'
export default function Footer() {
  return (

    <footer  className="text-text_color rounded-lg max-w-full shadow bg-second_background_color mt-4">
      <div className="w-full max-w-screen-xl mx-auto  p-2 md:py-8">
        <div className="flex justify-between w-full items-start">
          {/**Site Title And Logo*/}
          <Link href="/" className="flex justify-center items-center font-bold text-text_color">
            <Image loading="lazy" className="-scale-x-100" alt="logo" width={70} height={50} src={'/Salaf_Logo.png'} />
            <div className="flex flex-col justify-center items-center">
              <p className="inline-block">
                موقع
              </p>
              <span>
                طالب علم شرعي
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
        <hr className="my-0 border-white  sm:mx-auto z-0 lg:my-8" />
        <span className="flex justify-center items-center md:block max-w-full text-sm text-text_color sm:text-center">جميع الحقوق محفوظة  ©  {new Date().getFullYear()} <Link href="mailto:abdalla_y2007@yahoo.com/" className="hover:underline text-orange-600 font-bold text-lg">موقع طالب علم™ </Link> </span>
      </div><br></br>
      {/**Site Owner */}
              <div className="w-full flex flex-col md:flex-row justify-center items-center text-xs text-gray-500 gap-1">
                      <span>Developed by</span>
                      <Link
                        href="https://www.linkedin.com/in/abdalla-yahia/"
                        target="_blank"
                        className="hover:underline text-blue-600 font-medium flex items-center gap-1"
                      >
                        Eng. Abdalla Yahia <span className="text-red-500">™</span>
                      </Link>
                      <span className="opacity-60">© All Rights Reserved</span>
                      <span className="flex items-center gap-1">
                        | Contact:
                        <icon.FaWhatsapp className="text-green-600" />
                        <Link
                          href="https://wa.me/201211100554?text=Hello%20Eng.%20Abdalla,%20I%20would%20like%20to%20connect%20with%20you%20for%20website%20development."
                          target="_blank"
                          className="hover:underline text-gray-500"
                        >
                          01211100554
                        </Link>
                      </span>
                  </div>
      <br></br>

    </footer>


  )
}
