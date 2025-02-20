'use client'
import { createLesson } from "@/lib/Actions/LessonsActions"
import { fetchSubjects } from "@/lib/Actions/SubjectsActions"
import { fetchAllTeachers } from "@/lib/Actions/TeachersActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Image from "next/image";
import * as img from '../../../public/avatar'
import { ChangeEvent, useEffect, useState, SetStateAction } from 'react';
import { toast } from "react-toastify"
import { Subjects, Teachers } from "@prisma/client"

export default function CreateNewLesson() {
    const { AllSubjects } = useAppSelector(state => state.subject) as unknown as { AllSubjects: { Subjects: Subjects[] } }
    const { AllTeachers } = useAppSelector(state => state.teacher) as unknown as { AllTeachers: { Teachers: Teachers[] } }
    const { CreateLesson } = useAppSelector(state => state.lesson) as unknown as { CreateLesson: { status: number } }
    const [lessonName, setLessonName] = useState('')
    const [lessonDescription, setLessonDescription] = useState('')
    const [LinkVideo, setLinkVideo] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [teachertId, setTeacherId] = useState('')
    const [uploadFiles, setUploadFiles] = useState([])
    const [path, setPath] = useState<[{ name: string }]>([{ name: '' }])

    const dispatch = useAppDispatch()
    //Fetch All Subjects And Teachers
    useEffect(() => {
        dispatch(fetchSubjects())
        dispatch(fetchAllTeachers())
    }, [dispatch])
    //Upload File To Server Before Create Lesson
    const uploadFilesHandeller = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const upload = URL.createObjectURL(e.target.files[0])
            setUploadFiles([...uploadFiles, upload] as unknown as SetStateAction<never[]>)
            setPath([...path, e.target.files[0]] as unknown as SetStateAction<[{ name: string; }]>)
            const formData = new FormData();
            Object.values(e.target.files).forEach((file) => {
                formData.append("file", file);
            });

            const response = await fetch("/api/v1/upload", {
                method: "POST",
                body: formData,
            });


            const result = await response.json();
            if (result.success) {
            }
        }
    }
    //Create Lesson And Upload File to DB
    const CreateLessonHandeller = () => {
        if (lessonName !== '' && lessonDescription !== '' && subjectId !== '' && teachertId !== '') {

            dispatch(createLesson({
                name: lessonName,
                description: lessonDescription,
                subjectId: parseInt(subjectId),
                teacherId: parseInt(teachertId),
                body: {
                    fileName: path?.map((file) => file?.name),
                    linkVideo: LinkVideo
                }
            }))

        } else toast.warning('يرجي إكمال البيانات')
    }
    //Get Notifacations Of Success Or File Upload
    useEffect(() => {
        if (CreateLesson?.status) {
            if (CreateLesson?.status === 201) {
                toast.success('تم إضافة الدرس بنجاح');
                setLessonName('')
                setLessonDescription('')
                setLinkVideo('')
                setSubjectId('')
                setTeacherId('')

            } else toast.error('لم يتم إضافة الدرس بنجاح')
        }
    }, [CreateLesson])

    return (
        <div className="flex w-full justify-start items-center flex-col p-3 gap-2 text-gray-700">
            <div className="flex md:justify-between lg:justify-between justify-center  items-center lg:w-[70%] shadow-sm w-full gap-2 p-2 rounded">
                <h1 className="text-xl font-bold hidden lg:block md:block">اسم الدرس</h1>
                <input value={lessonName} onChange={(e) => setLessonName(e.target.value)} type="text" className="p-2 lg:w-[50%] md:w-[60%] w-[100%] rounded " placeholder="اسم الدرس" />
            </div>
            <div className="flex md:justify-between lg:justify-between justify-center  items-center lg:w-[70%] shadow-sm w-full gap-2 p-2 rounded">
                <h1 className="text-xl font-bold hidden lg:block md:block">وصف الدرس</h1>
                <input value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)} type="text" className="p-2 lg:w-[50%] md:w-[60%] w-[100%] rounded " placeholder="وصف الدرس" />
            </div>
            <div className="flex md:justify-between lg:justify-between justify-center  items-center lg:w-[70%] shadow-sm w-full gap-2 p-2 rounded">
                <h1 className="text-xl font-bold hidden lg:block md:block">المادة التابع لها الدرس</h1>
                <select onChange={(e) => setSubjectId(e.target.value)} name="" id="" className="p-2 lg:w-[50%] md:w-[60%] w-[100%] rounded ">
                    <option selected disabled value="">اختر المادة التابع لها الدرس </option>
                    {
                        AllSubjects?.Subjects && AllSubjects?.Subjects?.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="flex md:justify-between lg:justify-between justify-center  items-center lg:w-[70%] shadow-sm w-full gap-2 p-2 rounded">
                <h1 className="text-xl font-bold hidden lg:block md:block">مدرس المادة</h1>
                <select onChange={(e) => setTeacherId(e.target.value)} name="" id="" className="p-2 lg:w-[50%] md:w-[60%] w-[100%] rounded ">
                    <option selected disabled value="">اختر مدرس المادة </option>
                    {
                        AllTeachers?.Teachers && AllTeachers?.Teachers?.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="flex md:justify-between lg:justify-between justify-center  items-center lg:w-[70%] shadow-sm w-full gap-2 p-2 rounded">
                <h1 className="text-xl font-bold hidden lg:block md:block">رابط  فيديو الدرس</h1>
                <input onChange={(e) => setLinkVideo(e.target.value)} type="text" className="p-2 lg:w-[50%] md:w-[60%] w-[100%] rounded " placeholder="محتوى الدرس" />
            </div>
            <div className="flex justify-center items-center gap-2">
                {
                    path.length > 0 && path.map((item, index) => {
                        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.heif', '.raw'];
                        const Extention = item?.name.slice(item?.name.indexOf('.'),)
                        if (imageExtensions.includes(Extention))
                            return <Image key={index} className=" " src={URL.createObjectURL(item as unknown as Blob)} width={50} height={50} alt="upload" />

                        if (Extention === '.pdf')
                            return <Image key={index} className=" " src={img.Pdf} width={50} height={50} alt="upload" />

                        if (Extention === '.mp3' || Extention === '.wav' || Extention === '.ogg' || Extention === '.flac')
                            return <Image key={index} className=" " src={img.Mp3} width={50} height={50} alt="upload" />

                        if (Extention === '.mp4' || Extention === '.avi' || Extention === '.mov' || Extention === '.flv')
                            return <Image key={index} className=" " src={img.Mp4} width={50} height={50} alt="upload" />


                    })
                }
            </div>
            <div className="flex md:justify-between my-3 relative lg:justify-between justify-center  items-center lg:w-[70%] shadow-sm w-full gap-2 p-2 rounded">
                <label htmlFor="file" className="w-full cursor-pointer text-center rounded text-text_color p-2 bg-gray-500"> رفع ملفات
                    <input className="cursor-pointer hidden z-50 absolute w-full top-[0%] left-[0%]" type="file" id="file" name="file" onChange={(e) => uploadFilesHandeller(e)} />
                </label>
            </div>
            <button onClick={() => CreateLessonHandeller()} className="w-full p-3 cursor-pointer hover:bg-second_background_color0 hover:text-text_color rounded text-xl bg-blue-300 text-gray-700">حفظ الدرس</button>
        </div>
    )
}
