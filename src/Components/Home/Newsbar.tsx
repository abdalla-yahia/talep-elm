'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/lib/Actions/NewsActions';
import { News } from '@prisma/client';

export default function Newsbar() {
  const [count, setCount] = useState(1);
  const { AllNews } = useAppSelector(state => state.news) as unknown as { AllNews: { News: News[] } }
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])
  useEffect(() => {
    if (AllNews?.News?.length > 0) {
      AllNews.News.forEach(e => {
        setCount(prev => prev + (e.content?.length || 0));
      });
    }
  }, [AllNews])
  return (
    <>
      {AllNews?.News?.length > 0 && <div className='w-[100%] relative left-[6%] h-9 flex '>
        <span className='bg-red-600 text-text_color absolute h-full z-40 right-[10%] px-2 text-center flex justify-center items-center top-0'>عاجل</span>
        <div className={` animate min-w-[100%] flex flex-nowrap justify-center items-start text-gray-100 h-9 bg-background_color p-2`}>
          <p style={{ animationDuration: `${count / 15}s` }} className={`${style.newsbar} w-[100%] text-nowrap`}>
            {
              AllNews?.News?.length > 0 && AllNews?.News?.map(e => `${e?.content}  . `).join(' ')
            }
          </p>
        </div>
      </div>}
    </>
  )
}
