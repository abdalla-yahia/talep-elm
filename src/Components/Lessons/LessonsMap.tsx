import DateConvert from "@/Utils/Date";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import * as icon from "../Icons/icons";
import LessonHookEdit from "./LessonHookEdit";
import Role from "@/Utils/Role";
import { AllLessonsInterFace } from "@/Interfaces/InterFaces";

export default function LessonsMap({
  lessons,
}: {
  lessons: AllLessonsInterFace[];
}) {
  const {
    setLessonId,
    DeleteLessonHandeller,
    AllSubjects,
    AllTeachers,
    toggle,
    setToggle,
    lessonId,
    setEditName,
    setEditDescription,
    setSubjectId,
    setTeacherID,
    EditLessonHandeller,
    UserLogedData,
  } = LessonHookEdit();
  return (
    <>
      <Accordion defaultActiveKey="0" className="w-full ">
        {lessons?.map((lesson, index: number) => (
          <Accordion.Item
            eventKey={index as unknown as string}
            key={index}
            className="relative"
          >
            <Accordion.Header>{lesson?.name}</Accordion.Header>
            <Accordion.Body>
              <Link
                href={`./lessons/details/${lesson?.id}`}
                className="bg-blue-100 z-20  w-full cursor-pointer  min-h-36 text-center p-2 rounded flex flex-col   "
              >
                <h1 className="text-3xl font-bold  shadow-sm text-purple-700 mb-2">
                  {lesson?.name}
                </h1>
                <div className="text-md text-green-500 ">
                  وصف: {lesson?.description}
                </div>
                <div className="text-md text-blue-500 ">
                  مادة : {lesson?.Subjects?.name}
                </div>
                <p className="card-footer text-sm text-gray-400">
                  تاريخ الإضافة : {DateConvert(lesson?.createdAt)}
                </p>
              </Link>
              <div className="z-50 absolute w-full top-0 left-0">
                {/* Edite Lesson Box */}
                {toggle && parseInt(lessonId) === lesson?.id && (
                  <div className="w-full flex z-50  top-0 left-0 flex-col gap-3  justify-start items-start absolute bg-green-200 p-3 rounded ">
                    <div className="flex items-center gap-2">
                      <h1>اسم المحاضرة</h1>
                      <input
                        defaultValue={lesson?.name}
                        onChange={(e) => setEditName(e.target.value)}
                        type="text"
                        className="rounded px-2"
                        placeholder="ادخل الاسم الجديد"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <h1>وصف المحاضرة</h1>
                      <input
                        defaultValue={lesson?.description}
                        onChange={(e) => setEditDescription(e.target.value)}
                        type="text"
                        className="rounded px-2"
                        placeholder="ادخل الوصف الجديد"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <h1>مادة المحاضرة</h1>
                      <select
                        defaultValue={lesson?.Subjects?.id}
                        onChange={(e) => setSubjectId(e.target.value)}
                        className="rounded px-2"
                      >
                        <option selected disabled value="">
                          اختر مادة المحاضرة
                        </option>
                        {AllSubjects?.Subjects?.length > 0 &&
                          AllSubjects?.Subjects?.map((subject, index) => (
                            <option key={index} value={subject.id}>
                              {subject.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1>مدرس المحاضرة</h1>
                      <select
                        defaultValue={lesson?.Teachers?.id}
                        onChange={(e) => setTeacherID(e.target.value)}
                        className="rounded px-2"
                      >
                        <option selected disabled value="">
                          اختر مدرس المحاضرة
                        </option>
                        {AllTeachers?.Teachers?.length > 0 &&
                          AllTeachers?.Teachers?.map((teacher, index) => (
                            <option key={index} value={teacher.id}>
                              {teacher.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        EditLessonHandeller(lesson?.id as unknown as string);
                      }}
                      className="w-full rounded p-2 bg-green-500 text-xl cursor-pointer text-text_color shadow-sm "
                    >
                      حفظ التعديلات
                    </button>
                  </div>
                )}
              </div>
              {/* Setting Buttons*/}
              {Role(UserLogedData?.role as unknown as string) > 1 && (
                <div className="bg-red-100 w-full gap-1 rounded py-1 flex justify-between px-2">
                  <div className=" w-full gap-2 flex  px-3 items-start">
                    <span className="text-sm text-gray-400">
                      تعديل المحاضرة
                    </span>
                    <icon.FaRegEdit
                      title="تعديل المحاضرة"
                      className="self-end text-green-600 hover:text-3xl transition-all cursor-pointer"
                      onClick={() => {
                        setLessonId(lesson?.id as unknown as string);
                        setToggle(!toggle);
                      }}
                    />
                  </div>
                  <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                    <label
                      htmlFor="delete-lesson"
                      className="text-sm flex gap-1  text-gray-400"
                    >
                      حذف المحاضرة
                    </label>
                    <icon.CiTrash
                      id="delete-lesson"
                      title="حذف المحاضرة"
                      className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer"
                      onClick={() =>
                        DeleteLessonHandeller(lesson?.id as unknown as string)
                      }
                    />
                  </div>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
