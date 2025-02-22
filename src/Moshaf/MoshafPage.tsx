/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import NavMoshaf from "./NavMoshaf";
import SoraPage from "./SoraPage";
import SoursAudioQarea from "./SoursAudioQarea";

 function MoshafPage() {
    const [NameSoras, setNameSoras] = useState([]);
    const [SoraNumber, setSoraNumber] = useState(1);
    const [AyaNumber, setAyaNumber] = useState(1);
    const [ShaikhSound, setShaikhSound] = useState('');
    const [soraData, setSoraData] = useState('');
    const [AyatLengthOfSora, setAyatLengthOfSora] = useState(0);

    //Reference to the audio Elements
    const audioRef1 = useRef<HTMLAudioElement>() as unknown as { current: {muted:boolean|undefined,volume:number,play:()=>void,pause:()=>void,paused:boolean,src:string} }
    const audioRef2 = useRef<HTMLAudioElement>() as unknown as { current: {muted:boolean|undefined,volume:number,play:()=>void,pause:()=>void,paused:boolean,src:string} }
    // On The First Time Playing
    useEffect(()=>{
      if(AyaNumber > 1){
        setClickedAya(AyaNumber - 1)
      }else{
        setClickedAya(1)
        }
    },[ShaikhSound, SoraNumber])
    // Plus One To Aya Number
    const PlusAya = ()=>{
    if((AyaNumber < AyatLengthOfSora +1)){
        (setAyaNumber(AyaNumber + 1))
    }else if (AyaNumber >= AyatLengthOfSora +1){
        if(SoraNumber !== 114){
            setSoraNumber(SoraNumber + 1)
            setClickedAya(1)
        }else if(SoraNumber === 114){
            setClickedAya(1)
            setSoraNumber(1)
        }
    }
    localStorage.setItem('Islamic_Course_Sora_Number',SoraNumber as unknown as string)
    localStorage.setItem('Islamic_Course_Aya_Number',AyaNumber as unknown as string)
    }

    // On First Audio Play
    const AudioOnePlay = ()=>{
      if (audioRef2.current) {
        audioRef2.current.src = SoursAudioQarea(AyaNumber +1, SoraNumber, ShaikhSound);
      }
          PlusAya();
      audioRef2?.current?.pause();
    }
    // On Second Audio Play
    const AudioTwoPlay = ()=>{
      if (audioRef1.current) {
        audioRef1.current.src = SoursAudioQarea(AyaNumber +1, SoraNumber, ShaikhSound);
      }
      PlusAya();
    audioRef1?.current?.pause();
    }
    // On First Audio End
    const AudioOneEnded =()=>{
        audioRef2?.current?.play();
            PlusAya();
    }
    // On Second Audio End
    const AudioTwoEnded = ()=>{
    audioRef1?.current?.play();
    PlusAya();
  }
   // On Clicked Of Aya
  const setClickedAya = (e:number) => {
          audioRef1?.current.pause()
          if (audioRef1.current) {
            audioRef1.current.src = '';
          }
          audioRef2?.current.pause()
          if (audioRef2.current) {
            audioRef2.current.src = '';
          }
          setAyaNumber(e)
          audioRef1.current.src = SoursAudioQarea(e, SoraNumber, ShaikhSound);
          audioRef2.current.src = SoursAudioQarea(e+1, SoraNumber, ShaikhSound);
          audioRef1?.current?.play();
  } 
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1 className="text-center">
                <NavMoshaf NameSoras={NameSoras as unknown as string[]} SoraNumber={ SoraNumber as number} setSoraNumber={setSoraNumber} setShaikhSound={setShaikhSound} setAyaNumber={setAyaNumber as unknown as React.Dispatch<React.SetStateAction<number>>} audioRef1={audioRef1} audioRef2={audioRef2} soraData={soraData as unknown as [{sura_name_ar:string}]}/>
                </h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <SoraPage setNameSoras={setNameSoras as unknown as React.Dispatch<React.SetStateAction<string>>} setSoraNumber={setSoraNumber} setClickedAya={setClickedAya as unknown as React.Dispatch<React.SetStateAction<number>>} SoraNumber={SoraNumber} AyaNumber={AyaNumber as unknown as React.Dispatch<React.SetStateAction<number>>} setAyaNumber={setAyaNumber} setAyatLengthOfSora={setAyatLengthOfSora} setSoraData={setSoraData}/>
                <audio onPlay={()=>AudioOnePlay()} onEnded={()=>AudioOneEnded()} className="audio_Player hidden " ref={audioRef1 as unknown as LegacyRef<HTMLAudioElement>}   controls autoPlay >
                    متصفحك لا يدعم  هذا النوع من الصوتيات
                </audio>
                <audio onPlay={()=>AudioTwoPlay()} onEnded={()=>AudioTwoEnded()} className="audio_Player  hidden" ref={audioRef2 as unknown as LegacyRef<HTMLAudioElement>}   controls autoPlay >
                    متصفحك لا يدعم  هذا النوع من الصوتيات
                </audio>
            </div>
        </div>
    </div>
    </>
  )
}

export default React.memo(MoshafPage);