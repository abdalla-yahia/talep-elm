import GetAllLessons from "@/Components/Lessons/GetAllLessons";
import FullTitle from "@/Utils/FullTitle";

export default function UserLessons() {
  return (
    <>
    <FullTitle F_Title={'المحاضرات'}/>
    <GetAllLessons />
    </>
  )
}
