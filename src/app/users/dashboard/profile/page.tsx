'use client'
import { deleteUser, fetchUserById, updateUser } from "@/lib/Actions/UserActions"
import { fetchAssinments } from "@/lib/Actions/AssinmentsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import DateConvert from "@/Utils/Date"
import FullTitle from "@/Utils/FullTitle"
import Image from "next/image"
import * as img from '../../../../../public/avatar';
import * as icon from '@/Components/Icons/icons'
import { AllUserInterface, LogedUserInterface } from "@/Interfaces/InterFaces";
import { AssinmentResult, Assinments, Exam, ExamResult } from "@prisma/client";
import Swal from "sweetalert2";
import { fetchExams } from "@/lib/Actions/ExamsActions";

export default function ProfilePage() {
    const { AllAssinments } = useAppSelector(state => state.assinment) as unknown as { AllAssinments: Assinments[] }
    const { AllExams } = useAppSelector(state => state.exam) as unknown as { AllExams: Exam[] }
    const { UserLogedData } = useAppSelector(state => state.user) as unknown as { UserLogedData: LogedUserInterface }
    const { DeleteUser } = useAppSelector(state => state.user) as unknown as { DeleteUser: { status: number } }
    const { UpdateUser } = useAppSelector(state => state.user) as unknown as { UpdateUser: { status: number } }
    const { user } = useAppSelector(state => state.user) as unknown as { user: { user: AllUserInterface, AssinmentResult: AssinmentResult[], ExamResult: ExamResult[] } }
    const [toggle, setToggle] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const [education, setEducation] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState('')
    const [path, setPath] = useState({ name: '' })
    const dispatch = useAppDispatch()
    //Get User Data And All Assinments
    useEffect(() => {
        dispatch(fetchUserById(UserLogedData?.id))
        dispatch(fetchAssinments())
        dispatch(fetchExams())
    }, [UserLogedData, dispatch, UpdateUser, DeleteUser])
    //Get Upload Image From User
    const uploadFilesHandeller = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const upload = URL.createObjectURL(e.target.files[0])
            setImage(upload)
            setPath(e.target.files[0])
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
    //Update User Data  Handeller
    const UpdateUserHAndeller = () => {
        if (name !== '' && email !== '' && phone !== '' && password.length >= 8) {
            if (password === confirmPassword) {
                dispatch(updateUser({
                    id: parseInt(UserLogedData?.id),
                    name,
                    email,
                    telephone: phone,
                    address,
                    age: parseInt(age),
                    education,
                    password,
                    image: path !== undefined ? '/uploads/images/' + path?.name : image
                }))
            } else {
                toast.error('الرقم السري غير متطابق')
            }
        } else toast.warning('يجب ادخال جميع البيانات بما في ذلك الرقم السري')
    }
    //Set User Data To State On First Time Open Page and open toggle
    const ShowBoxEditHandeller = () => {
        setToggle(!toggle)
        setName(user?.user?.name || '')
        setEmail(user?.user?.email || '')
        setPhone(user?.user?.telephone || '')
        setAddress(user?.user?.address as unknown as string)
        setAge(user?.user?.age as unknown as string)
        setEducation(user?.user?.education as unknown as string)
        setImage(user?.user?.image as unknown as string)
    }
    //Delete User Data Handeller
    const DeleteUserHandeller = () => {
        Swal.fire({
            title: 'هل ستقوم بحذف هذا الحساب نهائياً؟',
            text: '!!سيؤدي هذا إلى حذف جميع بيانات الحساب نهائياً',
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: 'إلغاء',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: 'نعم ! قم بحذف الحساب نهائياً',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(UserLogedData?.id as unknown as string))
                Swal.fire({
                    title: "تم الحذف!",
                    text: "تم الحذف بنجاح.",
                    icon: "success"
                });
            }
        });
    }
    //Delete Notifications
    useEffect(() => {
        if (DeleteUser?.status) {
            if (DeleteUser?.status === 200) {
                toast.success('تم حذف المستخدم بنجاح ')
                setToggle(false)
            } else {
                toast.error('حدث خطأ ')
            }
        }
    }, [DeleteUser])
    //Update Notifications
    useEffect(() => {
        if (UpdateUser?.status) {
            if (UpdateUser?.status === 201) {
                toast.success('تم تحديث البيانات بنجاح ')
                setToggle(false)
            } else {
                toast.error('حدث خطأ ')
            }
        }
    }, [UpdateUser])

    return (
        <>
            <FullTitle F_Title={`الصفحة الشخصية لـ ( ${user?.user?.name} )`} />
            {/*Personal Data Card */}
            <div className="card w-full relative flex justify-center items-start pt-3">
                <div className="card-head mb-3 self-center w-full flex justify-center items-center">
                    <h2 className="card-head-title">البيانات الشخصية</h2>
                </div>
                <div className="flex md:flex-row lg:flex-row flex-col-reverse items-center gap-3 justify-between w-full pl-3">
                    <div className="card-body">
                        <h5 className="card-title">الاسم: {user?.user?.name}</h5>
                        <p className="card-text">البريد الالكتروني: {user?.user?.email} </p>
                        <p className="card-text">رقم الهاتف: {user?.user?.telephone} </p>
                        <p className="card-text">الجنس: {user?.user?.gender === 'MALE' ? 'ذكر' : 'انثي'} </p>
                        <p className="card-text">العنوان: {user?.user?.address} </p>
                        <p className="card-text">العمر: {user?.user?.age} </p>
                        <p className="card-text">التعليم: {user?.user?.education} </p>
                    </div>
                    <div className="card-image">
                        <Image width={150} height={150} src={user?.user?.image && `${user?.user?.image}` || img.male_admin} alt="profile" className="rounded-[20%]" />
                    </div>
                </div>
                <div className="card-foot text-sm bg-gray-500 w-full flex justify-center items-center">
                    <p className="card-text text-primary_color">تم الاضافة في {DateConvert(user?.user?.createdAt)} </p>
                </div>
                {/* Edit Personal Data */}
                {toggle && <div className="edit z-50 bg-green-200 absolute w-full top-0 left-0">
                    <div className="flex justify-between w-full pl-3">
                        <div className="card-body">
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block">الاسم: </h5>
                                <input defaultValue={user?.user?.name} onChange={(e) => setName(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="اسم المستخدم" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block">البريد الإلكتروني: </h5>
                                <input defaultValue={user?.user?.email} onChange={(e) => setEmail(e?.target?.value)} type="email" name="" id="" className="w-full rounded px-2" placeholder="البريد الإلكتروني" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> الهاتف: </h5>
                                <input defaultValue={user?.user?.telephone} onChange={(e) => setPhone(e?.target?.value)} type="tel" dir="rtl" name="" id="" className="w-full rounded px-2" placeholder="الهاتف" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> العنوان: </h5>
                                <input defaultValue={user?.user?.address as unknown as string} onChange={(e) => setAddress(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="العنوان" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> العمر: </h5>
                                <input defaultValue={user?.user?.age as unknown as string} onChange={(e) => setAge(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="العمر" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> التعليم: </h5>
                                <input defaultValue={user?.user?.education as unknown as string} onChange={(e) => setEducation(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="التعليم" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> الرقم السري: </h5>
                                <input onChange={(e) => setPassword(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="الرقم السري يجب أن لا يقل عن 8 احرف" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> تأكيد الرقم السري: </h5>
                                <input onChange={(e) => setConfirmPassword(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="تأكيد الرقم السري" />
                            </div>
                        </div>
                        <div className="card-image">
                            <label htmlFor="uploadPersonalImage" className="cursor-pointer">
                                <Image width={150} height={150} src={image || img.male_admin} alt="profile" />
                                <input onChange={(e) => uploadFilesHandeller(e)} type="file" name="" id="uploadPersonalImage" className="hidden" />
                                <icon.RiImageAddLine className="w-full" />
                            </label>
                        </div>
                    </div>
                    <button onClick={() => UpdateUserHAndeller()} className="w-full p-2 bg-orange-500 text-text_color">حفظ البيانات</button>
                </div>}
                {/* Button On Click It Show Card Edit Or Delete User Account*/}
                <icon.FaRegEdit title="تعديل البيانات" onClick={() => { ShowBoxEditHandeller() }} className=" absolute top-1 right-2 text-xl text-green-500 p-0 cursor-pointer" />
                <icon.CiTrash title="حذف حسابك نهائياً" onClick={() => { DeleteUserHandeller() }} className=" absolute top-1 left-2 text-xl text-accent_color p-0 cursor-pointer" />
            </div>
            {/*Assinment Data Card */}
            <div className="card w-full flex justify-center items-start pt-3">
                <div className="card-head self-center w-full flex justify-center items-center">
                    <h2 className="card-head-title"> بيانات التكليفات</h2>
                </div>
                <div className="card-body  w-full pl-3">
                    <p className="card-text">إجمالي التكليفات: {AllAssinments?.length} </p>
                    <p className="card-text">عدد تكليفاتك: {user?.user?.AssinmentResult?.length} </p>
                    <p className="card-text">عدد التكليفات المتبقية لك: {(+(AllAssinments?.length) - +(user?.user?.AssinmentResult?.length)) === 0 ? <span className="text-green-500">تم إداء كل التكليفات 👍</span> : <span className="text-accent_color">{(+(AllAssinments?.length) - +(user?.user?.AssinmentResult?.length))} تكليف </span>}  </p>
                    <p className="card-text">درجات التكليفات: {user?.user?.AssinmentResult?.length && user?.user?.AssinmentResult?.map(e => e.score + ' , ')} </p>
                </div>
                <div className="card-footer w-full bg-slate-400">
                    <p className="text-blue-700">إجمالي درجات التكليفات : {user?.user?.AssinmentResult?.length > 0 && user?.user?.AssinmentResult?.map(e => +e?.score)?.reduce((e, el) => e + el)} درجة</p>
                </div>
            </div>
            {/*Exams Data Card */}
            <div className="card w-full flex justify-center items-start pt-3">
                <div className="card-head self-center w-full flex justify-center items-center">
                    <h2 className="card-head-title"> بيانات الإختبارات</h2>
                </div>
                <div className="card-body  w-full pl-3">
                    <p className="card-text">إجمالي الإختبارات: {AllExams?.length} </p>
                    <p className="card-text">عدد إختباراتك: {user?.user?.ExamResult?.length} </p>
                    <p className="card-text">عدد الإختبارات المتبقية لك: {(+(AllExams?.length) - +(user?.user?.ExamResult?.length)) === 0 ? <span className="text-green-500">تم إداء كل الإختبارات 👍</span > : <span className="text-accent_color">{(+(AllExams?.length) - +(user?.user?.ExamResult?.length))}إختبار</span>} </p>
                    <p className="card-text">درجات الإختبارات: {user?.user?.ExamResult?.length && user?.user?.ExamResult?.map(e => e.score)} </p>
                </div>
                <div className="card-footer w-full bg-slate-400">
                    <p className="text-orange-700">إجمالي درجات الإختبارات : {user?.user?.ExamResult?.length && user?.user?.ExamResult?.map(e => +e?.score)?.reduce((e, el) => e + el)} درجة</p>
                </div>
            </div>
            {/*Total Data Box */}
            <div className="card-footer rounded border-2 border-emerald-50 shadow p-2 w-full text-2xl bg-[#5b3f11] flex justify-center items-center">
                <p className="bg-[#5b3f11]">إجمالي كل الدرجات : {(user?.user?.ExamResult?.length && user?.user?.ExamResult?.map(e => +e?.score)?.reduce((e, el) => e + el)) + (user?.user?.AssinmentResult?.length && +user?.user?.AssinmentResult?.map(e => +e?.score)?.reduce((e, el) => e + el))} درجة</p>
            </div>
        </>
    )
}
