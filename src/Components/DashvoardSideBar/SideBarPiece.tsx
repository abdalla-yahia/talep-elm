import Link from "next/link";
import {SideBarPieceProps} from '@/Interfaces/InterFaces';

export default function SideBarPiece({role,number,Customer,subdom,title,children}:SideBarPieceProps) {
  return (
    <>
    {role >= number && 
                    <Link href={`/${Customer}/dashboard/${subdom}`} className="w-full h-full flex justify-center gap-2 items-center">
            <li className="cursor-pointer hover:text-gray-600 hover:text-lg transition-all flex justify-center gap-2 items-center py-3 border-b-2 w-full text-center border-purple-900">
                   {children}
                   <span className="hidden lg:block ">
                     {title}
                   </span>
                </li>
                    </Link>
                }
    </>
  )
}
