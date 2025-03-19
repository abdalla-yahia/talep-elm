'use client'
import { Chapter } from '@/Interfaces/InterFaces'
import AudioPlayer from '@/Utils/AudioPlayer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function BookSoundPage({ Book }: { Book: Chapter }) {
    const [SahapyName, SetSahapyName] = useState<null | string>(null)
    const [type, SetType] = useState<null | string>(null)
    const [BookTitle, SetBookTitle] = useState<null | string>(null)
    const [Search, SetSearch] = useState<null | string>(null)
    const [ID, SetID] = useState<number>(0)
    const [audioUrl, setAudioUrl] = useState<undefined | string>(undefined)
    const [downloadUrl, setdownloadUrl] = useState<undefined | string>(undefined)
    const [play, setplay] = useState(false)

    const SORT: keyof typeof Book.data[0] = Book?.sort as keyof typeof Book.data[0]
    useEffect(() => {
        document.title = `${SahapyName} - ${BookTitle}`
    }, [SahapyName, BookTitle])
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-full flex justify-center items-center md:w-[70%] lg:w-[50%]'>
                    {
                        Book?.audio_type !== 'mp3' && audioUrl !== undefined &&
                        (
                            <div className='w-full my-5 h-[450px] flex flex-col justify-center items-center gap-2'>
                        <iframe className='bottom-0 left-6 rounded-md' width='100%' height='100%' src={`${audioUrl}?autoplay=1&loop=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        <Link className='w-[50%] text-center text-blue-700 bg-slate-400 rounded-md p-2' href={`https://www.ssyoutube.com/watch?v=${downloadUrl}`}>
                        تحميل الفيديو
                        </Link>
                            </div>
                    
                    )
                    }
                </div>
                <input onChange={(e) => SetSearch(e.target.value)} type="search" name="" id="" className='w-full rounded outline-none border-none my-2 p-1 text-gray-900' placeholder={`${Book?.search}....`} />
            </div>
            <div className={`w-full flex flex-wrap  justify-evenly items-start mt-3 gap-1 h-[200vh] overflow-y-scroll scrollbar-hide`}>
                {
                    (Search === '' || Search === null) ?

                        (Book?.data?.sort((a, b) => a[SORT] > b[SORT] ? 1 : -1).map((sound) => {
                            return (
                                <div title={`${sound.name}`} style={{ backgroundColor: `${ID === sound.id ? 'var(--primary-color)' : ''}`, color: `${ID === sound.id ? 'var(--accent-color)' : ''}` }} onClick={() => { setAudioUrl(`${Book?.url}/${sound?.url}`); setdownloadUrl(sound?.url);SetType(Book?.type); SetBookTitle(Book?.title); setplay(true); SetID(sound.id as number); SetSahapyName(sound.name) }} key={sound.id} className={`w-full sm:w-1/3 md:w-1/4 lg:w-1/5 cursor-pointer shadow-sm line-clamp-1  text-end text-lg p-2 hover:bg-second_background_color hover:text-accent_color bg-background_color rounded text-text_color`}>
                                    {Book?.id === 3 ?
                                        <h1 className='line-clamp-1 text-text_color'>{`( ${sound.id} ) - ${sound.name}`}</h1> :
                                        <h1 className='line-clamp-1 text-text_color'>{sound.name}
                                        </h1>

                                    }
                                </div>
                            )
                        })
                        )
                        :
                        (
                            <>
                                <p className=' w-full text-blue-950'>عدد نتائج البحث : <span className='text-blue-600'>{Book?.data?.filter(item => item.name.includes(Search))?.length} </span>نتيجة</p>
                                {Book?.data?.filter(item => item.name.includes(Search)).sort((a, b) => a[SORT] > b[SORT] ? 1 : -1).map((sound) => {
                                    return (
                                        <div title={`${sound.name}`} style={{ backgroundColor: `${ID === sound.id ? 'var(--text-color)' : ''}`, color: `${ID === sound.id ? 'var(--accent-color)' : ''}` }} onClick={() => { setAudioUrl(`${Book?.url}/${sound.url}`); SetType(Book?.type); setplay(true); SetID(sound.id as number); SetSahapyName(sound.name) }} key={sound.id} className={`w-full sm:w-1/3 md:w-1/4 lg:w-1/5 cursor-pointer shadow-sm line-clamp-1  text-end text-lg p-2 hover:bg-second_background_color hover:text-accent_color hover:shadow-2xl bg-background_color rounded m-2 text-text_color `}>
                                            {Book?.id === 3 ?
                                                <h1 className='line-clamp-1'>{`( ${sound.id} ) - ${sound.name}`}</h1> :
                                                <h1 className='line-clamp-1'>{sound.name}</h1>
                                            }
                                        </div>
                                    )
                                })}
                            </>
                        )
                }
            </div>
            {/* Player Audio Box */}
            {
                Book?.audio_type === 'mp3' &&
                <AudioPlayer Book={Book} audioUrl={audioUrl ?? ''} BookTitle={BookTitle ?? ''} setAudioUrl={setAudioUrl} play={play} setplay={setplay} ID={ID} SetID={SetID} type={type ?? ''} SahapyName={SahapyName ?? ''} SetSahapyName={SetSahapyName} />
            }
        </>
    )
}
