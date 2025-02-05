'use client'
import {ErrorHandelling} from '@/Interfaces/InterFaces';
import Link from 'next/link';
import { MdError } from "react-icons/md";

export default function Error({error,reset}:ErrorHandelling) {
  return (
    <>
    <div className='w-full flex justify-center items-center flex-col gap-7 absolute top-1/3 '>
    <h1 className='font-bold text-4xl text-red-600 flex justify-center flex-col items-center'>
      ثمة خطأ حدث !!
      <MdError/>
      </h1>
    <p> {error.message}</p>
    <button className='p-2 bg-green-500 rounded-md' onClick={()=>reset()}>حاول مجدداً</button>
    <Link  className='underline text-green-600 font-bold text-2xl' href={'/'}>إذهب إلى الرئيسيه</Link>
    </div>
    </>
  )
}
