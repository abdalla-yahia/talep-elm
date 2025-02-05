import GetAllNews from "@/Components/News/GetAllNews";
import FullTitle from "@/Utils/FullTitle";

export default function NewsPage() {
  return (
    <>
    <FullTitle F_Title={'شريط الأخبار'}/>
    <GetAllNews />
    </>
  )
}
