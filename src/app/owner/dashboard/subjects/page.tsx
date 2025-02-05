import GetAllSubjects from "@/Components/Subjects/GetAllSubjects";
import FullTitle from "@/Utils/FullTitle";

export default function UserSubjects() {
  return (
    <>
    <FullTitle F_Title={'المواد الدراسية'}/>
    <GetAllSubjects />
    </>
  )
}
