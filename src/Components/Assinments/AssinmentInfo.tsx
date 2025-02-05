import Accordion from "react-bootstrap/Accordion";
import QuestionsPage from "../Questions/QuestionsPage";
import Link from "next/link";
import TimerQuestions from "../Questions/TimerQuestions";
import AssinmentHook from "./AssinmentHook";
import { AllAssinmentInterface } from "@/Interfaces/InterFaces";
// import { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { fetchAssinmentResultByID } from "@/lib/Actions/AssinmentsResultsActions";

export default function AssinmentInfo({
  Assinment,
}: {
  Assinment: AllAssinmentInterface;
  }) {
  const {
    answers,
    setAnswers,
    toggle,
    setToggle,
    toggleAssinment,
    setToggleAssinment,
    UserDegree,
    FullDegree,
    OpenAssinment,
    SendAnswersHandeller,
  } = AssinmentHook({ Assinment });

  return (
    <>

        <div className="w-full">
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            معلومات عن التكليف:
            <p className="font-bold text-red-500">{Assinment.description} </p>
          </h2>
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            الطلاب المشتركين في التكليف:
            <p className="font-bold text-slate-500">
              {Assinment?.User?.length} طالب/طالبة
            </p>
          </h2>
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            {" "}
            مدرس المادة:
            <p className="font-bold text-green-800">
              <Link
                className="font-bold"
                href={`../../teachers/details/${Assinment?.teacher?.id}`}
              >
                {Assinment?.teacher?.name}{" "}
              </Link>{" "}
            </p>
          </h2>
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            {" "}
            تكليف المحاضرة :
            <p className="font-bold text-slate-500">
              {Assinment?.Lessons?.name}
            </p>
          </h2>
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            {" "}
            مادة التكليف :
            <p className="font-bold text-slate-500">
              {Assinment?.Subjects?.name}
            </p>
          </h2>
          {toggleAssinment && (
            <div className="w-full flex-col">
              {Assinment?.assinmentbody?.time && (
                <span
                  className={`${
                    toggle ? "hidden" : "block"
                  } my-1 text-blue-600`}
                >
                  <span className="text-red-700">ملحوظة:</span> يوجد مؤقت زمني
                  لللإختبار يبدأ بمجرد الضغط على زر فتح الإختبار
                </span>
              )}
              <button
                onClick={() => {
                  setToggle(true);
                  OpenAssinment();
                }}
                className={`${
                  toggle ? "hidden" : "block"
                } rounded text-xl p-2 w-full bg-green-700 cursor-pointer`}
              >
                اضغط لفتح الإختبار
              </button>
            </div>
          )}
          {toggle && (
            <>
              <div className="text-center flex flex-col w-full gap-2 text-xl my-3 font-bold text-gray-900">
                <p className="text-3xl text-red-500 shadow p-2"> الإمتحان </p>
                {Assinment?.assinmentbody?.time && (
                  <TimerQuestions
                    houres={Assinment?.assinmentbody?.time?.hours}
                    minutes={Assinment?.assinmentbody?.time?.minutes}
                    seconds={Assinment?.assinmentbody?.time?.seconds}
                    setToggle={
                      setToggle as unknown as React.Dispatch<
                        React.SetStateAction<boolean>
                      >
                    }
                    setToggleAssinment={
                      setToggleAssinment as unknown as React.Dispatch<
                        React.SetStateAction<boolean>
                      >
                    }
                    SendAnswersHandeller={SendAnswersHandeller}
                  />
                )}
                <span>
                  الدرجة الكلية للتكليف :{" "}
                  <span className="text-red-500 font-bold">{FullDegree} </span>
                  درجة
                </span>
                <div className="font-bold text-blue-500 shadow-lg py-3 shadow-orange-500">
                  {Assinment?.assinmentbody?.questions?.map((e, i) => {
                    return (
                      <>
                        <Accordion key={i}>
                          <Accordion defaultActiveKey="0">
                            <QuestionsPage
                              type={e.type}
                              id={e.id}
                              question={e.question}
                              choase={e.choase}
                              degree={e.degree}
                              answers={answers}
                              setAnswers={setAnswers}
                            />
                          </Accordion>
                        </Accordion>
                      </>
                    );
                  })}{" "}
                </div>
              </div>
              {Assinment?.assinmentbody?.questions &&
              +Assinment?.assinmentbody?.questions?.length > +answers.length ? (
                <span className="text-red-800">
                  تنبيه: يوجد عدد{" "}
                  <span className="font-bold text-blue-600">
                    {+Assinment?.assinmentbody?.questions?.length -
                      +answers.length}{" "}
                  </span>
                  سؤال لم يتم إجابته!!
                </span>
              ) : (
                <span className="text-green-700">
                  تمت الإجابة على كل الأسأله
                </span>
              )}
              {answers?.length ===
                Assinment?.assinmentbody?.questions?.length && (
                <button
                  onClick={() => {
                    SendAnswersHandeller();
                    setToggle(false);
                    setToggleAssinment(false);
                  }}
                  className="w-full my-3 bg-green-600 p-3 rounded shadow hover:bg-red-700"
                >
                  إرسال الإجابات
                </button>
              )}
            </>
          )}
          {!toggleAssinment && (
            <div className="w-full gap-2 flex">
              <h1 className="font-bold flex justify-center items-center gap-2">
                درجتك فى التكليف :
              </h1>
              <span className="text-green-600 font-bold ">
                <span className="font-bold text-2xl text-red-700">
                  {UserDegree}
                </span>
                درجة
              </span>
            </div>
          )}
        </div>

    </>
  );
}
