import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import SubjectHook from "./SubjectsHook";
import Role from "@/Utils/Role";
import * as icon from "@/Components/Icons/icons";
import { SubjectsInterface } from "@/Interfaces/InterFaces";

export default function SubjectsMap({
  subjects,
}: {
  subjects: SubjectsInterface[];
}) {
  const {
    UserLogedData,
    toggle,
    setToggle,
    setEditName,
    setEditDescription,
    setSectionId,
    SubjectId,
    setSubjectId,
    EditSubjectHandeller,
    DeleteSubjectHandeller,
    AllSections,
  } = SubjectHook();

  return (
    <>
      <Accordion defaultActiveKey="0" className="w-full h-64">
        {subjects?.map((Subject, index: number) => (
          <>
            <Accordion.Item
              eventKey={index as unknown as string}
              className="relative"
            >
              <Accordion.Header> {Subject.name}</Accordion.Header>
              <Accordion.Body>
                <Link
                  href={`./subjects/details/${Subject?.id}`}
                  key={index}
                  className="bg-blue-100 w-full cursor-pointer min-h-36 text-center p-1 rounded flex flex-col   "
                >
                  <h1 className="text-3xl mb-2 text-sh"> {Subject.name}</h1>
                  <div className="text-sm text-text_color">{Subject.info}</div>
                </Link>

                {/* Edite Subject Box */}
                {toggle &&
                  parseInt(SubjectId) ===
                  (Subject?.id as unknown as number) && (
                    <div className="w-full flex z-50  top-0 left-0 flex-col gap-3  justify-start items-start absolute bg-green-200 p-3 rounded ">
                      <div className="flex items-center gap-2">
                        <h1>اسم المادة</h1>
                        <input
                          defaultValue={Subject?.name}
                          onChange={(e) => setEditName(e.target.value)}
                          type="text"
                          className="rounded px-2 w-full"
                          placeholder="ادخل الاسم الجديد"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <h1>وصف المادة</h1>
                        <input
                          defaultValue={Subject?.info}
                          onChange={(e) => setEditDescription(e.target.value)}
                          type="text"
                          className="rounded px-2 w-full"
                          placeholder="ادخل الوصف الجديد"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <h1>قسم المادة</h1>
                        <select
                          onChange={(e) => setSectionId(e.target.value)}
                          className="rounded px-2"
                        >
                          <option selected disabled value="">
                            اختر القسم
                          </option>
                          {AllSections?.sections?.length > 0 &&
                            AllSections.sections.map((section, index) => (
                              <option key={index} value={section.id}>
                                {section.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          EditSubjectHandeller(
                            Subject?.id as unknown as string
                          );
                        }}
                        className="w-full rounded p-2 bg-green-500 text-xl cursor-pointer text-text_color shadow-sm "
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
                        تعديل المادة
                      </span>
                      <icon.FaRegEdit
                        title="تعديل المادة"
                        className="self-end text-green-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() => {
                          setSubjectId(Subject?.id as unknown as string);
                          setToggle(!toggle);
                        }}
                      />
                    </div>
                    <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                      <label
                        htmlFor="delete-Subject"
                        className="text-sm flex gap-1  text-gray-400"
                      >
                        حذف المادة
                      </label>
                      <icon.CiTrash
                        id="delete-Subject"
                        title="حذف المادة"
                        className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() =>
                          DeleteSubjectHandeller(
                            Subject?.id as unknown as string
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
