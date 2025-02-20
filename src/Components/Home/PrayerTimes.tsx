/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import * as icon from '@/Components/Icons/icons'
import { PrayerTime } from "@/Interfaces/InterFaces"

export default function PrayerTimesPage() {
  const [prayer, setPrayer] = useState<PrayerTime>()

  const date = new Date()
  const Month = date.getMonth() + 1
  const city = 'Cairo'
  const method = 5
  const Today = date.getDate();
  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/calendarByAddress/${date.getFullYear()}/${Month}?address=${city},Egypt&method=${method}`)
      .then(res => res.json())
      .then(res => setPrayer(res.data[Today - 1]) as unknown as { prayer: PrayerTime })
  }, [Month, Today, date])

  return (
    <>
      {/*Hijiry Time */}
      <div className="card px-1 text-[13px] w-full text-center shadow mb-2 bg-background_color text-text_color">
        <span className="w-full text-red-600 text-2xl">
          {prayer?.date?.hijri?.weekday?.ar}
        </span>
        <span className=" text-xl">{prayer?.date?.hijri?.day}</span>
        <span className="w-full text-red-600 text-lg">
          {prayer?.date?.hijri?.month?.ar}
        </span>
        <span>{prayer?.date?.hijri?.year + "هجريه"}</span>
      </div>
      <div className="card px-1 text-[13px] w-full text-center shadow mb-2 bg-background_color text-text_color">
        مواقيت الصلاة{" "}
      </div>
      {/*Prayer Times */}
      <div className="container w-full p-0 flex flex-col justify-center items-center ">
        <div className="row w-full">
          <div className="col-md-12 flex flex-col justify-center items-center">
            {/*El Fagr */}
            <div className="card w-full mb-2 flex justify-center text-center items-center bg-background_color shadow text-text_color">
              <div className="card-body text-sm">
                <h5 className="card-title flex justify-center items-center gap-1">
                  الفجر
                  <icon.FaCloudMoon className="text-text_color" />
                </h5>
                <p className="card-text">
                  {" "}
                  {prayer?.timings?.Fajr?.slice(0, 5)} AM
                </p>
              </div>
            </div>
            {/*El Shrooq */}
            <div className="card w-full mb-2 flex justify-center text-center items-center bg-background_color shadow text-text_color">
              <div className="card-body text-sm">
                <h5 className="card-title flex justify-center items-center gap-1">
                  الشروق
                  <icon.WiSunrise className="text-orange-500" />
                </h5>
                <p className="card-text">
                  {" "}
                  {prayer?.timings?.Sunrise?.slice(0, 5)} AM
                </p>
              </div>
            </div>
            {/*El Dohr */}
            <div className="card w-full mb-2 flex justify-center text-center items-center bg-background_color shadow text-text_color">
              <div className="card-body text-sm">
                <h5 className="card-title flex justify-center items-center gap-1">
                  الظهر
                  <icon.FaCloudSunRain className="text-orange-700" />
                </h5>
                <p className="card-text">
                  {" "}
                  {prayer?.timings?.Dhuhr?.slice(0, 5)} AM
                </p>
              </div>

            </div>
            {/*El Asr */}
            <div className="card w-full mb-2 flex justify-center text-center items-center bg-background_color shadow text-text_color">
              <div className="card-body text-sm">
                <h5 className="card-title flex justify-center items-center gap-1">
                  العصر
                  <icon.IoPartlySunny className="text-accent_color" />
                </h5>
                <p className="card-text">
                  {" "}
                  {(prayer?.timings?.Asr?.slice(0, 5).slice(
                    0,
                    2
                  ) as unknown as number) - 12}
                  {prayer?.timings?.Asr?.slice(0, 5).slice(2, 5)} PM
                </p>
              </div>
            </div>
            {/*El Maghrib */}
            <div className="card w-full mb-2 flex justify-center text-center items-center bg-background_color shadow text-text_color">
              <div className="card-body text-sm">
                <h5 className="card-title flex justify-center items-center gap-1">
                  المغرب
                  <icon.FaCloudMoonRain className="text-red-900" />
                </h5>
                <p className="card-text">
                  {(prayer?.timings?.Maghrib?.slice(0, 5).slice(
                    0,
                    2
                  ) as unknown as number) - 12}
                  {prayer?.timings?.Maghrib?.slice(0, 5).slice(2, 5)} PM{" "}
                </p>
              </div>
            </div>
            {/*El Esha */}
            <div className="card w-full mb-2 flex justify-center text-center items-center bg-background_color shadow text-text_color">
              <div className="card-body text-sm">
                <h5 className="card-title flex justify-center items-center gap-1">
                  العشاء
                  <icon.IoIosCloudyNight className="text-gray-700" />
                </h5>
                <p className="card-text">
                  {(prayer?.timings?.Isha?.slice(0, 5).slice(
                    0,
                    2
                  ) as unknown as number) - 12}
                  {prayer?.timings?.Isha?.slice(0, 5).slice(2, 5)} PM{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
