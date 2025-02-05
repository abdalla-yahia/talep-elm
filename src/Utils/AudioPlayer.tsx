import { LegacyRef, useRef, useState } from "react"
import * as icon from '@/Components/Icons/icons'
import styleProgress from './style.module.css'

interface BookType {
  data: { id: number; url: string; name: string }[];
  url: string;
  sort: string;
  title: string;
}

export default function AudioPlayer({Book, audioUrl, BookTitle, setAudioUrl, play, setplay, ID, SetID, type, SahapyName, SetSahapyName}: 
    {Book: BookType, audioUrl: string, BookTitle: string, setAudioUrl: (url: string) => void, play: boolean, setplay: (play: boolean) => void, ID: number, SetID: (id: number) => void, type: string, SahapyName: string, SetSahapyName: (name: string) => void}) 
    {
        const [mute,SetMute] = useState(false)
        const [progress, SetProgress] = useState(0);
        const [volume, SetVolume] = useState(100);
        const [duration, SetDuration] = useState<string|number>("00:00");
        const [currentTime, setCurrentTime] = useState<string|number>("00:00");
        
    const refAudio = useRef<HTMLAudioElement>() as unknown as { current: {muted:boolean|undefined,volume:number,play:()=>void,pause:()=>void,load:()=>void,currentTime:number,duration:number} }
    
            const selectMute = () =>{
                if (refAudio.current.muted !== undefined) {
                    refAudio.current.muted = true;
                    setplay(false)
                }
                SetMute(!mute)
            }
            const selectUnMute = () =>{
                if (refAudio.current.muted === true) {
                    refAudio.current.muted = false;
                    setplay(true)
                }
                SetMute(!mute)
            }
            const PlayNextAudio = () =>{
            const index = Book?.data.findIndex((item: { id: number; url: string; name: string }) => item?.id === ID);
            if (index !== -1) {
                const nextIndex = index + 1;
                if (nextIndex < Book.data.length) {
                    setAudioUrl(`${Book?.url}/${Book.data[nextIndex].url}`);
                    SetID(Book.data[nextIndex].id as number);
                    SetSahapyName(Book.data[nextIndex].name);
                }
                }
            }
            const PlayPrevAudio = () =>{
                const index = Book?.data.findIndex((item: { id: number; url: string; name: string }) => item.id === ID);
                if (index !== -1) {
                    const prevIndex = index - 1;
                    if (prevIndex >= 0) {
                        setAudioUrl(`${Book?.url}/${Book.data[prevIndex].url}`);
                        SetID(Book.data[prevIndex].id as number);
                        SetSahapyName(Book.data[prevIndex].name);
                    }
                    }
            }
            const handlePlay = () => {
                refAudio.current.play();
                setplay(true)
                selectUnMute()
            }
            const handlePause = () => {
                refAudio.current.pause();
                setplay(false)
            }
            const handleVolume = (e: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<HTMLAudioElement, Event>) => {
                const volume = e.target instanceof HTMLInputElement ? Number(e.target.value) : refAudio.current.volume * 100;
                refAudio.current.volume = volume / 100;
                SetVolume(volume);
                if(volume === 0){
                    SetMute(true)
                    }else {
                    SetMute(false)
                    }
            }
    
            const handleEnded = () => {
                PlayNextAudio();
            }
            const handleTimeUpdate = () => {
                const currentTime = refAudio.current.currentTime;
                const duration = refAudio.current.duration;
                const progress = (currentTime / duration) * 100;
                SetProgress(progress);
                handleDuration()
                HandelCurrentTime()
            }
            const handleProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const width = rect.width;
                        const progress = (x / width) * 100;
                        const duration = refAudio.current.duration;
                        refAudio.current.currentTime = (progress / 100) * duration;
                        SetProgress(progress);
            }
            const handleDuration = () => {
                let houres:string|number = Math.floor(refAudio.current.duration / 3600);
                let minutes:string|number = Math.floor(refAudio.current.duration / 60 % 60);
                let seconds:string|number = Math.floor(refAudio.current.duration % 60);
                if(seconds < 10){
                    seconds = `0${seconds}`;
                }
                if(minutes < 10){
                    minutes = '0' + minutes;
                }
                if(houres < 10){
                    houres = '0' + houres;
                }
                if(houres as number > 0 ){
                    SetDuration(`${houres}:${minutes}:${seconds}`);
                }else
                {
                    SetDuration(`${minutes}:${seconds}`);
                }
            }
            const HandelCurrentTime = () => {
                let houres:string|number = Math.floor(refAudio.current.currentTime / 3600);
                let minutes:string|number = Math.floor(refAudio.current.currentTime / 60 % 60);
                let seconds:string|number = Math.floor(refAudio.current.currentTime % 60);
                if(seconds < 10){
                    seconds = `0${seconds}`;
                }
                if(minutes < 10){
                    minutes = '0' + minutes;
                }
                if(houres < 10){
                    houres = '0' + houres;
                }
                if(houres as number > 0 ){
                    setCurrentTime(`${houres}:${minutes}:${seconds}`);
                }else
                {
                    setCurrentTime(`${minutes}:${seconds}`);
                }                    
            }
            const handlePlustensecond = () => {
    
                    const duration = refAudio.current.duration;
                    const currentTime = refAudio.current.currentTime;
                    const seekTime = currentTime + 10;
                    if (seekTime < duration) {
                        refAudio.current.currentTime = seekTime;
                    } else {
                        refAudio.current.currentTime = duration;
                    }
            } 
            const handleMinusTenSeconds = () => {
                    const currentTime = refAudio.current.currentTime;
                    const seekTime = currentTime - 10;
                    if (seekTime > 0) {
                        refAudio.current.currentTime = seekTime;
                    } else {
                        refAudio.current.currentTime = 0;
                    }
            }
            
            
    
  return (
    <>
     {/*Player Audio Box */}
    <div className="fixed bottom-0 left-2 w-full flex flex-col justify-center items-center rounded h-fit px-2 py-1 bg-[#01403c] shadow">
        {/* Progress Bar */}
        <div onClick={(e)=>handleProgress(e)} className={`${styleProgress.progressbar}`}>
            <input type="range" min="0" max="100" value={progress || 0} onChange={(e)=>SetProgress(Number(e.target.value))} className='w-full text-red-500 rotate-180 h-1 relative '/>
        </div>
        {/* Audio Info */}
        <div style={{maxWidth:'100%'}} className="flex gap-2">
        <p>{BookTitle ? 
            <>
            <span className="text-blue-500">الكتاب : </span>
            <span>{BookTitle}</span> </> 
            : ''}
            </p>
        <p>
            <span className="text-blue-500">{type} : </span>
            {(`${SahapyName || ''} ${type === 'ّالصَحَابِيُ'  ? 'رَضْيَّ اللَّهُ عَنْهُ ':"" }` )}</p>
        </div>
        {/* Audio Control */}
        <div className="w-full flex justify-evenly items-center gap-2">

        <p>{currentTime}</p>
        {/* Volume Control */}
        <div className={`${styleProgress.volumeParent}`} >
            <div className={`${styleProgress.volumeProgress} `}>
                <input type="range" min="0" max="100" value={volume} onChange={(e)=>handleVolume(e)} className='w-20 h-4 bg-gray-400'/>
                <p className={`${styleProgress.volumeCount} `}>{volume}%</p>
            </div >
            <icon.VscUnmute onClick={()=>{selectMute();setplay(false)}} className={`${mute ? 'hidden':'block'} cursor-pointer hover:text-blue-600 shadow `}/>
            <icon.VscMute  onClick={()=>selectUnMute()} className={`${!mute ? 'hidden':'block  text-gray-600'}  cursor-pointer hover:text-blue-600 shadow `}/>
        </div>
        {/* Play Pause Next Prev Control */}
        <icon.TbPlayerTrackNextFilled  onClick={()=>{PlayNextAudio();setplay(true)}} className={` cursor-pointer hover:text-blue-600 shadow `}/>
        <icon.TbRewindForward10 className='cursor-pointer hover:text-blue-600' onClick={()=>handlePlustensecond()}/>
        <icon.FaPause onClick={()=>handlePause()} className={`${!play && 'text-blue-600'} cursor-pointer hover:text-blue-600 shadow `}/>
        <icon.FaPlay  onClick={()=>handlePlay()} className={`${play && 'text-blue-600'} cursor-pointer hover:text-blue-600 shadow `}/>
        <icon.TbRewindBackward10 className='cursor-pointer hover:text-blue-600' onClick={()=>handleMinusTenSeconds()}/>
        <icon.TbPlayerTrackPrevFilled  onClick={()=>{PlayPrevAudio();setplay(true)}} className={` cursor-pointer hover:text-blue-600 shadow `}/>
        
        <div className='flex justify-between items-center gap-2'>
        <p>{audioUrl !== '' && (duration == "NaN:NaN" || duration == "00:00") ? 
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>        :duration}</p>
        </div>
        </div>
    </div>
    <audio  onTimeUpdate={()=>handleTimeUpdate()} onPlay={(e)=>handleVolume(e)} onEnded={()=>handleEnded()} ref={refAudio as unknown as LegacyRef<HTMLAudioElement>} className='hidden' controls autoPlay src={audioUrl ?? ''}></audio>
    </>
  )
}
