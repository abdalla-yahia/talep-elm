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
    const guidelines = localStorage.getItem("guidelines");

  return (
    <div className='text-text_color'>

      {
        toggle ?
        
          <IoMdClose onClick={() => setToggle(!toggle)} className="text-3xl lg:hidden block cursor-pointer" />
    
         :
         (
          <div className='relative flex justify-center items-center flex-col'>
          <IoIosMenu  onClick={() => {setToggle(!toggle);localStorage.setItem('guidelines','true')}} className="text-3xl lg:hidden block cursor-pointer" />
              <div className="guide-lines absolute top-9 left-0  z-50 flex justify-center items-center">
                  {!guidelines ? (
                    <div className="w-full flex justify-center text-red-700 items-center flex-col">
                      <Image className=" animate-bounce" src={'/guide.png'} alt="guide-image" width={80} height={80}/>
                      اضغط   
                    </div>
                    ):""}
                </div>
          </div>
         )
      }
      <div className='h-fit'>
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
