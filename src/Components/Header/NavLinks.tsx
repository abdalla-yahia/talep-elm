'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import style from './Header.module.css'
import LoginForm from './LoginForm'
import { TokenInterFace, UserPayload } from '@/Interfaces/InterFaces'
import Image from 'next/image'

export default function NavLinks({ user }: { user: UserPayload | null }) {
  const [toggle, setToggle] = useState(false)
    const guidelines = sessionStorage.getItem("guidelines");
  //Close DrobDown Menu on click outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.toggleDown')&& !target.closest('.open-drob-down')) {
      setToggle(false);
    }
  });
  return (
    <div className='text-text_color'>
      <div className='relative flex justify-center items-center flex-col'>
        {
          toggle?
            
           <IoMdClose onClick={()=>{setToggle(!toggle);sessionStorage.setItem('guidelines','true')}} className="text-3xl lg:hidden block cursor-pointer"/>:
                     <IoIosMenu  onClick={() => {setToggle(true)}} className="open-drob-down text-3xl lg:hidden block cursor-pointer" />
                  }
                  <div className={`${style.guide_lines} absolute top-9 left-0  z-50 flex justify-center items-center`}>
                             {!guidelines ? (
                               <div className="w-full flex justify-center text-white items-center flex-col">
                                 <Image className=" animate-bounce" src={'/guide.png'} alt="guide-image" width={80} height={80}/>
                                 <span className="text-center text-sm animate-pulse">اضغط</span>
                               </div>
                               ):""}
                           </div>
                  </div>
          <div className='h-fit toggleDown'>
        <div className={`${style.toggleDown} `}
          style={{
            clipPath: toggle && 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' || ''
          }}
        >

          <ul className='  rounded p-2 flex flex-col lg:flex-row'>
            <Link onClick={() => setToggle(false)} className={'font-bold text-text_color my-2 mx-3 '} href="/">الرئيسية</Link>
            <Link onClick={() => setToggle(false)} className={'font-bold text-text_color my-2 mx-3 '} href="/moshaf">المصحف</Link>
            <Link onClick={() => setToggle(false)} className={'font-bold text-text_color my-2 mx-3 '} href="/booksound">المكتبة</Link>
            <Link onClick={() => setToggle(false)} className={'font-bold text-text_color my-2 mx-3 '} href="/articles">المقالات</Link>
            <Link onClick={() => setToggle(false)} className={'font-bold text-text_color my-2 mx-3 '} href="/about">من نحن ؟</Link>
            <Link onClick={() => setToggle(false)} className={'font-bold text-text_color my-2 mx-3 '} href="/contact">تواصل معنا</Link>

          </ul>

          <LoginForm userFromToken={user as unknown as TokenInterFace} setToggle={setToggle} toggle={toggle} />
        </div>
      </div>
    </div>
  )
}
