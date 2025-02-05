'use client'
import { Chapter } from '@/Interfaces/InterFaces'
import AudioPlayer from '@/Utils/AudioPlayer'
import { useState } from 'react'
export default function BookSoundPage({Book}:{Book:Chapter}) {
    const [SahapyName,SetSahapyName] = useState<null|string>(null)
    const [type,SetType] = useState<null|string>(null)
    const [BookTitle,SetBookTitle] = useState<null|string>(null)
    const [Search,SetSearch] = useState<null|string>(null)
    const [ID,SetID] = useState<number>(0)
    const [audioUrl,setAudioUrl] = useState<undefined|string>(undefined)
    const [play,setplay] = useState(false)
        
    const SORT: keyof typeof Book.data[0] = Book?.sort as keyof typeof Book.data[0]
 return (
    <>
    <div className='w-full flex flex-col justify-center items-center'>
    <div className='w-full flex justify-center items-center md:w-[70%] lg:w-[50%]'>
    {
        Book?.audio_type !== 'mp3' && audioUrl !== undefined && 
        <iframe  className='bottom-0 left-6 rounded-md' width='100%' height='100%' src={`${audioUrl}?autoplay=1&loop=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    }
    </div>
    <input onChange={(e)=>SetSearch(e.target.value)} type="search" name="" id="" className='w-full rounded outline-none border-none my-2 p-1 text-gray-900' placeholder={`${Book?.search}....`}/>
    </div>
    <div className={`w-full flex flex-wrap  justify-evenly items-start mt-3 gap-1 h-[200vh] overflow-y-scroll scrollbar-hide`}>
    {
        (Search === '' || Search === null ) ?
        
        (Book?.data?.sort((a, b) =>a[SORT] > b[SORT] ? 1 : -1).map((sound) => {
            return (
                <div title={`${sound.name}`} style={{backgroundColor:`${ID === sound.id ?'#523301':''}`,color:`${ID === sound.id ?'white':''}`}} onClick={()=>{setAudioUrl(`${Book?.url}/${sound.url}`);SetType(Book?.type);SetBookTitle(Book?.title);setplay(true);SetID(sound.id as number);SetSahapyName(sound.name)}} key={sound.id} className={`w-full sm:w-1/3 md:w-1/4 lg:w-1/5 cursor-pointer shadow-sm line-clamp-1  text-end text-lg p-2 hover:bg-[#01403c] hover:text-white bg-[#01403c] rounded text-blue-950`}>
                    {   Book?.id === 3?
                        <h1  className='line-clamp-1'>{`( ${sound.id} ) - ${sound.name}`}</h1>:
                        <h1  className='line-clamp-1'>{sound.name}
                        </h1>
                        
                    }
                    </div>
                    )
                    })
                )
                    :
                    (
                        <>
                        <p className=' w-full text-blue-950'>عدد نتائج البحث : <span className='text-blue-600'>{Book?.data?.filter(item=>item.name.includes(Search))?.length} </span>نتيجة</p>
                        {Book?.data?.filter(item=>item.name.includes(Search)).sort((a, b) =>a[SORT] > b[SORT] ? 1 : -1).map((sound) => {
                            return (
                                <div title={`${sound.name}`} style={{backgroundColor:`${ID === sound.id ?'#523301':''}`,color:`${ID === sound.id ?'white':''}`}} onClick={()=>{setAudioUrl(`${Book?.url}/${sound.url}`);SetType(Book?.type);setplay(true);SetID(sound.id as number);SetSahapyName(sound.name)}} key={sound.id} className={`w-full sm:w-1/3 md:w-1/4 lg:w-1/5 cursor-pointer shadow-sm line-clamp-1  text-end text-lg p-2 hover:bg-[#01403c] hover:text-white bg-[#01403c] rounded m-2 text-blue-950`}>
                                    {   Book?.id === 3?
                                        <h1 className='line-clamp-1'>{`( ${sound.id} ) - ${sound.name}`}</h1>:
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
            Book?.audio_type === 'mp3'&&
            <AudioPlayer Book={Book} audioUrl={audioUrl ?? ''} BookTitle={BookTitle ?? ''} setAudioUrl={setAudioUrl} play={play} setplay={setplay} ID={ID} SetID={SetID} type={type ?? ''} SahapyName={SahapyName ?? ''} SetSahapyName={SetSahapyName} />
        }
    </>
  )
}
