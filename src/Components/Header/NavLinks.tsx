'use client'
import Link from 'next/link'
import {  useState } from 'react'
import { IoIosMenu,IoMdClose } from 'react-icons/io'
import style from './Header.module.css'
import LoginForm from './LoginForm'
import { TokenInterFace, UserPayload } from '@/Interfaces/InterFaces'

export default function NavLinks({user}:{user:UserPayload | null}) {
   const [toggle,setToggle]= useState(false)

  return (
    <div className='text-black'>
        {
           toggle?
           <IoMdClose onClick={()=>setToggle(!toggle)} className="text-3xl lg:hidden block cursor-pointer"/>:
           <IoIosMenu onClick={()=>setToggle(!toggle)} className="text-3xl lg:hidden block cursor-pointer"/>
            }
          <div className='h-fit'>
          <div className={`${style.toggleDown} `}
          style={{
            clipPath:toggle && 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' || ''
          }}
          >
            
            <ul className='  rounded p-2 flex flex-col lg:flex-row'>
              <Link onClick={()=>setToggle(false)} className={'font-bold text-white my-2 mx-3 '} href="/">الرئيسية</Link>
              <Link onClick={()=>setToggle(false)} className={'font-bold text-white my-2 mx-3 '} href="/moshaf">المصحف</Link>
              <Link onClick={()=>setToggle(false)} className={'font-bold text-white my-2 mx-3 '} href="/booksound">المكتبة</Link>
              <Link onClick={()=>setToggle(false)} className={'font-bold text-white my-2 mx-3 '} href="/articles">المقالات</Link>
              <Link onClick={()=>setToggle(false)} className={'font-bold text-white my-2 mx-3 '} href="/about">من نحن ؟</Link>
              <Link onClick={()=>setToggle(false)} className={'font-bold text-white my-2 mx-3 '} href="/contact">تواصل معنا</Link>
              
            </ul>

            <LoginForm userFromToken={user as unknown as TokenInterFace} setToggle={setToggle} toggle={toggle}/>
          </div>
          </div>
    </div>
  )
}
