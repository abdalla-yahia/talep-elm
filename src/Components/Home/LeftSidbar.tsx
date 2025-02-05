import { CreateHadithInterface, LogedUserInterface } from "@/Interfaces/InterFaces"
import { createHadith, deleteHadith, fetchHadith } from "@/lib/Actions/HadithActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import React, { useEffect, useState } from "react"
import * as icon from '@/Components/Icons/icons'
import { toast } from "react-toastify"
import Swal from "sweetalert2"

export default function LeftSidbar() {
      const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface}
      const {CreateHadith} = useAppSelector(state=>state.hadith) as unknown as {CreateHadith:{status:number}}
      const {DeleteHadith} = useAppSelector(state=>state.hadith) as unknown as {DeleteHadith:{status:number}}
      const { AllHadith } = useAppSelector(
        (state) => state.hadith
      ) as unknown as { AllHadith: { Hadith: CreateHadithInterface[] } };
      const [toggle,setToggle]= useState(false)
      const [PostToggle,setPostToggle]= useState(false)
      const [showAlot, setShowAlot] = useState(false);
      const [title,setTitle]= useState('')
      const [content,setContent]= useState('')
      const [SearchText,SetSearchText] = useState('');
      const [Post, setPost] = useState<CreateHadithInterface>({
        id: '',
        title: '',
        content: '',
        author: { id: 0, name: '', image: '' }
      })

      const dispatch = useAppDispatch();
      const CreatePostHandeller = ()=>{
          dispatch(createHadith({
              title,
              content,
              author:{id:parseInt(UserLogedData?.id) as number,name:UserLogedData?.name as string,image:UserLogedData?.image as string}}))
  }
  useEffect(() => {
    dispatch(fetchHadith())
  },[CreateHadith,dispatch])
      useEffect(()=>{
          if(CreateHadith.status){
              if(CreateHadith?.status === 201){
                  toast.success('تم إنشاء البوست بنجاح')
                setToggle(false)
                setContent('')
              }else if(CreateHadith?.status === 400){
                  toast.error('حدث خطأ في إنشاء البوست')
              }
          }
      }, [CreateHadith,DeleteHadith,dispatch])
      // //Set Post To State 
      useEffect(()=>{
          setPost(AllHadith?.Hadith?.[AllHadith?.Hadith?.length - 1]);
      },[AllHadith])
  //Delete Hadith
  const DeleteHadithHandeller = (e: string) => {
     Swal.fire({
                title: 'هل ستقوم بحذف هذا الموضوع/الحديث؟',
                text: '!!سيؤدي هذا إلى حذف جميع بيانات الموضوع/الحديث',
                icon: "warning",
                showCancelButton: true,
                cancelButtonText:'إلغاء',
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: 'نعم ! قم بحذف الموضوع/الحديث',
              }).then((result) => {
                if (result.isConfirmed) {
                      dispatch(deleteHadith(e));
                    if (DeleteHadith?.status === 200) {
                      Swal.fire({
                        title: "تم الحذف!",
                        text: "تم الحذف بنجاح.",
                        icon: "success",
                      });
                    }
                }
              });
  }
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {!toggle &&
        (UserLogedData?.role as React.ReactNode) &&
        UserLogedData?.role === "OWNER" && (
          <>
            <button
              onClick={() => setToggle(!toggle)}
              className="hover:text-blue-600 my-1 bg-[#01403c] shadow-md text-white w-full px-3 rounded cursor-pointer"
            >
              إنشاء موضوع
            </button>
            <div className="w-full flex flex-col">
              {AllHadith?.Hadith?.length > 0 &&
                AllHadith?.Hadith?.slice(0, !showAlot?3:undefined).map((hadith, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col gap-2 justify-center items-center"
                    title={hadith?.content as unknown as string}
                  >
                    <p className="w-full flex  gap-2 justify-center items-center">
                      <span className="text-gray-600 line-clamp-1 w-full">
                        {" "}
                        {hadith?.content}
                      </span>
                      <icon.CiTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() =>
                          DeleteHadithHandeller(hadith?.id as unknown as string)
                        }
                      />
                    </p>
                  </div>
                ))}
              <span className="cursor-pointer" onClick={() => setShowAlot(!showAlot)}>
                {showAlot ? (
                  <span className="text-red-600">عرض أقل...</span>
                ) : (
                  <span className="text-red-600">عرض المزيد ...</span>
                )}
              </span>
            </div>
          </>
        )}
      {toggle && (
        <div className="container text-gray-700 w-full flex flex-col justify-center items-center">
          <div className="w-full flex gap-2 mb-2  justify-center items-center">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name=""
              id=""
              className="rounded px-2 w-full"
              placeholder="ادخل عنوان الموضوع"
            />
          </div>
          <div className="w-full flex gap-2 mb-2  justify-center items-center">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              name=""
              id=""
              className="rounded px-2 w-full"
              placeholder="ادخل محتوي الموضوع"
            />
          </div>

          <button
            onClick={() => CreatePostHandeller()}
            className="p-2 rounded text-white  hover:bg-[#01403c] cursor-pointer"
          >
            إنشاء الموضوع
          </button>
        </div>
      )}
     

        {/**########################################################## */}
        <div className='w-full relative bg-[#01403c] rounded'>
            <div onClick={()=>{setPostToggle(!PostToggle)}} className="w-full scrollbar-hide flex flex-col-reverse justify-between items-center my-1 rounded h-fit px-2 text-slate-100 shadow bg-[#01403c]">
            <input value={SearchText} onChange={(e)=>{SetSearchText(e.target.value);setPostToggle(true)}} type="search" name="" id="" className='m-2 px-2 z-40 outline-none rounded bg-[#01403c] text-white w-full self-center' placeholder=' بحث عن مقالة ....' />
            <div  className="flex relative justify-start items-start w-full" dir='rtl'>
                <span className='flex justify-between items-center w-full'>
                <span className="text-lg cursor-pointer font-bold text-slate-100">{Post?.title || 'اختر المقالة'}</span>
                <icon.MdKeyboardDoubleArrowDown />
                </span>
                {PostToggle && 
                <div className='bg-[#016d79] absolute rounded left-0 top-[140%] w-[80%] z-40 h-[400px] scrollbar-hide overflow-y-scroll text-white flex justify-start items-start flex-col'>
                {
                    AllHadith?.Hadith?.length > 0 
                    &&
                      SearchText === '' ?
                    (
                        <>
                        {
                          AllHadith?.Hadith?.map((post,index)=>{
                            return <span key={index} onClick={()=>{setPost(post as CreateHadithInterface);setPostToggle(false)}} className='hover:hover:bg-[#01403c] hover:text-white px-2 py-1 line-clamp-1 text-white  cursor-pointer rounded'  title={post?.title ?? ''}>{post?.title}</span>                    
                          })
                        }
                        </>
                )
                  :(AllHadith?.Hadith?.filter(el=>el?.title?.includes(SearchText))).map((post,index)=>
                    <span onClick={()=>{setPost(post as CreateHadithInterface);SetSearchText('')}} className='hover:hover:bg-[#01403c] hover:text-white px-2 py-1 cursor-pointer rounded' key={index} title={post?.title ?? ''}>{post?.title}</span>)
                }
                </div>
                } 
            </div>
            </div>
    </div>
    {/**Show Post */}
      {Post &&
            (<div>
              <h1 className="text-2xl w-full my-3 text-[#01403c] text-center flex justify-center items-center">
                {Post?.title}
              </h1>
              <p style={{lineHeight:'2'}} className={`text-justify max-h-[350px] overflow-y-scroll scrollbar-hide`}>
                {Post?.content}
              </p>
              <p className="text-gray-500 mt-5 text-sm">
                الناشر / {Post?.author?.name as unknown as string}
              </p><br/>
            </div>)
            }
    </div>
  );
}
