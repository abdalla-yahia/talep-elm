'use client'
import { lazy, Suspense } from "react";
import CreatePost from "./CreatePost";
import LeftSidbar from "./LeftSidbar";
import Newsbar from "./Newsbar";
const RadioQuran = lazy(()=>import( "./RadioQuran"));
const PrayerTimes = lazy(()=>import( "./PrayerTimes"));
const ArticlesHomePage = lazy(()=>import("./ArticlesHomePage"));

export default function HomePage() {
  
  return (
    
      <section className="container overflow-hidden h-full flex justify-center items-center flex-col">
        
        <div className=" w-[120%] relative -left-[6%]">
          <div className="col-md-12">
            <Newsbar />
          </div>
        </div>
        <section className=" flex justify-between items-start gap-2">
          <aside className="hidden  h-screen md:flex lg:flex  md:w-[15%] lg:w-[15%] flex-col justify-start my-2  items-center bg-background_color rounded ">
          <Suspense fallback={<div>يتم التحميل...</div>}>
            <PrayerTimes />
          </Suspense>
          </aside>
          <section  className="w-[100%] overflow-y-auto scrollbar-hide max-h-screen md:w-[70%] lg:w-[70%] flex flex-col justify-start items-center  rounded ">
            <div className="text-center my-1 w-full">
            <Suspense fallback={<div>يتم التحميل...</div>}>
              <RadioQuran />
              </Suspense>

              <CreatePost />

              <Suspense fallback={<div>يتم التحميل...</div>}>
                <ArticlesHomePage />
              </Suspense>
            </div>
          </section>
          <aside className={`shadow hidden h-screen md:flex lg:flex  md:w-[15%] lg:w-[15%] flex-col justify-start p-2 rounded text-text_color my-2 items-center  bg-background_color`}>
            <LeftSidbar />
          </aside>
        </section>
      </section>
    
  )
}
