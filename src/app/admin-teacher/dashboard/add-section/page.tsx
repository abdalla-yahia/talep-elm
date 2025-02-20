'use client'
import { fetchAllManagers } from "@/lib/Actions/ManagersActions";
import { createSection } from "@/lib/Actions/SectionsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FullTitle from "@/Utils/FullTitle";
import { Manager } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateAnewSection() {
    const [nameOfSection, setNameOfSection] = useState('')
    const [DescriptionOfSection, setDescriptionOfSection] = useState('')
    const [managerId, setManagerId] = useState('')
    const { CreateSection } = useAppSelector(state => state.section) as unknown as { CreateSection: { status: number } }
    const { AllManagers } = useAppSelector(state => state.manager) as unknown as { AllManagers: { Managers: Manager[] } }
    const dispatch = useAppDispatch()

    //Get All Managers
    useEffect(() => {
        dispatch(fetchAllManagers())
    }, [dispatch])
    //Create Section Handeller
    const CreateSectionHandeller = () => {
        if (nameOfSection !== '' && managerId !== '' && DescriptionOfSection !== '') {
            dispatch(createSection({
                name: nameOfSection,
                managerId: parseInt(managerId),
                description: DescriptionOfSection,
            }))

        } else toast.warning('اكمل بيانات القسم أولاً')
    }
    //Get Notificatios of Creator Section If Success or Fail
    useEffect(() => {
        if (CreateSection?.status) {
            if (CreateSection?.status === 201) {
                toast.success('تم إنشاء القسم بنجاح')
                setNameOfSection('')
                setManagerId('')
            } else if (CreateSection?.status === 400) {
                toast.error('حدث خطأ أثناء إنشاء القسم')
            }
        }
    }, [CreateSection])

    return (
        <>
            <FullTitle F_Title={'إضافة قسم جديد'} />
            <div className="flex flex-col w-full gap-2 bg-secondary_color0 rounded">
                <div className="flex justify-start items-center w-full p-3 gap-2">
                    <h3>اسم القسم العلمي</h3>
                    <input value={nameOfSection} onChange={(e) => setNameOfSection(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="اسم القسم العلمي" />
                </div>
                <div className="flex justify-start items-center w-full p-3 gap-2">
                    <h3>وصف القسم العلمي</h3>
                    <input value={DescriptionOfSection} onChange={(e) => setDescriptionOfSection(e.target.value)} type="text" name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" placeholder="وصف القسم العلمي" />
                </div>
                <div className="flex justify-start items-center w-full p-3 gap-2">
                    <h3>مدير القسم العلمي</h3>
                    <select value={managerId} onChange={(e) => setManagerId(e.target.value)} name="" id="" className="rounded w-[50%] caret-black text-gray-700 placeholder:text-red-200 px-2 outline-none" >
                        <option selected disabled value="">اختر مدير القسم العلمي</option>
                        {
                            AllManagers?.Managers?.length > 0 && AllManagers?.Managers?.map((item, index: number) =>
                                <option key={index} value={item.id}>{item.name}</option>
                            )
                        }
                    </select>
                </div>
                <button onClick={() => CreateSectionHandeller()} className="w-full bg-blue-300 text-gray-700 p-3 text-2xl cursor-pointer hover:bg-blue-400 rounded">إضافة القسم</button>

            </div>
        </>
    )
}
