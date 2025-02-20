import * as icon from '@/Components/Icons/icons';
import style from './style.module.css';
import {useEffect} from 'react';

export default function VolumeSpans({
  mute,
  setMute,
  MuteHandeller,
  UnMuteHandeller,
  audioRef1,
  audioRef2,
}: {
  mute: boolean;
  setMute: React.Dispatch<React.SetStateAction<boolean>>;
  MuteHandeller: () => void;
  UnMuteHandeller: () => void;
  audioRef1: {
    current: {
      muted: boolean | undefined;
      paused?: boolean | undefined;
      volume: number;
      play: () => void;
      pause: () => void;
    };
  };
  audioRef2: {
    current: {
      muted: boolean | undefined;
      paused?: boolean | undefined;
      volume: number;
      play: () => void;
      pause: () => void;
    };
  };
}) {
  useEffect(() => {
    const Elements = document.querySelectorAll('.elementVolume');
    Elements.forEach((el, i) => {
      el.addEventListener('mouseenter', async () => {
        //Change Volume Audio
        if (audioRef1.current.volume !== undefined) {
          audioRef1.current.volume = parseInt(i as unknown as string) / 10;
        }
        if (audioRef2.current.volume !== undefined) {
          audioRef2.current.volume = parseInt(i as unknown as string) / 10;
        }
        Elements.forEach((el2) => {
          el2.classList.remove(style.active);
        });
        for (let y = 0; y <= i; y++) {
          Elements[y].classList.add(style.active);
        }
        //Change Mute Audio When Hover On Volume Spans
        if (!Elements[1].classList.contains(style.active)) {
          setMute(false);
        } else {
          setMute(true);
        }
      });
    });
   
  }, [audioRef1, audioRef2, setMute]);
  return (
    <>
      <div className='w-full flex justify-center gap-2 items-end'>
        <div aria-disabled={mute ? true : false} className='flex w-fit justify-center min-h-full flex-row-reverse items-end'>
          <div style={{height: `5px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `10px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `15px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `20px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `25px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `30px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `35px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `40px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `45px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
          <div style={{height: `50px`, width: '3px', marginLeft: '1px'}} className={`elementVolume ${mute && style.active} bg-gray-700 rounded block`}></div>
        </div>
        {mute ? (
          <icon.VscUnmute
            onClick={() => {
              setMute(!mute);
              MuteHandeller();
            }}
            className={`${mute ? 'text-green-500' : ' '}  cursor-pointer`}
          />
        ) : (
          <icon.VscMute
            onClick={() => {
              setMute(!mute);
              UnMuteHandeller();
            }}
            className={`${!mute ? 'text-text_color' : 'text-green-500 '}  cursor-pointer`}
          />
        )}
      </div>
    </>
  );
}
