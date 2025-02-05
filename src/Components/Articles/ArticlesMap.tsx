import Role from "@/Utils/Role";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import * as icon from "@/Components/Icons/icons";
import ArticleHook from "./ArticleHook";
import { Articles } from "@prisma/client";

export default function ArticlesMap({ Articles }: { Articles: Articles[] }) {
  const {
    UserLogedData,
    toggle,
    setToggle,
    setEditName,
    setEditDescription,
    setArticleAccess,
    ArticleId,
    setArticleId,
    EditArticleHandeller,
    DeleteArticleHandeller,
  } = ArticleHook();
  return (
    <>
      <Accordion defaultActiveKey="0" className="w-full h-[680px] md:h-[540px] lg:h-[540px] overflow-y-scroll scrollbar-hide">
        {Articles?.map((Article, index: number) => (
          <>
            <Accordion.Item
              eventKey={index as unknown as string}
              className="relative"
            >
              <Accordion.Header className="flex justify-start items-center ">
                <span className="line-clamp-1 text-end">{`(${index +1}) -- `} {Article?.title} </span>
              </Accordion.Header>
              <Accordion.Body>
                <Link
                  href={`./articles/details/${Article?.id}`}
                  key={index}
                  className="bg-blue-100 w-full cursor-pointer min-h-36 text-center p-1 rounded flex flex-col   "
                >
                  <h1 className="text-3xl mb-2 text-sh"> {Article?.title}</h1>
                  <div className="text-sm text-gray-500">
                    {Article?.access === "public" ? "عام" : "خاص"}
                    <h2 className="text-red-500 text-xl font-bold">إضغط لقراءة المقال .....</h2>
                  </div>
                </Link>

                {/* Edite Article Box */}
                {toggle &&
                  parseInt(ArticleId as unknown as string) === Article?.id && (
                    <div className="w-full flex z-50  top-0 left-0 flex-col gap-3  justify-start items-start absolute bg-green-200 p-3 rounded ">
                      <div className="flex items-center gap-2">
                        <h1>عنوان المقال</h1>
                        <input
                          defaultValue={Article?.title}
                          onChange={(e) => setEditName(e?.target?.value)}
                          type="text"
                          className="rounded px-2"
                          placeholder="ادخل الاسم الجديد"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <h1>وصف المقال</h1>
                        <input
                          defaultValue={Article?.content}
                          onChange={(e) => setEditDescription(e.target.value)}
                          type="text"
                          className="rounded px-2"
                          placeholder="ادخل المحتوى الجديد"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <h1>نوع المقال</h1>
                        <select
                          onChange={(e) => setArticleAccess(e.target.value)}
                          className="rounded px-2"
                        >
                          <option selected disabled value="">
                            اختر نوع المقال
                          </option>
                          <option value="public">عام</option>
                          <option value="privite">خاص</option>
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          EditArticleHandeller(
                            Article?.id as unknown as string
                          );
                        }}
                        className="w-full rounded p-2 bg-green-500 text-xl cursor-pointer text-white shadow-sm "
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  )}

                {/* Setting Buttons*/}
                {Role(UserLogedData?.role as unknown as string) > 1 && (
                  <div className="bg-red-100 w-full gap-1 rounded py-1 flex justify-between px-2">
                    <div className=" w-full gap-2 flex  px-3 items-start">
                      <span className="text-sm text-gray-400">
                        تعديل المقال
                      </span>
                      <icon.FaRegEdit
                        title="تعديل المقال"
                        className="self-end text-green-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() => {
                          setArticleId(Article?.id as unknown as string);
                          setToggle(!toggle);
                        }}
                      />
                    </div>
                    <div className=" w-full gap-2 cursor-pointer flex justify-end px-3 items-start">
                      <label
                        htmlFor="delete-Article"
                        className="text-sm flex gap-1  text-gray-400"
                      >
                        حذف المقال
                      </label>
                      <icon.CiTrash
                        id="delete-Article"
                        title="حذف المقال"
                        className="self-end text-red-600 hover:text-3xl transition-all cursor-pointer"
                        onClick={() =>
                          DeleteArticleHandeller(
                            Article?.id as unknown as string
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </>
        ))}
      </Accordion>
    </>
  );
}
