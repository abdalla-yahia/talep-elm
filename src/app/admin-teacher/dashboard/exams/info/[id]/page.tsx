"use client";
import { deleteExamResult } from "@/lib/Actions/ExamsResultsActions";
import { fetchExamByID } from "@/lib/Actions/ExamsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchAllUsers } from "@/lib/Actions/UserActions";
import Link from "next/link";
import FullTitle from "@/Utils/FullTitle";
import DateConvert from "@/Utils/Date";
import * as icon from "@/Components/Icons/icons";
import { User } from "@prisma/client";
import { ExamResultInterface } from "@/Interfaces/InterFaces";

export default function ExamInfo() {
  const { DeleteExamResult } = useAppSelector(
    (state) => state.examResult
  ) as unknown as { DeleteExamResult: { status: number } };
  const { AllUsers } = useAppSelector((state) => state.user) as unknown as {
    AllUsers: { status: number; User: User[] };
  };
  const { Exam } = useAppSelector((state) => state.exam) as unknown as {
    Exam: { status: number; title: string; ExamResult: ExamResultInterface[] };
  };
  const { id } = useParams() as unknown as { id: string };
  const dispatch = useAppDispatch();
  //Get All Users
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  //Get A Specific Exam By ID
  useEffect(() => {
    dispatch(fetchExamByID(id));
  }, [DeleteExamResult, dispatch, id]);
  //Delete Score Of Exam Of User By Exam Result ID
  const DeleteScoreUserHandeller = (AssRsId: string) => {
    dispatch(deleteExamResult(AssRsId));
  };
  //Get Notifications Of Deleting Score
  useEffect(() => {
    if (DeleteExamResult?.status) {
      if (DeleteExamResult?.status === 200) {
        toast.success("تم حذف درجة الطالب بنجاح ");
      } else if (DeleteExamResult?.status === 400) {
        toast.error("حدث خطأ في حذف درجة الطالب ");
      }
    }
  }, [DeleteExamResult]);

  return (
    <>
      <FullTitle F_Title={`إختبار ${Exam?.title} `} />
      <div className="w-full">
        <div className="flex flex-col justify-center items-center mb-4 w-full text-gray-700">
          <h2 className="text-2xl font-bold w-full justify-center my-2  items-center">
            معلومات الإختبار
          </h2>
          <div className="flex items-start justify-start w-full gap-2  my-1">
            <h3>عدد الطلاب في الإختبار :</h3>
            <h3 className="ml-2 text-green-700 ">{`( ${Exam?.ExamResult?.length} )  طالب / طالبة`}</h3>
          </div>
          <div className="flex items-start justify-start w-full gap-2  my-1">
            <h3> إجمالي عدد الطلاب على الموقع :</h3>
            <h3 className="ml-2 text-blue-700 ">
              {`( ${AllUsers?.User?.length} )  طالب / طالبة`}{" "}
            </h3>
          </div>
          <div className="flex items-start justify-start w-full gap-2  my-1">
            <h3> نسبة الطلاب في الإختبار : </h3>
            <h3 className="ml-2 text-orange-700 ">
              {`( ${(
                (+Exam?.ExamResult?.length / +AllUsers?.User?.length) *
                100
              ).toFixed(2)} % )  طالب / طالبة`}{" "}
            </h3>
          </div>
          <div className="flex items-start justify-start w-full gap-2  my-1">
            <h3> عدد من لم يمتحنوا الإختبار : </h3>
            <h3 className="ml-2 text-yellow-700 ">
              {`( ${
                +AllUsers?.User?.length - +Exam?.ExamResult?.length
              } )  طالب / طالبة`}{" "}
            </h3>
          </div>
        </div>
      </div>
      <div className="table border-1 border-blue-400">
        <div className="table-header-group bg-blue-300 text-red-700 ">
          <span className="table-cell text-center border-1 py-1 border-blue-400">
            م
          </span>
          <span className="table-cell text-center border-1 py-1 border-blue-400">
            الاسم
          </span>
          <span className="table-cell text-center border-1 py-1 border-blue-400">
            المجموعة
          </span>
          <span className="table-cell text-center border-1 py-1 border-blue-400">
            الدرجة
          </span>
          <span className="table-cell text-center border-1 py-1 border-blue-400">
            موعد اداء الإختبار
          </span>
          <span className="table-cell text-center border-1 py-1 border-blue-400">
            حذف درجة الطالب
          </span>
        </div>
        {Exam?.ExamResult?.map((assRis, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0
                ? "bg-yellow-50 text-gray-700"
                : "bg-green-100 text-red-800"
            } table-row-group border-1 border-blue-600`}
          >
            <span className="table-cell text-center border-1 border-blue-300">
              {index + 1}
            </span>
            <span className="table-cell text-center border-1 border-blue-300">
              <Link
                className="bg-transparent border-none text-red-700 hover:text-blue-600"
                href={`../../students/details/${assRis?.User?.id}`}
              >
                {assRis?.User?.name}
              </Link>
            </span>
            <span className="table-cell text-center border-1 border-blue-300">
              <Link
                className="bg-transparent border-none text-red-700 hover:text-orange-600"
                href={`../../groups/details/${assRis?.User?.Groups?.id}`}
              >
                {assRis?.User?.Groups?.name}{" "}
              </Link>
            </span>
            <span className="table-cell text-center border-1 border-blue-300">
              {assRis?.score}
            </span>
            <span className="table-cell text-center border-1 border-blue-300">
              {DateConvert(assRis?.createdAt)}
            </span>
            <span className="table-cell text-center border-1 border-blue-300">
              <icon.CiTrash
                onClick={() =>
                  DeleteScoreUserHandeller(assRis?.id as unknown as string)
                }
                title="حذف درجة الطالب"
                className="hover:text-red-600 hover:text-xl transition-all p-0 bg-transparent border-none w-full cursor-pointer"
              />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
