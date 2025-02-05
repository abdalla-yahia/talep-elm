import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreateNewsInterface, UpdateNewsInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchNews = createAsyncThunk('News/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/news')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchNewsByID = createAsyncThunk('News/getone', async (id) => {
    try {
        const res = await getAllHook(`/api/v1/news/${id}/`)
        return res.data;
        } catch (error) {
            return error
        }
})

export const createNews = createAsyncThunk('News/createone' ,async (data:CreateNewsInterface) => {
    try {
        const res = await PostHook('/api/v1/news', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const updateNews = createAsyncThunk('News/updateone', async (data:UpdateNewsInterface) => {
    try {
        const res = await PutHook(`/api/v1/news/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const deleteNews = createAsyncThunk('News/deleteone', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/news/${id}`)
        return res.data;
        } catch (error) {
            return error
            }
})