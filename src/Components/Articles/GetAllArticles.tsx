'use client'
import { fetchArticles } from "@/lib/Actions/ArticlesActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import ArticlesMap from "./ArticlesMap"
import { LoginUserInterface } from "@/Interfaces/InterFaces"
import { Articles } from "@prisma/client"

export default function GetAllArticles({SearchText}:{SearchText:string}) {
    const {UserLogedData} = useAppSelector(state=>state.user) as unknown as {UserLogedData:LoginUserInterface}
    const {AllArticles} = useAppSelector(state => state.article) as unknown as {AllArticles:{Articles: Articles[]}}
    const {Article} = useAppSelector(state=> state.article)
    const {UpdateArticle} = useAppSelector(state=>state.article)
    const {DeleteArticle} = useAppSelector(state=>state.article)
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchArticles())
    },[Article,dispatch,UpdateArticle,DeleteArticle])
    const Articles = SearchText !== ''? (AllArticles?.Articles?.filter(article=>article?.title?.includes(SearchText))):AllArticles?.Articles;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    UserLogedData?.role === 'USER' ? Articles?.filter((e: { access: string })=>e?.access === 'public') : Articles
    return (
    <>
    <ArticlesMap Articles ={Articles}/>
    </>
  )
}
