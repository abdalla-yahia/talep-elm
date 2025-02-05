import Role from "@/Utils/Role";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import * as icon from "@/Components/Icons/icons";
import GroupHook from "./GroupHook";
import { GroupsInterface } from "@/Interfaces/InterFaces";

export default function GroupsMap({ Groups }: { Groups: GroupsInterface[] }) {
  const {
    UserLogedData,
    toggle,
    setToggle,
    setEditName,
    setEditDescription,
    setGroupGender,
    GroupId,
    setGroupId,
    EditGroupHandeller,
    DeleteGroupHandeller,
  } = GroupHook();
  return (
    <>
      <Accordion defaultActiveKey="0" className="w-full h-64">
        {Groups?.map((Group, index: number) => (
          <>
            <Accordion.Item
              key={index}
              eventKey={index as unknown as string}
              className="relative"
            >
              <Accordion.Header className="flex justify-between items-center ">
                <span>{Group.name} </span>
                <span
                  className={`${
                    Group?.gender === "MALE"
                      ? "text-blue-600"
                      : "text-fuchsia-400"
                  } `}
                >
                  {" "}
                  {`  --  ${
                    Group?.gender === "MALE" ? " رجال " : " نساء "
                  }  --  `}
                </span>
                <span className="text-gray-900">
                  {" "}
                  {` ( ${Group?.User?.length} )`}
                </span>
                <span
                  className={`${
                    Group?.gender === "MALE"
                      ? "text-blue-600"
                      : "text-fuchsia-400"
                  } `}
                >
                  {" "}
                  {Group?.gender === "MALE" ? " طالب " : " طالبة "}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <Link
                  href={`./groups/details/${Group?.id}`}
                  key={index}
                  className="bg-blue-100 w-full cursor-pointer min-h-36 text-center p-1 rounded flex flex-col   "
                >
                  <h1 className="text-3xl mb-2 text-sh"> {Group.name}</h1>
                  <div className="text-sm text-gray-500">
                    {Group.description}
                  </div>
                </Link>

                {/* Edite Group Box */}
                {toggle &&
                  parseInt(GroupId) === (Group?.id as unknown as number) && (
                    <div className="w-full flex z-50  top-0 left-0 flex-col gap-3  justify-start items-start absolute bg-green-200 p-3 rounded ">
                      <div className="flex items-center gap-2">
                        <h1>اسم المجموعة</h1>
                        <input
                          defaultValue={Group?.name}
                          onChange={(e) => setEditName(e.target.value)}
                          type="text"
                          className="rounded px-2"
                          placeholder="ادخل الاسم الجديد"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <h1>وصف المجموعة</h1>
                        <input
                          defaultValue={Group?.description}
                          onChange={(e) => setEditDescription(e.target.value)}
                          type="text"
                          className="rounded px-2"
                          placeholder="ادخل الوصف الجديد"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <h1>نوع المجموعة</h1>
                        <select
                          onChange={(e) => setGroupGender(e.target.value)}
                          className="rounded px-2"
                        >
                          <option selected disabled value="">
                            اختر نوع المجموعة
                          </option>
                          <option value="MALE">رجال</option>
                          <option value="FEMALE">نساء</option>
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          EditGroupHandeller(Group?.id as unknown as string);
                        }}
                        className="w-full rounded p-2 bg-green-500 text-xl cursor-pointer text-white shadow-sm "
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  )}

                {/* Setting Buttons*/}
                {Role(UserLogedData?.role as unknown as string) > 1 && (
                  <div className="bg-red-100 w-full gap-1 rounded py-1 flex justify-between px-2">
                    <div className=" w-full gap-2 flex  px-3 items-start">
                      <span className="text-sm text-gray-400">
                        تعديل المجموعة
                      </span>
                      <icon.FaRegEdit
                        title="تعديل المجموعة"
                        className="self-end text-green-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() => {
                          setGroupId(Group?.id as unknown as string);
                          setToggle(!toggle);
                        }}
                      />
                    </div>
                    <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                      <label
                        htmlFor="delete-Group"
                        className="text-sm flex gap-1  text-gray-400"
                      >
                        حذف المجموعة
                      </label>
                      <icon.CiTrash
                        id="delete-Group"
                        title="حذف المجموعة"
                        className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() =>
                          DeleteGroupHandeller(Group?.id as unknown as string)
                        }
                      />
                    </div>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </>
        ))}
      </Accordion>
    </>
  );
}
