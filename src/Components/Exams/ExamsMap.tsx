import Link from "next/link";
import  Accordion  from "react-bootstrap/Accordion";
import ExamEditHook from "./ExamEditHook";
import * as icon from '@/Components/Icons/icons';
import Role from "@/Utils/Role";
import { AllExamsInterface } from "@/Interfaces/InterFaces";

export default function ExamMap({Exams}:{Exams:AllExamsInterface[]}) {
  const     {UserLogedData,toggle, setToggle, setEditName, setEditFullDegree,
    ExamId,setExamId,EditExamHandeller,DeleteExamHandeller,
    AllSubjects,AllTeachers,setsubjectId,setteacherId
 } = ExamEditHook()
  return (
    <>
    <Accordion defaultActiveKey="0" className="w-full">
    {
        Exams?.map((Exam, index:number) => 
          <Accordion.Item eventKey={index as unknown as string} key={index} className="relative">
        <Accordion.Header>{Exam.title}</Accordion.Header>
        <Accordion.Body>
            <Link href={`./exams/details/${Exam?.id}`}  className="bg-blue-100 px-2 gap-2 text-gray-700 w-full cursor-pointer  min-h-36 text-center py-2 rounded flex flex-col   ">
                <h1 className="text-gray-700 text-2xl  line-clamp-2">{Exam.title}</h1>
                <div className="text-sm  flex">
                  <h2 className="text-blue-800">مادة :</h2>
                  <span className="text-orange-800">{Exam?.Subjects?.name}</span>
                  </div>

                <div className="text-sm  flex">
                  <h2 className="text-blue-800">مؤقت للإختبار :</h2>
                  <span className="text-green-800">{Exam?.Exambody?.time ?'نعم يوجد ':'لا يوجد'}</span>
                  </div>
                </Link>

                    {/* Edite Exam Box */}
                    {toggle && parseInt(ExamId) === Exam?.id && <div className="w-full flex z-50  top-0 left-0 flex-col gap-3  justify-start items-start absolute bg-green-200 p-3 rounded ">
                    
                    <div className="flex items-center gap-2">
                      <h1>اسم الاختبار</h1>
                      <input defaultValue={Exam?.title} onChange={(e)=>setEditName(e.target.value)} type="text" className="rounded px-2" placeholder="ادخل الاسم الجديد" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <h1>درجة الاختبار</h1>
                      <input defaultValue={Exam?.fullDegree} onChange={(e)=>setEditFullDegree(e.target.value)} type="text" className="rounded px-2" placeholder="ادخل الدرجة الجديد" />
                    </div>
                      {/*Select Subject */}
                    <div className="flex items-center gap-2">
                      <h1> المادة</h1>
                      <select  onChange={(e)=>setsubjectId(e.target.value)}  className="rounded px-2"  >
                      <option selected disabled value="">اختر  المادة</option>
                          {
                            AllSubjects?.Subjects?.length > 0 && AllSubjects.Subjects.map((subject, index) => (
                              <option key={index} value={subject.id}>{subject.name}</option>
                            ))
                          }
                      </select>
                    </div>

                      {/*Select Teacher */}
                    <div className="flex items-center gap-2">
                      <h1> المدرس</h1>
                      <select  onChange={(e)=>setteacherId(e.target.value)}  className="rounded px-2"  >
                      <option selected disabled value="">اختر  المدرس</option>
                          {
                            AllTeachers?.Teachers?.length > 0 && AllTeachers.Teachers.map((teacher, index) => (
                              <option key={index} value={teacher.id}>{teacher.name}</option>
                            ))
                          }
                      </select>
                    </div>


                      <button onClick={()=>{EditExamHandeller(Exam?.id as unknown as string)}} className="w-full rounded p-2 bg-green-500 text-xl cursor-pointer text-white shadow-sm ">حفظ التعديلات</button>
                </div>}
              
                {/* Setting Buttons*/}
                {Role(UserLogedData?.role as unknown as string) > 1 && <div className="bg-red-100 w-full gap-1 rounded py-1 flex justify-between px-2">
                    <div className=" w-full gap-2 flex  px-3 items-start">
                      <span className="text-sm text-gray-400">تعديل الاختبار</span>
                      <icon.FaRegEdit  title="تعديل الاختبار" className="self-end text-green-600 hover:text-3xl transition-all cursor-pointer" onClick={()=>{setExamId(Exam?.id as unknown as string);setToggle(!toggle)}}/>
                    </div>
                    <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                      <label htmlFor="delete-Exam" className="text-sm flex gap-1  text-gray-400">حذف الاختبار</label>
                      <icon.CiTrash  id="delete-Exam"  title="حذف الاختبار" className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer" onClick={()=>DeleteExamHandeller(Exam?.id)}/>
                    </div>
                </div>}
                </Accordion.Body>
                </Accordion.Item>
        )
    }
    </Accordion>
    </>
  )
}
