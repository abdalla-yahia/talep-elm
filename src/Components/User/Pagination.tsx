import { useEffect, useState } from "react";
import * as icon from '@/Components/Icons/icons'
export default function Pagination({query,setQuery,pages}:{
    query:string,
    setQuery:React.Dispatch<React.SetStateAction<string>>,
    pages:number
}) {
    const [currentPage,setCurrentPage] = useState(1);
    const [PagesCount, setPagesCount] = useState<number[]>([]);

    useEffect(() => {
        const pagesArray = [];
        for (let i = 1; i <= pages; i++) {
            pagesArray.push(i);
        }
        setPagesCount(pagesArray);
    },[pages])
        //Handle Next Button
        const handleNextPageChange = () => {
            if(currentPage !== pages) {
                setQuery(`pageNumber=${+currentPage + 1}`);
                setCurrentPage(+currentPage + 1)
            }
        }
        //Handle Prev Button
        const handlePrevPageChange = () => {
            if(currentPage !== 1){
                setCurrentPage(+currentPage - 1)
                setQuery(`pageNumber=${+currentPage - 1}`);
            } 
        }
  return (
    <>
   {pages > 1 && <div className="pagination w-full my-3 flex justify-center items-center ">
        <div className="border flex justify-center items-center border-gray-400 bg-blue-100">

          <div  onClick={()=>handlePrevPageChange()} className={`${currentPage === 1 ? ' opacity-15 cursor-not-allowed' :'block'} border-1 text-blue-600 border-gray-400 hover:bg-gray-400 hover:text-white flex text-center cursor-pointer px-2 justify-center items-center `}><icon.MdKeyboardDoubleArrowRight /> ... السابق</div>
       { 
       pages >= 10 ?
          (  
              <>
            {PagesCount?.slice(0,3).map((page,i)=>
                <div key={i} onClick={()=>{setQuery(`${query?.length?'&':''}pageNumber=${page}`);setCurrentPage(+page)}} className={`${currentPage === page && 'bg-black text-white'} border-1 text-blue-600 border-gray-400 hover:bg-gray-400 hover:text-white flex text-center cursor-pointer px-2 `}>{page}</div>
            )}
            
            
            <div className={`border text-blue-600  flex text-center cursor-pointer px-0 pe-1 border-l-none`}>.....</div>
            {(currentPage > 3  && currentPage <= (pages - 3 )) && <div className={`bg-black text-white border-1  border-gray-400 hover:bg-gray-400 hover:text-white flex text-center cursor-pointer px-2 `}>{currentPage}</div> }
            <div className={`border text-blue-600 border-gray-400  flex text-center cursor-pointer px-0 ps-1 border-r-none`}>.....</div>
                
                
                {PagesCount?.slice(-3,).map((page,i)=>
                        <div key={i} onClick={()=>{setQuery(`${query?.length?'&':''}pageNumber=${page}`);setCurrentPage(+page)}} className={`${currentPage === page && 'bg-black text-white'} border-1 text-blue-600 border-gray-400 hover:bg-gray-400 hover:text-white flex text-center cursor-pointer px-2 `}>{page}</div>
                )}
                </>
            )
            :
            (
                PagesCount?.map((page,i)=>
                    <div key={i} onClick={()=>{setQuery(`${query?.length?'&':''}pageNumber=${page}`);setCurrentPage(+page)}} className={`${currentPage === page && 'bg-black text-white'} border-1 text-blue-600 border-gray-400 hover:bg-gray-400 hover:text-white flex text-center cursor-pointer px-2 `}>{page}</div>
            )
            )
        }
        <div  onClick={()=>handleNextPageChange()} className={`${currentPage === pages ? ' opacity-15 cursor-not-allowed' :'block'} border-1 text-blue-600 border-gray-400 hover:bg-gray-400 hover:text-white flex text-center cursor-pointer px-2 justify-center items-center `}>التالي ... <icon.MdOutlineKeyboardDoubleArrowLeft /></div>
        </div>
    </div>}
        </>
  )
}
