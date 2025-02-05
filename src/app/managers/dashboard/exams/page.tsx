import GetAllExams from "@/Components/Exams/GetAllExams";
import FullTitle from "@/Utils/FullTitle";

export default function ExamsPage() {
  return (
    <>
    <FullTitle F_Title={'الإختبارات'}/>
    <GetAllExams />
    </>
  )
}
