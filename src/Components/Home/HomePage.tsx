import ArticlesHomePage from "./ArticlesHomePage";
import CreatePost from "./CreatePost";
import LeftSidbar from "./LeftSidbar";
import Newsbar from "./Newsbar";
import PrayerTimes from "./PrayerTimes";
import RadioQuran from "./RadioQuran";

export default function HomePage() {

  return (
    <>
      <div className="container  overflow-hidden h-full flex justify-center items-center flex-col">
        <div className="row w-[120%] relative -left-[6%]">
          <div className="col-md-12">
            <Newsbar />
          </div>
        </div>
        <div className="row w-full">
          <div className="hidden  min-h-full md:flex lg:flex w-[0%] md:w-[15%] lg:w-[15%] flex-col justify-start my-2  items-center bg-background_color rounded ">
            <PrayerTimes />
          </div>
          <div className="w-[100%] overflow-y-auto scrollbar-hide max-h-screen md:w-[70%] lg:w-[70%] flex flex-col justify-start items-center  rounded ">
            <div className="text-center my-1 w-full">
              <RadioQuran />
              <CreatePost />
              <ArticlesHomePage />
            </div>
          </div>
          <div className={`shadow hidden min-h-full md:flex lg:flex w-[0%] md:w-[15%] lg:w-[15%] flex-col justify-start py-2 rounded text-text_color my-2 items-center  bg-background_color`}>
            <LeftSidbar />
          </div>
        </div>
      </div>
    </>
  )
}
