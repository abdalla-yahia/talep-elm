'use client'
import { SetStateAction, useEffect, useState } from 'react';
import Data from './Data/Quran-hafs.json';
import Type from "./Data/Quran.json";
import Tafseer from './Data/tafseerMouaser.json'
import style from './style.module.css';
import { Amiri } from 'next/font/google';
import * as icon from '@/Components/Icons/icons'
import { Datainterface, TafseerInterface } from '@/Interfaces/InterFaces';
const amiri = Amiri({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

export default function SoraPage({ setNameSoras, setSoraNumber, setClickedAya, SoraNumber, AyaNumber, setAyaNumber, setAyatLengthOfSora, setSoraData }:
  {
    setNameSoras: React.Dispatch<React.SetStateAction<string>>,
    setSoraNumber: React.Dispatch<React.SetStateAction<number>>,
    SoraNumber: number,
    AyaNumber: React.Dispatch<React.SetStateAction<number>>,
    setAyaNumber: React.Dispatch<React.SetStateAction<number>>,
    setAyatLengthOfSora: React.Dispatch<React.SetStateAction<number>>,
    setSoraData: React.Dispatch<React.SetStateAction<string>>,
    setClickedAya: React.Dispatch<React.SetStateAction<number>>
  }
) {
  const [sora, setSora] = useState<Datainterface[]>([]);
  const [TypeSora, setTypeSora] = useState("");

  useEffect(() => {
    if (localStorage.getItem('Islamic_Course_Sora_Number')) {
      setSoraNumber(parseInt(localStorage.getItem('Islamic_Course_Sora_Number') as unknown as string) as unknown as SetStateAction<number>);
    }
    if (localStorage.getItem('Islamic_Course_Aya_Number')) {
      setAyaNumber(parseInt(localStorage.getItem('Islamic_Course_Aya_Number') as unknown as string) as unknown as SetStateAction<number>);
    }
  }, [setAyaNumber, setSoraNumber])

  useEffect(() => {
    setSora(Data?.filter(el => el.sura_no == (SoraNumber as unknown as number)))
    setNameSoras([...new Set(Data?.map(e => e?.sura_name_ar))] as unknown as SetStateAction<string>)
    setTypeSora(
      (Type as { id: number, type: string }[])[SoraNumber - 1]?.type
    );

  }, [SoraNumber, setNameSoras])

  useEffect(() => {
    if (sora?.length > 0) {
      setAyatLengthOfSora(sora.length)
      //Change Number Formats To Arabic Format
      const map = [
        "&\#1632;", "&\#1633;", "&\#1634;", "&\#1635;", "&\#1636;",
        "&\#1637;", "&\#1638;", "&\#1639;", "&\#1640;", "&\#1641;"
      ]
      const ayanumber = document.querySelectorAll('.ayanumber')
      ayanumber.forEach((el) => {
        el.innerHTML = el.innerHTML.replace(/\d(?=[^<>]*(<|$))/g, number => map[number as unknown as number]);
      })
    }
    setSoraData(sora as unknown as string)
  }, [setAyatLengthOfSora, sora, setSoraData])

  useEffect(() => {
    const Ayat = document.querySelectorAll('.ayat')
    window.scrollTo({
      top: ((Ayat[AyaNumber as unknown as number - 2] as unknown as HTMLElement)?.offsetTop) - 250,
      behavior: 'smooth'
    })
  }, [AyaNumber, SoraNumber])

  return (
    <>
      <div className={`${amiri.className} container w-full `}>
        <div className="row">
          <div className="col-md-12 relative">
            <div className={style.next_prev_sora}>
              <icon.MdKeyboardDoubleArrowRight title='السورة السابقة' onClick={() => {
                if (SoraNumber as unknown as number !== 1) {
                  setSoraNumber(--SoraNumber as number);
                  setAyaNumber(1);
                }
              }} className={`${style.next_prev} ${SoraNumber as unknown as number <= 1 ? style.visability_hidden : 'visible'}`} />
              <icon.MdOutlineKeyboardDoubleArrowLeft title='السورة التالية' onClick={() => {
                if (SoraNumber as unknown as number !== 114) {
                  setSoraNumber(++SoraNumber as number);
                  setAyaNumber(1);
                }
              }} className={`${style.next_prev} ${SoraNumber as unknown as number >= 114 ? style.visability_hidden : 'visible'}`} />
            </div>
            <div className={`${style.soraPage} text-center w-full h-fit`}>
              {/*Set Pasmala And Header Of Sora */}
              <div className={`${style.passmalla} hidden text-center md:flex lg:flex justify-center items-center `}>
                <span className={`${style.sora_name, style.passmalla_title}  `}>   {`سورة ${sora?.length > 0 && sora?.[0].sura_name_ar || ''}`}  </span>
                <span className={`${style.sora_mak_mad, style.passmalla_title}  `}>   {`التنزيل ${TypeSora}`}  </span>
                <span className={`${style.sora_ayas_num, style.passmalla_title} headerayatlength `}>   {`أياتها ${sora?.length > 0 && sora?.length || ''}`}  </span>
              </div>
              {SoraNumber !== 9 && (
                <span
                  style={{ marginBottom: '30px', textShadow: '1px 1px 1px #000' }}
                  className={`${style.passmallaText} w-full text-lg md:text-3xl lg:text-5xl text-red-600 flex justify-center`}
                >
                  ﷽
                </span>
              )}
              {/*Set Ayat Of Sora Page */}
              <div className={`${style.ayatPage} text-2xl text-gray-700 text-justify w-full px-2 `} >
                {
                  sora.map((el, index) => {
                    return (
                      <p
                        title={
                          ((Tafseer as TafseerInterface[])?.filter(
                            (ele) => ele?.sura_no === SoraNumber && ele?.aya_no === index + 1
                          )?.[0]?.aya_tafseer as string)
                        }
                        key={el?.id}
                        onClick={() => { setAyaNumber(el.aya_no); setClickedAya(el.aya_no) }}
                        className={`${(AyaNumber as unknown as number) == index + 2 && style.active_Aya} ayat hover:text-blue-400  hover:drop-shadow-lg hover:text-2xl hover:font-bold cursor-pointer rounded inline text-justify `}
                      >
                        {" "}
                        {el?.aya_text?.slice(0, -2)}
                        <span
                          className={`${style.parent_simbole} text-2xl text-gray-800 mx-2`}
                        >
                          &#x06DD;
                          <span
                            className={`${style.child_simbole} ayanumber hover:text-text_color `}
                          >
                            {" "}
                            {el?.aya_no}
                          </span>
                        </span>
                      </p>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
