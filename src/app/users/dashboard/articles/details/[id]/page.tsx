'use client'
import ArticleInfo from "@/Components/Articles/ArticleInfo";
import { fetchArticleByID } from "@/lib/Actions/ArticlesActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import FullTitle from "@/Utils/FullTitle";
import { Articles } from "@prisma/client";

export default  function SubjectDetails() {
  const {id}  = useParams() as unknown as {id:string}
  const {Article} = useAppSelector(state  => state.article) as unknown as {Article:{data:Articles}}
  const {UpdateArticle} = useAppSelector(state=>state.article) as unknown as {UpdateArticle:{status:number}}
  const {DeleteArticle} = useAppSelector(state=>state.article) as unknown as {DeleteArticle:{status:number}}
  const dispatch = useAppDispatch()
    //Get A Specific Article
    useEffect(()=>{
      dispatch(fetchArticleByID(id))
    },[id,dispatch,DeleteArticle,UpdateArticle])

  return (
    <>
    <FullTitle F_Title={`${Article?.data?.title}`}/>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <ArticleInfo Article ={Article?.data}  />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
