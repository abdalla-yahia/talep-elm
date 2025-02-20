'use client'
import * as icon from '@/Components/Icons/icons'
import { useState } from 'react';
import BooksData from './Data'
import { Chapter } from '@/Interfaces/InterFaces';

export default function SideBar({ setBook }: { setBook: (chapter: Chapter) => void }) {
    const Books = BooksData()
    const [toggle, setToggle] = useState(0)

    return (
        <section className=" h-full overflow-y-scroll scrollbar-hide bg-second_background_color rounded flex justify-center p-2">
            <div className="w-full flex justify-start items-center flex-col ">
                <ul style={{ fontSize: 'bolder' }} className="text-text_color w-full flex justify-center items-center flex-col">
                    {
                        Books?.map((book, index) => {
                            return (
                                <div key={index} className='w-full'>
                                    <li onClick={() => setToggle(toggle === book?.id ? 0 : book?.id)} className={` ${toggle !== book?.id ? ' border-1 border-gray-400' : 'border-t border-l border-r border-b-0 border-gray-400 '}  cursor-pointer h-auto flex justify-center text-center  md:justify-start lg:justify-start items-center gap-3 w-full py-2 `} >

                                        {toggle === book?.id ?
                                            <icon.FaMinus className=" hidden md:block lg:block" /> :
                                            <icon.FaPlus className=" hidden md:block lg:block" />
                                        }
                                        {book.title}
                                    </li>
                                    <div className='px-1 border-t-0 border-l border-r border-b border-gray-400  text-text-color flex flex-col justify-end items-end line-clamp-1  w-full gap-1' style={{ display: toggle === book?.id ? 'flex' : 'none' }}>
                                        {book?.books?.map((chapter, index) => {
                                            return (
                                                <div onClick={() => setBook(chapter as Chapter)} key={index} className='w-full text-center shadow-sm line-clamp-1 flex justify-end items-start py-2 cursor-pointer hover:text-primary_color'>
                                                    {chapter.title}
                                                    {chapter.audio_type === 'mp3' ? <icon.LuFileAudio className='mx-2 text-blue-700' /> : <icon.RiFolderVideoFill className='mx-2 text-red-600' />}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </section>

    )
}
