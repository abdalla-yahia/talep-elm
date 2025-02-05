import Accordion from "react-bootstrap/Accordion";
import QuestionsPage from "../Questions/QuestionsPage";
import Link from "next/link";
import TimerQuestions from "../Questions/TimerQuestions";
import ExamHook from "./ExamHook";
import { AllExamsInterface } from "@/Interfaces/InterFaces";

export default function ExamInfo({ Exam }: { Exam: AllExamsInterface}) {
  const {
    answers,
    setAnswers,
    toggle,
    setToggle,
    toggleExam,
    setToggleExam,
    UserDegree,
    FullDegree,
    OpenExam,
    SendAnswersHandeller,
  } = ExamHook({ Exam});

  return (
    <>
        <div className="w-full">
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            الدرجة النهائية للإختبار:
            <p className="font-bold text-red-500">{Exam.fullDegree} </p>
          </h2>
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            الطلاب المشتركين في الإختبار:
            <p className="font-bold text-slate-500">
              {Exam?.User?.length} طالب/طالبة
            </p>
          </h2>
          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            {" "}
            مدرس المادة:
            <p className="font-bold text-green-800">
              <Link
                className="font-bold"
                href={`../../teachers/details/${Exam?.teacher?.id}`}
              >
                {Exam?.teacher?.name}{" "}
              </Link>{" "}
            </p>
          </h2>

          <h2 className="text-center flex gap-2 text-xl my-3 font-bold text-gray-900">
            {" "}
            مادة الإختبار :
            <p className="font-bold text-slate-500">{Exam?.Subjects?.name}</p>
          </h2>
          {toggleExam && (
            <div className="w-full flex-col">
              {Exam?.Exambody?.time && (
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
                  OpenExam();
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

                {Exam?.Exambody?.time && (
                  <TimerQuestions
                    houres={Exam?.Exambody?.time?.hours}
                    minutes={Exam?.Exambody?.time?.minutes}
                    seconds={Exam?.Exambody?.time?.seconds}
                    setToggle={
                      setToggle as unknown as React.Dispatch<
                        React.SetStateAction<boolean>
                      >
                    }
                    setToggleAssinment={
                      setToggleExam as unknown as React.Dispatch<
                        React.SetStateAction<boolean>
                      >
                    }
                    SendAnswersHandeller={SendAnswersHandeller}
                  />
                )}

                <span>
                  الدرجة الكلية للإختبار :{" "}
                  <span className="text-red-500 font-bold">{FullDegree} </span>
                  درجة
                </span>
                <div className="font-bold text-blue-500 shadow-lg py-3 shadow-orange-500">
                  {Exam?.Exambody?.questions?.map((e, i) => {
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
              {Exam?.Exambody?.questions &&
              +Exam?.Exambody?.questions?.length > +answers.length ? (
                <span className="text-red-800">
                  تنبيه: يوجد عدد{" "}
                  <span className="font-bold text-blue-600">
                    {+Exam?.Exambody?.questions?.length - +answers.length}{" "}
                  </span>
                  سؤال لم يتم إجابته!!
                </span>
              ) : (
                <span className="text-green-700">
                  تمت الإجابة على كل الأسأله
                </span>
              )}
              {answers?.length === Exam?.Exambody?.questions?.length && (
                <button
                  onClick={() => {
                    SendAnswersHandeller();
                    setToggle(false);
                    setToggleExam(false);
                  }}
                  className="w-full my-3 bg-green-600 p-3 rounded shadow hover:bg-red-700"
                >
                  إرسال الإجابات
                </button>
              )}
            </>
          )}
          {!toggleExam && (
            <div className="w-full gap-2 flex">
              <h1 className="font-bold flex justify-center items-center gap-2">
                درجتك فى الإختبار :
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
