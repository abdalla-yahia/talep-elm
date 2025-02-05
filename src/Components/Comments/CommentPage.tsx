import LessonHook from "../Lessons/LessonHook";
import Image from "next/image";
import img from '../../../public/avatar/PersonAvatar.jpg';
import { FaEdit } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import Likes from "./Likes";
import { TbTrash } from "react-icons/tb";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import Role from "@/Utils/Role";
import { CountTime } from "@/Utils/Date";
import * as icon from '@/Components/Icons/icons';
import { CreateComment, Replies } from "@/Interfaces/InterFaces";

export default function CommentPage({e,id}:{e:CreateComment,id:number}) {
    const {toggle,setToggle,NewComment,setNewComment,commentId,setCommentId,
        DeleteCommentHandeller,EditCommentHandeller,reCommentToggle,setReCommentToggle,
        CreateReCommentHandeller,setReCommentValue,ReCommentValue,DeleteReCommentHandeller,UserLogedData,EditReCommentHandeller,
        NewReComment,setNewReComment,RecommentId,setReCommentId,EditReCommentToggle,setEditReCommentToggle
     } = LessonHook({id});

  return (
    <div className="w-full  p-2 m-2 rounded bg-slate-300 relative flex flex-col ">
      <div className="flex justify-between items-start w-full mb-2">
        <div className="text-slate-500 text-sm flex justify-start gap-2 items-start">
          <Image
            width={30}
            height={30}
            src={
              e?.User?.image ||
              e?.Admin?.image ||
              e?.Teacher?.image ||
              e?.AdminTeacher?.image ||
              e?.Manager?.image ||
              e?.Owner?.image ||
              img
            }
            alt="user"
            className="rounded-full"
          />
          <div className="flex flex-col justify-center items-start gap-0">
            {(e.User !== null && (
              <span
                className={
                  parseInt(UserLogedData?.id) ===
                    parseInt(e?.User?.id as unknown as string) &&
                  UserLogedData?.role === "USER"
                    ? `font-bold text-blue-700`
                    : ""
                }
              >
                {`${
                  e.User?.gender === "MALE" ? "ْالطَالِب :" : "ُالطَالِبة :"
                }` + e.User?.name}
              </span>
            )) ||
              (e.Admin !== null && (
                <span
                  className={
                    parseInt(UserLogedData?.id) ===
                      parseInt(e?.Admin?.id as unknown as string) &&
                    UserLogedData?.role === "ADMIN"
                      ? `font-bold text-red-700`
                      : ""
                  }
                >
                  {`${
                    e.Admin?.gender === "MALE" ? "المُشرِف :" : "المُشرِفة :"
                  }` + e.Admin?.name}
                </span>
              )) ||
              (e.Teacher !== null && (
                <span
                  className={
                    parseInt(UserLogedData?.id) ===
                      parseInt(e?.Teacher?.id as unknown as string) &&
                    UserLogedData?.role === "TEACHER"
                      ? `font-bold text-fuchsia-700`
                      : ""
                  }
                >
                  {`${
                    e.Teacher?.gender === "MALE"
                      ? "المُدَرِس :"
                      : "المُدَرِسة :"
                  }` + e.Teacher?.name}
                </span>
              )) ||
              (e.AdminTeacher !== null && (
                <span
                  className={
                    parseInt(UserLogedData?.id) ===
                      parseInt(e?.AdminTeacher?.id as unknown as string) &&
                    UserLogedData?.role === "ADMIN_TEACHER"
                      ? `font-bold text-purple-700`
                      : ""
                  }
                >
                  {`${
                    e.AdminTeacher?.gender === "MALE"
                      ? "القائدْ :"
                      : "القائِدَة :"
                  }` + e.AdminTeacher?.name}
                </span>
              )) ||
              (e.Manager !== null && (
                <span
                  className={
                    parseInt(UserLogedData?.id) ===
                      parseInt(e?.Manager?.id as unknown as string) &&
                    UserLogedData?.role === "MANAGER"
                      ? `font-bold text-green-700`
                      : ""
                  }
                >
                  {`${
                    e.Manager?.gender === "MALE" ? "المُديرْ :" : "المُديرَة :"
                  }` + e.Manager?.name}
                </span>
              )) ||
              (e.Owner !== null && (
                <span
                  className={
                    parseInt(UserLogedData?.id) ===
                      parseInt(e?.Owner?.id as unknown as string) &&
                    UserLogedData?.role === "OWNER"
                      ? `font-bold text-orange-700`
                      : ""
                  }
                >
                  {`${
                    e.Owner?.gender === "MALE" ? "الدُكتُور :" : "الدُكتُوره :"
                  }` + e.Owner?.name}
                </span>
              ))}
            <span className="text-[10px] flex justify-center items-center gap-1 font-bold text-gray-400">
              مُنذُ {CountTime(e?.createdAt as unknown as number)}
              <icon.GiEarthAfricaEurope />
            </span>
          </div>
        </div>
        {((parseInt(UserLogedData?.id) ===
          parseInt(e?.User?.id as unknown as string) &&
          UserLogedData?.role === "USER") ||
          (parseInt(UserLogedData?.id) ===
            parseInt(e?.Admin?.id as unknown as string) &&
            UserLogedData?.role === "ADMIN") ||
          (parseInt(UserLogedData?.id) ===
            parseInt(e?.Teacher?.id as unknown as string) &&
            UserLogedData?.role === "TEACHER") ||
          Role(UserLogedData?.role as unknown as string) > 2) && (
          <div className="flex relative text-gray-500 gap-3 text-sm">
            <FaEdit
              onClick={() => {
                setToggle(!toggle);
                setCommentId(e.id as unknown as string);
                setNewComment(e.text);
              }}
              className="cursor-pointer z-50 hover:text-gray-800 text-green-500"
            />
            <BiTrash
              onClick={() => DeleteCommentHandeller(e.id as unknown as number)}
              className="cursor-pointer hover:text-gray-800 text-red-700"
            />
          </div>
        )}
      </div>
      <p className="text-gray-600   bg-slate-100 p-3 my-2 rounded text-base">
        {e.text}
        {parseInt(commentId) === e.id && toggle && (
          <div
            className={` absolute w-full left-0 px-0 py-4  z-30 top-0 bg-slate-300 flex flex-col`}
          >
            <input
              value={NewComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              className="text-base shadow rounded p-3 bg-slate-300"
            />
            <button
              onClick={() =>
                EditCommentHandeller(e as unknown as { id: string })
              }
              className="bg-slate-400 shadow text-sm w-full cursor-pointer font-bold  px-4 py-2 self-end text-white rounded"
            >
              تحديث التعليق
            </button>
          </div>
        )}
      </p>

      {parseInt(commentId) === e.id && reCommentToggle && (
        <>
          {e?.replies?.length &&
            e.replies.map((el, i) => (
              <div
                key={i}
                className=" w-4/5 self-end p-1 mb-1 relative rounded bg-green-50 flex flex-col justify-start items-start"
              >
                <div className="text-gray-400 text-sm w-full flex justify-between gap-2 items-start">
                  <div className="flex gap-2 justify-start">
                    <Image
                      width={20}
                      height={20}
                      src={(!el.User?.image as unknown as string) && img}
                      alt="user"
                      className="rounded-full"
                    />

                    {(el.User !== null && (
                      <span
                        className={
                          parseInt(UserLogedData?.id) === parseInt(el?.User?.id)
                            ? `font-bold text-blue-700`
                            : ""
                        }
                      >
                        {"الطالب : " + el.User?.name}
                      </span>
                    )) ||
                      (el.Admin !== null && "المشرف : " + el.Admin?.name) ||
                      (el.Teacher !== null && "المدرس : " + el.Teacher?.name) ||
                      (el.AdminTeacher !== null &&
                        "المشرف العام : " + el.AdminTeacher?.name) ||
                      (el.Manager !== null && "المدير : " + el.Manager?.name) ||
                      (el.Owner !== null && "الدكتور : " + el.Owner?.name)}
                  </div>
                  {(UserLogedData?.id == el?.User?.id ||
                    Role(UserLogedData?.role as unknown as string) > 1) && (
                    <div className="flex w-1/6 justify-between items-center">
                      <BiEditAlt
                        onClick={() => {
                          setEditReCommentToggle(!EditReCommentToggle);
                          setReCommentId(el.id as unknown as string);
                          setNewReComment(el.text);
                        }}
                        title="تعديل"
                        className="cursor-pointer z-50 text-green-700 hover:text-gray-700"
                      />
                      <TbTrash
                        onClick={() => DeleteReCommentHandeller(el.id)}
                        title="حذف"
                        className="cursor-pointer text-red-600  hover:text-gray-700"
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm py-2 px-1 bg-green-50 rounded-lg w-full">
                  {el.text}
                </p>
                <div className="w-full text-sm justify-start items-center">
                  <Likes
                    e={el as unknown as Replies}
                    id={id}
                    comId={null}
                    reId={el.id}
                  />
                </div>

                {parseInt(RecommentId) === el.id && EditReCommentToggle && (
                  <div className="flex justify-between text-sm w-full pt-3 z-30 bg-green-50 absolute top-0 left-0 items-end  flex-col">
                    <input
                      value={NewReComment}
                      onChange={(e) => setNewReComment(e.target.value)}
                      type="text"
                      name=""
                      id=""
                      className="p-2 w-full rounded mb-2"
                      placeholder="تعديل الرد على التعليق"
                    />
                    <button
                      onClick={() => EditReCommentHandeller(el.id)}
                      className="bg-green-500 text-white rounded px-2 py-1"
                    >
                      تعديل
                    </button>
                  </div>
                )}
              </div>
            ))}
          <div className="flex justify-between text-sm items-start w-full flex-col mb-2">
            <input
              value={ReCommentValue}
              onChange={(e) => setReCommentValue(e.target.value)}
              type="text"
              placeholder="أضف رد على التعليق"
              className="w-full bg-gray-100 rounded p-2"
            />
            <button
              onClick={() =>
                CreateReCommentHandeller(e.id as unknown as number)
              }
              className="rounded text-sm w-3/6 md:w-2/6 lg:w-1/6 self-end p-0 md:p-1 lg:p-2 bg-green-200 cursor-pointer shadow my-1 text-black font-bold"
            >
              {" "}
              إرسال رد{" "}
            </button>
          </div>
        </>
      )}

      {/* Comment Footer */}
      <div className="w-full cursor-pointer flex gap-4 justify-between text-sm ">
        <Likes
          e={e as unknown as Replies}
          id={id}
          comId={e.id as unknown as number}
          reId={null}
        />
        <div
          onClick={() => {
            setReCommentToggle(!reCommentToggle);
            setCommentId(e.id as unknown as string);
          }}
          className={`bg-transparent lg:bg-gray-200 flex  rounded gap-2 py-1 px-3`}
        >
          <BsReply className="hidden md:block lg:block" />
          <span className="text-center">
            {" "}
            {e?.replies?.length && e?.replies?.length > 0
              ? `عرض ${e?.replies?.length} من الردود`
              : "لا يوجد ردود "}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
