import DateConvert from "@/Utils/Date";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import * as icon from "@/Components/Icons/icons";
import SectionHook from "./SectionHook";
import Role from "@/Utils/Role";
import { SectionInterface } from "@/Interfaces/InterFaces";

export default function SectionsMap({
  Sections,
}: {
  Sections: SectionInterface[];
}) {
  const {
    UserLogedData,
    toggle,
    setToggle,
    setEditName,
    setEditDescription,
    SectionId,
    setSectionId,
    EditSectionHandeller,
    DeleteSectionHandeller,
    AllManagers,
    setManagerId,
  } = SectionHook();

  return (
    <>
      <Accordion defaultActiveKey="0" className="w-full h-64">
        {Sections?.map((Section, index: number) => (
          <>
            <Accordion.Item
              key={index}
              eventKey={index as unknown as string}
              className="relative"
            >
              <Accordion.Header>
                <span className="text-lg font-bold text-red-700">
                  {Section?.name}
                </span>
                <span className="text-lg font-bold text-blue-700">{`-- مدير القسم :  ${
                  Section?.manager?.name || "لا يوجد"
                }`}</span>
              </Accordion.Header>
              <Accordion.Body>
                <Link
                  href={`./sections/details/${Section?.id}`}
                  key={index}
                  className="bg-blue-100 w-full cursor-pointer min-h-36 text-center p-1 rounded flex flex-col   "
                >
                  <h1 className="text-3xl mb-2 text-sh"> {Section?.name}</h1>
                  <p className="text-sm mb-2 text-sh text-gray-400">
                    {" "}
                    {DateConvert(Section?.createdAt)}
                  </p>
                </Link>
                {/* Edite Section Box */}
                {toggle && parseInt(SectionId) === Section?.id && (
                  <div className="w-full flex z-50  top-0 left-0 flex-col gap-3  justify-start items-start absolute bg-green-200 p-3 rounded ">
                    <div className="flex items-center gap-2">
                      <h1>اسم القسم</h1>
                      <input
                        defaultValue={Section?.name}
                        onChange={(e) => setEditName(e.target.value)}
                        type="text"
                        className="rounded px-2"
                        placeholder="ادخل الاسم الجديد"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <h1>وصف القسم</h1>
                      <input
                        defaultValue={Section?.description}
                        onChange={(e) => setEditDescription(e.target.value)}
                        type="text"
                        className="rounded px-2"
                        placeholder="ادخل الوصف الجديد"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <h1>مدير القسم</h1>
                      <select
                        onChange={(e) => setManagerId(e.target.value)}
                        className="rounded px-2"
                      >
                        <option selected disabled value="">
                          اختر مدير القسم
                        </option>
                        {AllManagers?.Managers?.length > 0 &&
                          AllManagers.Managers.map((Manager, index) => (
                            <option key={index} value={Manager?.id}>
                              {Manager?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        EditSectionHandeller(Section?.id as unknown as string);
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
                      <span className="text-sm text-gray-400">تعديل القسم</span>
                      <icon.FaRegEdit
                        title="تعديل القسم"
                        className="self-end text-green-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() => {
                          setSectionId(Section?.id as unknown as string);
                          setToggle(!toggle);
                        }}
                      />
                    </div>
                    <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                      <label
                        htmlFor="delete-Section"
                        className="text-sm flex gap-1  text-gray-400"
                      >
                        حذف القسم
                      </label>
                      <icon.CiTrash
                        id="delete-Section"
                        title="حذف القسم"
                        className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() =>
                          DeleteSectionHandeller(
                            Section?.id as unknown as string
                          )
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
