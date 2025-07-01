import { Chapter } from "@/Interfaces/InterFaces";
import Image from "next/image";
import Link from "next/link";
import * as icon from '@/Components/Icons/icons'
import { useEffect } from "react";
export default function BookInfo({ Book }: { Book: Chapter }) {

 useEffect(()=>{
        document.title = `شرح كتاب ${Book?.title} للشيخ ${Book?.author} بشرح ${Book?.publisher}`;
        document.querySelector('meta[name="description"]')?.setAttribute('content', `شرح كتاب ${Book?.description} للشيخ ${Book?.author} بشرح ${Book?.publisher} - عدد المواد ${Book?.audio_count} مادة`);
        
    }, [Book?.title, Book?.description, Book?.author, Book?.publisher, Book?.audio_count])

    return (
        <div className="w-full overflow-hidden flex flex-col md:flex-row lg:flex-row  md:justify-start lg:justify-start  justify-center items-center  gap-3 mt-2">
            {/* Book Image */}
            <div className="flex justify-center items-center md:justify-start lg:justify-start w-full md:w-fit lg:w-fit">
                <Image loading="lazy" src={Book?.image} width={60} height={60} alt={Book?.title} />
            </div>
            {/* Book Info */}
            <div className="w-full h-full gap-3 flex flex-col md:justify-start lg:justify-start pt-2">
                <div className="flex justify-start text-center text-gray-800 items-center w-full gap-3 flex-nowrap mb-2">
                    <h2>اسم الكتاب :
                        <span className="text-accent_color">{Book?.title}</span>
                    </h2>
                    <h2>المؤلف :
                        <span className="text-accent_color">{Book?.author}</span>
                    </h2>
                    <h2>الناشر :
                        <span className="text-accent_color">{Book?.publisher}</span>
                    </h2>
                </div>
                <div className="flex justify-start text-center text-gray-800 items-center w-full gap-3 flex-nowrap">
                    <h2>عدد المواد  :
                        <span className="text-accent_color">{Book?.audio_count} مادة</span>
                    </h2>
                    <h2>تاريخ النشر :
                        <span className="text-accent_color">{Book?.year}</span>
                    </h2>
                    {Book?.download && <h2 className="flex flex-nowrap">تحميل الكتاب PDF :
                        <span className="text-accent_color flex">{
                            <Link href={Book?.download} target="_blank" download={true} className="cursor-pointer text-blue-500 hover:text-blue-900 flex">
                                اضغط هنا للتحميل <icon.FaDownload />
                            </Link>
                        }</span>
                    </h2>}

                </div>
            </div>
        </div>
    )
}
