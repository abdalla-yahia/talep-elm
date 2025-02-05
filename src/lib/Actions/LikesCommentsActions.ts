import { DeleteHook, getAllHook, PostHook } from "@/Hook/Custom-Hook";
import { CreateLikesComment } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchAllLikesComments = createAsyncThunk('likes-comment/getAll',  async ()=>{
    try {
        const res = await getAllHook('/api/v1/likes-comment')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchLikesCommentById = createAsyncThunk('likes-comment/getById',async (id)=>{
    try {
        const res = await getAllHook(`/api/v1/likes-comment/${id}`)
        return res.data;
    } catch (error) {
        return error
    }
})

export const createLikesComment = createAsyncThunk('likes-comment/create',async (comment:CreateLikesComment)=>{
    try {
        const res = await PostHook('/api/v1/likes-comment',comment as unknown as AxiosRequestConfig )
        return res
    } catch (error) {
        return error
    }
})

export const deleteLikesComment = createAsyncThunk('likes-comment/delete',async (id:string)=>{
    try {
        const res = await DeleteHook(`/api/v1/likes-comment/${id}`)
            return res.data;
            } catch (error) {
                return error
            }
})

