import { fetchAdmin_TeacherById, LogOutAdmin_Teacher } from "@/lib/Actions/Admins_TeachersActions";
import { fetchUserById, LogOutUser, SetUserLogedData } from "@/lib/Actions/UserActions";
import { fetchManagerById, LogOutManager } from "@/lib/Actions/ManagersActions";
import { fetchTeacherById, LogOutTeacher } from "@/lib/Actions/TeachersActions";
import { fetchAdminById, LogOutAdmin } from "@/lib/Actions/AdminsActions";
import { fetchOwnerById, LogOutOwner } from "@/lib/Actions/OwnersActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TokenInterFace } from "@/Interfaces/InterFaces";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as img from '../../../public/avatar';
import style from './Header.module.css'
import Image from "next/image";
import Link from "next/link";


export default function LoginForm({userFromToken,setToggle,toggle}:{userFromToken:TokenInterFace,setToggle:React.Dispatch<React.SetStateAction<boolean>>,toggle:boolean}) {

  const {user} = useAppSelector((state ) => state.user) as unknown as {user:{user:TokenInterFace}}
  const {Admin} = useAppSelector((state ) => state.admin)as unknown as {Admin:{Admin:TokenInterFace}}
  const {Teacher} = useAppSelector((state ) => state.teacher)as unknown as {Teacher:{Teacher:TokenInterFace}}
  const {Admin_Teacher} = useAppSelector((state ) => state.admin_teacher)as unknown as {Admin_Teacher:{Admin_Teacher:TokenInterFace}}
  const {Manager} = useAppSelector((state ) => state.manager)as unknown as {Manager:{Manager:TokenInterFace}}
  const {Owner} = useAppSelector((state ) => state.owner)as unknown as {Owner:{Owner:TokenInterFace}}
  const {logoutUser} = useAppSelector((state ) => state.user) 
  const {loginUser} = useAppSelector((state ) => state.user) as unknown as {loginUser:string}
  const {CreateNewUser} = useAppSelector(state=>state.user)
  const {CreateAdmin} = useAppSelector(state=>state.admin)
  const {CreateTeacher} = useAppSelector(state=>state.teacher)
  const {CreateAdmin_Teacher} = useAppSelector(state=>state.admin_teacher)
  const {CreateManager} = useAppSelector(state=>state.manager)
  const {CreateOwner} = useAppSelector(state=>state.owner)

    const [User,setUser]=useState({name:''})
    const router = useRouter();
  const dispatch = useAppDispatch()
  const role = userFromToken?.path
  //Delete Cookie from server if it exists and is valid for the current user
    const LogoutHandeller = async ()=>{
              if (userFromToken?.role === "USER") {
      await dispatch(LogOutUser());
              } else if (userFromToken?.role === "MANAGER") {
      await dispatch(LogOutManager());
              } else if (userFromToken?.role === "ADMIN_TEACHER") {
      await dispatch(LogOutAdmin_Teacher());
              } else if (userFromToken?.role === "TEACHER") {
      await dispatch(LogOutTeacher());
              } else if (userFromToken?.role === "ADMIN") {
      await dispatch(LogOutAdmin());
              } else if (userFromToken?.role === "OWNER") {
      await dispatch(LogOutOwner());
              }
      setUser({name:''})
        toast.success('تم تسجيل الخروج بنجاح')
      router.replace('/')
     window.location.reload();
  }
      useEffect(()=>{
        if (loginUser?.length > 0) {
          dispatch(SetUserLogedData(loginUser));
          setUser(loginUser as unknown as { name: string });
        } else if (userFromToken) {
          dispatch(SetUserLogedData(userFromToken as unknown as string));
          setUser(userFromToken as unknown as { name: string });
        }
      },[loginUser,logoutUser,userFromToken,dispatch,CreateNewUser,CreateAdmin,CreateTeacher,CreateAdmin_Teacher,CreateManager,CreateOwner])
      //Get Loged User Data
      useEffect(() => {
        if(userFromToken?.role === 'USER'){
          dispatch(fetchUserById(userFromToken?.id  as unknown as string))
        }else if(userFromToken?.role === 'MANAGER'){
          dispatch(fetchManagerById(userFromToken?.id  as unknown as string))
        }else if(userFromToken?.role === 'ADMIN_TEACHER'){
          dispatch(fetchAdmin_TeacherById(userFromToken?.id  as unknown as string))
        }else if(userFromToken?.role === 'TEACHER'){
          dispatch(fetchTeacherById(userFromToken?.id  as unknown as string))
        }else if(userFromToken?.role === 'ADMIN'){
          dispatch(fetchAdminById(userFromToken?.id  as unknown as string))
        }else if(userFromToken?.role === 'OWNER'){
          dispatch(fetchOwnerById(userFromToken?.id  as unknown as string))
        }
      },[userFromToken,dispatch])
  return (
                <div className={`${style.userLink} z-50 flex justify-center items-center`}>
                {User?.name !== undefined && User?.name !== '' && User?.name !== null && User?.name !== 'AxiosError' ?
                (
                    <>
                    <div className={`text-black flex justify-center items-center px-5 lg:flex-row flex-col`}>
              <Link href={role !== undefined ? `/${role}/dashboard/articles` :'/'} className="cursor-pointer flex flex-col justify-center items-center text-center">
              <Image 
              onClick={()=>setToggle(!toggle as unknown as boolean)} 
              src={user?.user?.image ||Admin?.Admin?.image||Teacher?.Teacher?.image||Admin_Teacher?.Admin_Teacher?.image||Manager?.Manager?.image||Owner?.Owner?.image || img.male_admin}
              width={50}
              height={50}
              alt="User Image"
              className="rounded-full hover:text-gray-300"/>
                        <p className="rounded-full hover:text-white text-black">{(User?.name)}</p>
              </Link>
                <button onClick={()=>{LogoutHandeller();setToggle(!toggle)}} className="hover:bg-blue-900 bg-blue-800 hover:text-white mx-2 p-2 rounded">
                  خروج
                </button>
              </div>
              </>
              ):
              (<button onClick={()=>setToggle(!toggle)} className="p-2 rounded ">
                <Link className="p-2 rounded hover:bg-[#01958b] bg-[#01403c]"  href="/login"> تسجيل الدخول</Link>
                </button>)}
              </div>
  )
}
