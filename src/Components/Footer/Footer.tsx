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
              <div className=" max-w-full flex justify-center items-center md:block lg:block  text-sm text-gray-200 text-center">تم تصميم وتطوير الموقع بواسطة  
                <Link href="https://www.linkedin.com/in/abdalla-yahia/" target="_blank" className="hover:underline text-blue-700 font-bold text-lg flex justify-center items-center">م / عبدالله يحيى 
                  <span className="text-red-600">™</span>
                  <span className=" max-w-full text-sm text-gray-200 sm:text-center">جميع الحقوق محفوظة  ©</span>
                    </Link><span> للتواصل: 
                      <icon.FaWhatsapp className="text-green-700 inline-flex mx-2"/>
                      <Link href="https://wa.me/201211100554?text=مرحباً%مهندس/%20!!%عبدالله%أرغب%في%20التواصل%20معكم%20لتطوير%20موقع" target="_blank">01211100554</Link></span> 
              </div>
      <br></br>

    </footer>


  )
}
