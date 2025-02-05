import GetAllGroups from "@/Components/Groups/GetAllGroups";
import FullTitle from "@/Utils/FullTitle";

export default function GroupsPage() {
  return (
    <>
    <FullTitle F_Title={'المجموعات الدراسية'}/>
    <GetAllGroups />
    </>
  )
}
