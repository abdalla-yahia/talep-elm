/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as icon from '@/Components/Icons/icons'
import { LegacyRef, useEffect, useRef, useState } from 'react';

export default function RadioQuran() {
    const [Radios,setRadios] = useState<[{url:string,name:string}]>([{url:'',name:''}])
    const [selectedOption, setSelectedOption] = useState(Radios[0]);
    const [urlRadio,seturlRadio] = useState('')
    const [play,setplay] = useState(false)
    const [mute,SetMute] = useState(false)
    const [toggle,setToggle] = useState(false)
    const [RadioName,setRadioName] = useState('')
    const [SearchText,SetSearchText] = useState('')
    
    const refAudio = useRef<HTMLAudioElement>() as unknown as { current: {muted:boolean|undefined,volume:number,play:()=>void,pause:()=>void} }
    useEffect(()=>{
        fetch('https://mp3quran.net/api/v3/radios?language=ar')
        .then(res=>res.json())
        .then(res=>setRadios(res?.radios))
        
    },[])

    const selectNext = () => {
      const currentIndex = Radios.indexOf(selectedOption);
      const nextIndex = (currentIndex + 1) % Radios.length;
      setSelectedOption(Radios[nextIndex]);
      seturlRadio(Radios[nextIndex]?.url)
      setRadioName(Radios[nextIndex]?.name)
    };
    
    const selectPrev = () => {
      const currentIndex = Radios.indexOf(selectedOption);
      const prevIndex = (currentIndex - 1 + Radios.length) % Radios.length; 
      setSelectedOption(Radios[prevIndex]);
      seturlRadio(Radios[prevIndex]?.url)
      setRadioName(Radios[prevIndex]?.name)
     
    };

    const selectMute = () =>{
        refAudio.current.muted  !== undefined && (refAudio.current.muted  = true) 
        SetMute(!mute)
    }
    const selectUnMute = () =>{
        refAudio.current.muted === true && (refAudio.current.muted = false)
        SetMute(!mute)
    }
  return (
    <div className='w-full bg-[#01403c] rounded'>
    <div onClick={()=>{setToggle(!toggle)}} className="w-full scrollbar-hide flex flex-row-reverse justify-between items-center my-1 rounded h-fit px-2 text-white shadow bg-[#01403c]">
    <input value={SearchText} onChange={(e)=>{SetSearchText(e.target.value);setToggle(true)}} type="search" name="" id="" className='m-2 px-2 z-40 outline-none rounded bg-[#039491] text-white w-[70%] self-center' placeholder=' بحث عن إذاعة ....' />
    <div  className="flex relative justify-start items-start w-full" dir='rtl'>
        <span className='flex justify-between items-center w-full'>
        <span className="text-lg cursor-pointer font-bold text-slate-100">{RadioName || 'اختر الإذاعة'}</span>
        <icon.MdKeyboardDoubleArrowDown />
        </span>
        {toggle && <div className='bg-[#015a54] rounded-md absolute left-0 top-[100%] w-[80%] z-40 max-h-[400px] scrollbar-hide overflow-y-scroll text-red-500 flex justify-start items-start flex-col'>
        {
            Radios?.length > 0 && SearchText === '' ?
            (
                <>
                <span onClick={()=>{seturlRadio('https://stream.radiojar.com/8s5u5tpdtwzuv');setToggle(false);setRadioName('إذاعة القرآن الكريم من القاهرة');setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded'  title={'إذاعة القرآن الكريم من القاهرة'}>{'إذاعة القرآن الكريم من القاهرة'}</span>
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'>حفص عن عاصم الكوفي</span>
                {
                    Radios?.filter(el=>!el?.name.includes('رواي') && !el?.name.includes('باللغة') ).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> ورش عن نافع</span>
                {
                    Radios?.filter(el=>el?.name.includes('رواية ورش')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> قالون عن نافع</span>
                {
                    Radios?.filter(el=>el?.name.includes('رواية قالون')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
               
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> رواية السوسي </span>
                {
                    Radios?.filter(el=>el?.name.includes('رواية السوسي')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> رواية الدوري </span>
                {
                    Radios?.filter(el=>el?.name.includes('رواية الدوري')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> رواية ابن ذكوان </span>
                {
                    Radios?.filter(el=>el?.name.includes('رواية ابن ذكوان')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> رواية خلف </span>
                {
                    Radios?.filter(el=>el?.name.includes('رواية خلف')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> رواية البزي </span>
                {
                    Radios?.filter(el=>el?.name.includes('رواية البزي')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                <span className='text-2xl font-bold text-white border-b-2 border-red-600'> رواية رويس </span>
                {
                    Radios?.filter(el=>el?.name.includes(' رويس')).map((radio,index)=>
                        <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true)}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
                }
                </>
        ):(Radios?.filter(el=>el.name.includes(SearchText))).map((radio,index)=>
            <span onClick={()=>{seturlRadio(radio?.url);setToggle(false);setRadioName(radio?.name);setplay(true);SetSearchText('')}} className='hover:bg-[#01403c] text-white hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={radio?.name}>{radio?.name}</span>)
        }
        </div>}
    </div>
    </div>
    {/*Player Radio Box */}
    <div className="w-full flex justify-evenly items-center rounded h-5 px-2 py-1 bg-[#01403c] shadow">
        <icon.VscUnmute onClick={()=>{selectMute();setplay(false);setToggle(false)}} className={`${mute ? 'hidden':'block'} cursor-pointer hover:text-blue-600 shadow `}/>
        <icon.VscMute onClick={()=>{selectUnMute();setplay(true);setToggle(false)}} className={`${!mute ? 'hidden':'block  text-gray-600'} cursor-pointer hover:text-blue-600 shadow `}/>
        <icon.TbPlayerTrackNextFilled onClick={()=>{selectNext();setplay(true);setToggle(false)}} className='cursor-pointer hover:text-blue-600 shadow '/>
        <icon.FaPause onClick={()=>{refAudio?.current?.pause();setplay(false);setToggle(false)}} className={`${!play && 'text-blue-600'} cursor-pointer hover:text-blue-600 shadow `}/>
        <icon.FaPlay  onClick={()=>{refAudio?.current?.play();setplay(true);setToggle(false)}} className={`${play && 'text-blue-600'} cursor-pointer hover:text-blue-600 shadow `}/>
        <icon.TbPlayerTrackPrevFilled onClick={()=>{selectPrev();setplay(true);setToggle(false)}} className='cursor-pointer hover:text-blue-600 shadow '/>
    </div>
        <input defaultValue={100}  onChange={(e)=>{refAudio.current.volume !== undefined && (refAudio.current.volume = parseInt(e.target.value)/100)}} type="range" name="" id=""  className='rotate-180 w-full h-1 shadow cursor-grabbing '/>
     <audio ref={refAudio as unknown as LegacyRef<HTMLAudioElement>} src={urlRadio} controls autoPlay className='hidden' />
    </div>
  )
}
