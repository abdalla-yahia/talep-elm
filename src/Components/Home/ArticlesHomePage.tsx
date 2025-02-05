import { deletePost, fetchPosts } from "@/lib/Actions/PostsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Image from "next/image"
import { useEffect } from "react"
import * as img from '../../../public/avatar';
import * as icon from '@/Components/Icons/icons'
import Swal from "sweetalert2";
import { CountTime } from "@/Utils/Date";
import { LogedUserInterface, PostsInterface } from "@/Interfaces/InterFaces";
export default function ArticlesHomePage() {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LogedUserInterface}
    const {AllPosts} = useAppSelector(state=>state.post) as unknown as {AllPosts:{Posts:PostsInterface[]}}
    const {DeletePost} = useAppSelector(state=>state.post) as unknown as {DeletePost:{status:number}}
    const {CreatePost} = useAppSelector(state=>state.post) as unknown as {CreatePost:{status:number}}
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(fetchPosts())
    },[dispatch,DeletePost,CreatePost])
    //Delete Post Handeller
    const DeletePostHandeller = (id: string) =>{
        Swal.fire({
            title: 'هل ستقوم بحذف هذا المنشور؟',
            text: '!!سيؤدي هذا إلى حذف جميع بيانات المنشور',
            icon: "warning",
            showCancelButton: true,
            cancelButtonText:'إلغاء',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: 'نعم ! قم بحذف المنشور',
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePost(id as unknown as string));
                if(DeletePost?.status === 200){
                Swal.fire({
                  title: "تم الحذف!",
                  text: "تم الحذف بنجاح.",
                  icon: "success"
                });
              }
            }
          });
    }
  return (

    <>
        {
            AllPosts?.Posts?.length > 0 ? AllPosts.Posts.map((post, index) => {
                return (
                    
            <div key={index} className="card my-1 w-full">
                <div className="card-body">
                    <div key={index} className="w-full  flex justify-center items-center flex-col">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-1 justify-start items-center">
                                <Image src={post?.author?.image || img.mal_manager} className="rounded-[50%]" alt="author-image" width={30} height={30} />
                                <div className="flex flex-col items-start justify-start">
                                <p className="text-sm font-bold text-gray-800"> {post?.author?.name}</p>
                                <span className="text-[14px] flex justify-center items-center gap-1 font-bold text-gray-400">مُنذُ {CountTime(post?.createdAt as unknown as number)}
                                    <icon.GiEarthAfricaEurope />
                                </span>
                                </div>
                            </div>
                           {UserLogedData?.role === 'OWNER' && <div className="flex gap-1 justify-start items-center">
                                <icon.CiTrash onClick={()=>DeletePostHandeller(post?.id as unknown as string)} title="حذف المنشور" className="text-red-500 cursor-pointer mx-2"/>
                                {/* <icon.FaRegEdit className="text-green-500 cursor-pointer mx-2"/> */}
                            </div>}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{post?.title}</h2>
                        <p>{post?.content}</p>
                        <div className="w-full flex justify-center items-center">
                        {/* <iframe width={'100%'} height={'100%'} className="w-full h-80 " src={post?.body?.src } title="فيديو المنشور" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
                        <iframe width={'100%'} height={'100%'} className="w-full h-80 " src={post?.body?.src } title={post?.title as unknown as string} frameBorder="0" allow=" autoplay;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
                    
                )
                    })
                        : <h1 className="w-full mt-5 flex justify-center items-center font-bold texr-2xl">لا توجد منشورات حتى الأن تابع الموقع بإستمرار للإطلاع على كل جديد</h1>
                    }
                    </>

  )
}
