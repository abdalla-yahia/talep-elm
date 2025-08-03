import Link from "next/link";
import * as icon from '@/Components/Icons/icons'
export default function ContactPage() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 w-full flex flex-col justify-center items-center mt-3 ">
            <div className="flex justify-center items-center w-full">
            <h1 className="text-5xl my-5 text-blue-500 drop-shadow shadow-orange-400"> تواصل معنا </h1>
            </div>
            <ul className="w-full  flex flex-col gap-3 p-4 justify-between items-center">
              <li  className="flex justify-center items-center gap-3 hover:rotate-6 transition-all">
                <Link href={'https://soundcloud.com/26tnfbxs3af8/'} className="flex text-orange-700 text-2xl gap-2 justify-center items-center ">
                <icon.FaSoundcloud className="text-orange-700 text-2xl"/>
                <h2>صفحتنا على ساوند كلاود </h2>
                </Link>
              </li>
              <li  className="flex justify-center items-center gap-3 hover:rotate-6 transition-all">
                <Link href={'https://www.youtube.com/@---cq6vv'} className="flex text-red-700 text-2xl gap-2 justify-center items-center ">
                <icon.FaYoutube className="text-red-700 text-2xl"/>
                صفحتنا على يوتيوب 
                </Link>
              </li>
              <li  className="flex justify-center items-center gap-3 hover:rotate-6 transition-all">
                <Link href={'https://x.com/Khaled_Aboyahia'} className="flex text-gray-400 text-2xl gap-2 justify-center items-center ">
                <icon.FaXTwitter className="text-gray-800 text-2xl"/>
                صفحتنا على إكس 
                </Link>
              </li>
              <li  className="flex justify-center items-center gap-3 hover:rotate-6 transition-all">
                <Link href={'https://t.me/Khaled_Mansour0'} className="flex text-blue-400 text-2xl gap-2 justify-center items-center ">
                <icon.FaTelegramPlane className="text-blue-400 text-2xl"/>
                صفحتنا على تيليجرام 
                </Link>
              </li>
              <li className="flex justify-center items-center gap-3 hover:rotate-6 transition-all">
                <Link href={'https://whatsapp.com/'} className="flex text-green-700 text-2xl gap-2 justify-center items-center ">
                <icon.FaWhatsapp className="text-green-700 text-2xl"/>
                صفحتنا على الواتس آب 
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
