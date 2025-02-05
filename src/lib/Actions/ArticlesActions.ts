import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { ArticleProps,ArticleInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchArticles = createAsyncThunk('Articles/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/articles')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchArticleByID = createAsyncThunk('Articles/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/articles/${id}/`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createArticle = createAsyncThunk('Articles/createone' ,async (data:ArticleProps) => {
    try {
        const res = await PostHook('/api/v1/articles', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const updateArticle = createAsyncThunk('Articles/updateone', async (data:ArticleInterface) => {
    try {
        const res = await PutHook(`/api/v1/articles/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
            })

export const deleteArticle = createAsyncThunk('Articles/deleteone', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/articles/${id}`)
        return res.data;
        } catch (error) {
            return error
            }
})