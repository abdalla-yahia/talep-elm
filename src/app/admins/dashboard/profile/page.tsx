'use client'
import { deleteAdmin, fetchAdminById, updateAdmin } from "@/lib/Actions/AdminsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import DateConvert from "@/Utils/Date"
import FullTitle from "@/Utils/FullTitle"
import Image from "next/image"
import * as img from '../../../../../public/avatar';
import * as icon from '@/Components/Icons/icons'
import { LogedUserInterface } from "@/Interfaces/InterFaces"
import { Admins } from "@prisma/client"
import Swal from "sweetalert2"

export default function ProfilePage() {
    const { UserLogedData } = useAppSelector(state => state.user) as unknown as { UserLogedData: LogedUserInterface }
    const { DeleteAdmin } = useAppSelector(state => state.admin) as unknown as { DeleteAdmin: { status: number } }
    const { UpdateAdmin } = useAppSelector(state => state.admin) as unknown as { UpdateAdmin: { status: number } }
    const { Admin } = useAppSelector(state => state.admin) as unknown as { Admin: { Admin: Admins } }
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
    useEffect(() => {
        dispatch(fetchAdminById(UserLogedData?.id))
    }, [UserLogedData, dispatch, UpdateAdmin])
    //Get Upload Image From Admin
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
    //Update Admin Data  Handeller
    const UpdateAdminHAndeller = () => {
        if (name !== '' && email !== '' && phone !== '' && password.length >= 8) {
            if (password === confirmPassword) {
                dispatch(updateAdmin({
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
    //Set Admin Data To State On First Time Open Page and open toggle
    const ShowBoxEditHandeller = () => {
        setToggle(!toggle)
        setName(Admin?.Admin?.name)
        setEmail(Admin?.Admin?.email)
        setPhone(Admin?.Admin?.telephone)
        setAddress(Admin?.Admin?.address as unknown as string)
        setAge(Admin?.Admin?.age as unknown as string)
        setEducation(Admin?.Admin?.education as unknown as string)
        setImage(Admin?.Admin?.image as unknown as string)
    }
    //Delete Admin Data Handeller
    const DeleteAdminHandeller = () => {
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
                dispatch(deleteAdmin(Admin?.Admin?.id as unknown as string));
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
        if (DeleteAdmin?.status) {
            if (DeleteAdmin?.status === 200) {
                toast.success('تم حذف المستخدم بنجاح ')
                setToggle(false)
            } else {
                toast.error('حدث خطأ ')
            }
        }
    }, [DeleteAdmin])
    //Update Notifications
    useEffect(() => {
        if (UpdateAdmin?.status) {
            if (UpdateAdmin?.status === 201) {
                toast.success('تم تحديث البيانات بنجاح ')
                setToggle(false)
            } else {
                toast.error('حدث خطأ ')
            }
        }
    }, [UpdateAdmin])

    return (
        <div className=" flex flex-col justify-center items-center w-full">
            <FullTitle F_Title={`الصفحة الشخصية ل ${Admin?.Admin?.name}`} />
            {/*Personal Data Card */}
            <div className="card w-full relative flex justify-center items-start pt-3">
                <div className="card-head mb-3 self-center w-full flex justify-center items-center">
                    <h2 className="card-head-title">البيانات الشخصية</h2>
                </div>
                <div className="flex md:flex-row lg:flex-row flex-col-reverse items-center gap-3 justify-between w-full pl-3">
                    <div className="card-body">
                        <h5 className="card-title">الاسم: {Admin?.Admin?.name}</h5>
                        <p className="card-text">البريد الالكتروني: {Admin?.Admin?.email} </p>
                        <p className="card-text">رقم الهاتف: {Admin?.Admin?.telephone} </p>
                        <p className="card-text">الجنس: {Admin?.Admin?.gender === 'MALE' ? 'ذكر' : 'انثي'} </p>
                        <p className="card-text">العنوان: {Admin?.Admin?.address} </p>
                        <p className="card-text">العمر: {Admin?.Admin?.age} </p>
                        <p className="card-text">التعليم: {Admin?.Admin?.education} </p>
                    </div>
                    <div className="card-image">
                        <Image loading="lazy" width={150} height={150} src={Admin?.Admin?.image && `${Admin?.Admin?.image}` || img.male_admin} alt="profile" className="rounded-[20%]" />
                    </div>
                </div>
                <div className="card-foot text-sm bg-gray-500 w-full flex justify-center items-center">
                    <p className="card-text text-primary_color">تم الاضافة في {DateConvert(Admin?.Admin?.createdAt)} </p>
                </div>
                {/* Edit Personal Data */}
                {toggle && <div className="edit z-40 bg-green-200 absolute w-full top-0 left-0">
                    <div className="flex justify-between w-full pl-3">
                        <div className="card-body">
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block">الاسم: </h5>
                                <input defaultValue={Admin?.Admin?.name} onChange={(e) => setName(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="اسم المستخدم" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block">البريد الإلكتروني: </h5>
                                <input defaultValue={Admin?.Admin?.email} onChange={(e) => setEmail(e?.target?.value)} type="email" name="" id="" className="w-full rounded px-2" placeholder="البريد الإلكتروني" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> الهاتف: </h5>
                                <input defaultValue={Admin?.Admin?.telephone} onChange={(e) => setPhone(e?.target?.value)} type="tel" dir="rtl" name="" id="" className="w-full rounded px-2" placeholder="الهاتف" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> العنوان: </h5>
                                <input defaultValue={Admin?.Admin?.address as unknown as string} onChange={(e) => setAddress(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="العنوان" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> العمر: </h5>
                                <input defaultValue={Admin?.Admin?.age as unknown as string} onChange={(e) => setAge(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="العمر" />
                            </div>
                            <div className="flex justify-between my-2 w-full gap-2 pl-3">
                                <h5 className="card-title hidden md:block lg:block"> التعليم: </h5>
                                <input defaultValue={Admin?.Admin?.education as unknown as string} onChange={(e) => setEducation(e?.target?.value)} type="text" name="" id="" className="w-full rounded px-2" placeholder="التعليم" />
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
                                <Image loading="lazy" width={150} height={150} src={image || img.male_admin} alt="profile" />
                                <input onChange={(e) => uploadFilesHandeller(e)} type="file" name="" id="uploadPersonalImage" className="hidden" />
                                <icon.RiImageAddLine className="w-full" />
                            </label>
                        </div>
                    </div>
                    <button onClick={() => UpdateAdminHAndeller()} className="w-full p-2 bg-orange-500 text-text_color">حفظ البيانات</button>
                </div>}
                {/* Button On Click It Show Card Edit Or Delete Admin Account*/}
                <icon.FaRegEdit title="تعديل البيانات" onClick={() => { ShowBoxEditHandeller() }} className=" absolute top-1 right-2 text-xl text-green-500 p-0 cursor-pointer" />
                <icon.CiTrash title="حذف حسابك نهائياً" onClick={() => { DeleteAdminHandeller() }} className=" absolute top-1 left-2 text-xl text-accent_color p-0 cursor-pointer" />
            </div>
        </div>
    )
}
