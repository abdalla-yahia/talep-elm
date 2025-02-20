import Role from "@/Utils/Role";
import * as icon from '../Icons/icons'
import { cookies } from "next/headers";
import { UserPayload } from "@/Interfaces/InterFaces";
import { redirect } from "next/navigation";
import SideBarPiece from "./SideBarPiece";
import Jwt from "jsonwebtoken";

export default async function Sidebar() {
    const cookie = (await cookies()).get('JwtToken');
    if (!cookie?.value) {
        redirect('/')
    }

    const Decoade = Jwt.verify(cookie?.value, process.env.JWT_SECRET_KEY as string) as UserPayload;
    const Customer = Decoade.path
    const role = Role(Decoade.role as unknown as string)
    return (

        <section className="w-1/6 sm:w-1/6 h-screen overflow-y-scroll scrollbar-hide bg-second_background_color rounded flex justify-center p-2">
            <div className="w-full flex justify-start items-center flex-col ">
                <ul className="text-fuchsia-600 font-bold w-full flex justify-center items-center flex-col">
                    <SideBarPiece role={role} number={3} Customer={Customer as unknown as string} subdom={'students'} title={'الطلاب'} >
                        <icon.PiStudentDuotone title={'الطلاب'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={3} Customer={Customer as unknown as string} subdom={'assinments-results'} title={'نتائج المهام '} >
                        <icon.FcGraduationCap title={'نتائج المهام '} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={3} Customer={Customer as unknown as string} subdom={'exams-results'} title={'نتائج الإختبارت '} >
                        <icon.FaUserGraduate title={'نتائج الإختبارت '} className="text-gray-700" />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={3} Customer={Customer as unknown as string} subdom={'admins'} title={'المشرفين'} >
                        <icon.GrUserAdmin title={'المشرفين'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={3} Customer={Customer as unknown as string} subdom={'teachers'} title={'المدرسين'} >
                        <icon.GiTeacher title={'المدرسين'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={4} Customer={Customer as unknown as string} subdom={'admins-teachers'} title={'القادة'} >
                        <icon.SiLeaderprice title={'القادة'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={5} Customer={Customer as unknown as string} subdom={'managers'} title={'المديرين'} >
                        <icon.FcManager title={'المديرين'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={1} Customer={Customer as unknown as string} subdom={'groups'} title={'المجموعات'} >
                        <icon.FaPeopleGroup title={'المجموعات'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={0} Customer={Customer as unknown as string} subdom={'sections'} title={'الأقسام'} >
                        <icon.FaFolderTree title={'الأقسام'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={3} Customer={Customer as unknown as string} subdom={'add-subject'} title={'إضافة مادة جديدة'} >
                        <icon.RiApps2AddFill title={'إضافة مادة جديدة'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={2} Customer={Customer as unknown as string} subdom={'add-lesson'} title={'إضافة درس جديد'} >
                        <icon.RiStickyNoteAddFill title={'إضافة درس جديد'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={4} Customer={Customer as unknown as string} subdom={'add-section'} title={'إضافة قسم جديد'} >
                        <icon.FcTreeStructure title={'إضافة قسم جديد'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={3} Customer={Customer as unknown as string} subdom={'add-group'} title={'إضافة مجموعة جديدة'} >
                        <icon.MdOutlineGroupAdd title={'إضافة مجموعة جديدة'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={2} Customer={Customer as unknown as string} subdom={'add-assinment'} title={'إضافة تكليف جديد'} >
                        <icon.MdAddTask title={'إضافة تكليف جديد'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={2} Customer={Customer as unknown as string} subdom={'add-exam'} title={'إضافة إختبار جديد'} >
                        <icon.GrDocumentTest title={' إضافة إختبار جديد'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={4} Customer={Customer as unknown as string} subdom={'add-article'} title={'إضافة مقال جديد'} >
                        <icon.PiArticleNyTimesBold title={' إضافة مقال جديد'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={0} Customer={Customer as unknown as string} subdom={'articles'} title={'المقالات'} >
                        <icon.GiNewspaper title={'المقالات'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={5} Customer={Customer as unknown as string} subdom={'news'} title={'شريط الأخبار'} >
                        <icon.PiSubtitlesFill title={'شريط الأخبار'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={0} Customer={Customer as unknown as string} subdom={'subjects'} title={'المواد الدراسية'} >
                        <icon.FaBookQuran title={'المواد الدراسية'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={0} Customer={Customer as unknown as string} subdom={'lessons'} title={'الدروس'} >
                        <icon.MdPlayLesson title={'الدروس'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={0} Customer={Customer as unknown as string} subdom={'assinments'} title={'التكليفات'} >
                        <icon.FaTasks title={'التكليفات'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={0} Customer={Customer as unknown as string} subdom={'exams'} title={'الإختبارات'} >
                        <icon.PiExamThin title={'الإختبارات'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={0} Customer={Customer as unknown as string} subdom={'profile'} title={'الملف الشخصي'} >
                        <icon.ImProfile title={'الملف الشخصي'} />
                    </SideBarPiece>
                    <SideBarPiece role={role} number={5} Customer={Customer as unknown as string} subdom={'codes'} title={'إنشاء كود جديد'} >
                        <icon.IoQrCodeOutline title={'إنشاء كود جديد'} />
                    </SideBarPiece>
                </ul>
            </div>
        </section>

    )
}
