import { QuestionInbody } from "@/Interfaces/InterFaces"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function RadioQuestion({ setCountOfChoies, countOfChoies, ChoiesFieldCount, ChoiesValue, setChoiesValue, QuestuionsInBody, SetQuestuionsInBody, setFullDegree }: {
    setCountOfChoies: React.Dispatch<React.SetStateAction<string>>,
    countOfChoies: string,
    ChoiesFieldCount: { input: React.ReactNode }[],
    ChoiesValue: { value: string }[],
    setChoiesValue: React.Dispatch<React.SetStateAction<{ id: number, value: string }[]>>,
    QuestuionsInBody: unknown[],
    SetQuestuionsInBody: React.Dispatch<React.SetStateAction<QuestionInbody>>,
    setFullDegree: React.Dispatch<React.SetStateAction<number>>
}) {
    const [question, setQuestion] = useState<string>('')
    const [questionType, setQuestionType] = useState('')
    const [answer, setAnswer] = useState('')
    const [multyAnswers, setMultyAnswers] = useState<string[]>([])
    const [degree, setDegree] = useState('')
    const [ChoiesMulty, setChoiesMulty] = useState<string[]>([])

    useEffect(() => {
        return setChoiesMulty(ChoiesValue.map((e) => e.value));
    }, [ChoiesValue])

    //Send Data Of Question To Save It In File Before send It to Server
    const SendDataOfQuestionHandeller = () => {
        if (questionType !== '' && question !== '' && degree !== '' && (questionType === 'radio' ? answer !== '' : ChoiesMulty.length !== 0)) {

            SetQuestuionsInBody([...QuestuionsInBody, {
                id: +QuestuionsInBody.length + +1,
                type: questionType,
                question: question,
                choase: ChoiesValue.length && ChoiesValue.map(e => e.value),
                answer: questionType === 'radio' ? answer : multyAnswers,
                degree: degree,
            }] as unknown as QuestionInbody
            )

            setFullDegree(prev => +prev + +degree);

            setChoiesValue([]);
            setAnswer('');
            setDegree('');
            setQuestion('');
            setCountOfChoies('');
            setQuestionType('');
            setChoiesMulty([])
            setMultyAnswers([])

            toast.success('تم إضافة السؤال بنجاح')
        }
        else toast.warning('يوجد  بعض من الحقول فارغة')
    }

    //When Type Of Question Is Checkbox And Choase Multiple Answer
    const ChoaseMultyAnswerHandeller = (e: ChangeEvent<HTMLSelectElement>) => {
        setMultyAnswers([...multyAnswers, e.target.value]);
        setChoiesMulty(ChoiesMulty.filter(el => el !== e.target.value))
    }

    return (
        <div className="flex justify-start items-start flex-col gap-3 w-full bg-slate-400 p-2">
            {/*Select Type Of Question */}
            <div className="flex justify-start  gap-2 items-center w-full">
                <h3 className="font-bold hidden md:block lg:block text-gray-700 ">نوع السؤال  </h3>
                <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} name="" id="" className="text-black cursor-pointer w-[90%] rounded outline-none">
                    <option selected disabled value="">اختر نوع السؤال</option>
                    <option value="radio">إختيار واحد</option>
                    <option value="checkbox">إختيار متعدد</option>
                    <option disabled value="textarea"> سؤال مقالي</option>
                </select>
            </div>
            {/*Enter The Question */}
            <div className="flex justify-start  w-full items-center gap-2">
                <h3 className="hidden md:block lg:block">السؤال:</h3>
                <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" name="" id="" className="rounded px-2 text-gray-700 w-[90%]" placeholder="اكتب السؤال" />
            </div>
            {/*Select Options Of The Answer */}
            <div className="flex justify-start flex-col w-full lg:flex-row md:flex-row  items-start gap-2">
                <h3 className="hidden md:block lg:block">الإختيارات:</h3>
                <select value={countOfChoies} onChange={(e) => setCountOfChoies(e.target.value)} name="" id="" className="rounded w-[90%] px-2 text-text_color">
                    <option selected disabled value="">عدد الإختيارات</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                </select>
                <div className="flex w-full justify-center flex-wrap">
                    {
                        ChoiesFieldCount?.length && ChoiesFieldCount?.map((e, i) =>
                            <div key={i} className="flex  justify-center items-center gap-2">
                                {e.input}
                            </div>
                        )
                    }
                </div>
            </div>
            {/*Select The Correct Answer */}
            <div className="flex justify-start w-full  items-center gap-2">
                <h3 className="hidden md:block lg:block">الإجابة الصحيحة</h3>
                {questionType === 'radio' &&
                    <select value={answer} onChange={(e) => setAnswer(e.target.value)} name="" id="" className="text-gray-600 rounded outline-none">
                        <option selected disabled value="">اختر الإجابة الصحيحة</option>
                        {
                            ChoiesValue.length && ChoiesValue.map((item, index) =>
                                item.value && <option key={index} value={item.value}>{item.value}</option>
                            )
                        }
                    </select>}

                {questionType === 'checkbox' &&
                    <div className="flex flex-wrap flex-col md:flex-row lg:flex-row justify-center items-center gap-2">
                        <select value={answer} onChange={(e) => ChoaseMultyAnswerHandeller(e)} name="" id="" className="text-gray-600 rounded outline-none">
                            <option selected disabled value="">اختر الإجابات الصحيحة</option>
                            {
                                ChoiesMulty.length && ChoiesMulty.map((item, index) =>
                                    item && <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                        <div className="flex gap-2">
                            {multyAnswers.length && multyAnswers.map((el, i) => {
                                return <span className="p-2 rounded bg-green-400 text-gray-700" onClick={() => { setChoiesMulty([...ChoiesMulty, el]); setMultyAnswers([...multyAnswers.filter(ele => ele !== el)]) }} key={i}>{el}</span>
                            }
                            )}
                        </div>
                    </div>
                }
            </div>
            {/*Select The Degree Of The Question */}
            <div className="flex justify-start  items-center gap-2">
                <h3 className="hidden md:block lg:block">درجة السؤال</h3>
                <input value={degree} onChange={(e) => setDegree(e.target.value)} type="number" name="" id="" min={1} max={100} className="rounded px-2 w-[90%] text-gray-600" placeholder="درجة السؤال" />
            </div>
            {/*Button To Save And Send The Data Of Question */}
            <button onClick={() => { SendDataOfQuestionHandeller() }} className="w-full hover:bg-blue-900 p-3 bg-blue-400 rounded">حفظ السؤال</button>
        </div>
    )
}
