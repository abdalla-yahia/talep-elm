import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { FaRegAngry } from 'react-icons/fa'
import { FaFaceAngry, FaHeart } from 'react-icons/fa6'
import LikesHook from './LikesHook'
import { useAppSelector } from '@/lib/hooks'
import { LogedUserInterface, Replies } from '@/Interfaces/InterFaces'

export default function Likes({ e, id, comId, reId }: { e: Replies, id: number, comId: number | null, reId: number | null }) {
  const { CreateLikeCommentHandeller, DeleteLikeCommentHandeller, Lesson } = LikesHook({ id })

  const { UserLogedData } = useAppSelector((state) => state.user) as unknown as { UserLogedData: LogedUserInterface }

  return (
    <div className="w-[45%] flex gap-3 justify-start items-center p-1 text-center rounded">
      <p className="flex ">

        {

          e.likes.find((el) => (
            (el.userId !== null) && (el.userId === UserLogedData.id)
            // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
            // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
            // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
            // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
            // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id) 
          ) && el.like === true)
            ?

            <AiFillLike title='أعجبني' onClick={() => DeleteLikeCommentHandeller(e.likes[e.likes?.findIndex((el) =>

              (el.userId !== null) && (el.userId === UserLogedData.id)
              // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
              // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
              // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
              // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
              // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id) 
            )]?.id as unknown as string)} className="hover:text-blue-700 cursor-pointer text-blue-500" />

            :
            <AiOutlineLike title='أعجبني' onClick={() => CreateLikeCommentHandeller(e.likes, 'like', Lesson?.Subjects?.id, comId as unknown as number, Lesson?.id, reId)} className="hover:text-blue-700 hover:animate-ping cursor-pointer text-blue-500" />
        }

        <span className='select-none font-bold'>{e.likes && e.likes.filter((el) => el.like).length}</span>

      </p>
      <p className="flex">
        {
          e.likes.find((el) =>
            (el.userId !== null) && (el.userId === UserLogedData.id)
            // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
            // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
            // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
            // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
            // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id)
            && el.disLike === true) ?
            <AiFillDislike title='لم يعجبني' onClick={() => DeleteLikeCommentHandeller(e.likes[e.likes?.findIndex((el) =>
              (el.userId !== null) && (el.userId === UserLogedData.id)
              // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
              // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
              // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
              // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
              // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id) 
            )]?.id as unknown as string)} className="hover:text-blue-700 cursor-pointer text-blue-500" />
            :
            <AiOutlineDislike title='لم يعجبني' onClick={() => CreateLikeCommentHandeller(e.likes, 'disLike', Lesson?.Subjects?.id, comId as unknown as number, Lesson?.id, reId)} className={'text-blue-600 hover:animate-spin cursor-pointer '} />

        }
        <span className='select-none font-bold'>{e.likes && e.likes.filter((el) => el.disLike).length}</span>
      </p>
      <p className="flex">
        {
          e.likes.find((el) =>
            (el.userId !== null) && (el.userId === UserLogedData.id)
            // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
            // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
            // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
            // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
            // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id) 
            && el.love === true) ?
            <FaHeart title='أحببته' onClick={() => DeleteLikeCommentHandeller(e.likes[e.likes?.findIndex((el) =>
              (el.userId !== null) && (el.userId === UserLogedData.id)
              // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
              // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
              // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
              // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
              // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id) 
            )]?.id as unknown as string)} className=" cursor-pointer text-accent_color" />
            :
            <CiHeart title='أحببته' onClick={() => CreateLikeCommentHandeller(e.likes, 'love', Lesson?.Subjects?.id, comId as unknown as number, Lesson?.id, reId)} className="text-red-800 hover:animate-ping cursor-pointer " />
        }
        <span className='select-none font-bold'>{e.likes && e.likes.filter((el) => el.love).length}</span>
      </p>
      <p className="flex">
        {
          e.likes.find((el) =>
            (el.userId !== null) && (el.userId === UserLogedData.id)
            // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
            // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
            // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
            // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
            // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id)  
            && el.hate === true) ?
            <FaFaceAngry title='أغضبني' onClick={() => DeleteLikeCommentHandeller(e.likes[e.likes?.findIndex((el) =>
              (el.userId !== null) && (el.userId === UserLogedData.id)
              // (el.adminId  !== null )    &&   (el.adminId  == UserLogedData.id) ||
              // (el.teacheId !== null )    &&   (el.teacheId == UserLogedData.id) ||
              // (el.leaderId !== null )    &&   (el.leaderId == UserLogedData.id) ||
              // (el.mangerId !== null )    &&   (el.mangerId == UserLogedData.id) ||
              // (el.ownerId  !== null )    &&   (el.ownerId  == UserLogedData.id) 
            )]?.id as unknown as string)} className=" cursor-pointer text-orange-800" />
            :
            <FaRegAngry title='أغضبني' onClick={() => CreateLikeCommentHandeller(e.likes, 'hate', Lesson?.Subjects?.id, comId as unknown as number, Lesson?.id, reId)} className="text-amber-800 hover:text-accent_color hover:animate-bounce cursor-pointer " />
        }
        <span className='select-none font-bold'>{e.likes && e.likes.filter((el) => el.hate).length}</span>
      </p>
    </div>
  )
}
