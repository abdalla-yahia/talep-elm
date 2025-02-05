import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreateRecoment } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchAllReComments = createAsyncThunk('re-comment/getAll',  async ()=>{
    try {
        const res = await getAllHook('/api/v1/re-comment')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchReCommentById = createAsyncThunk('re-comment/getById',async (id)=>{
    try {
        const res = await getAllHook(`/api/v1/re-comment/${id}`)
        return res.data;
    } catch (error) {
        return error
    }
})

export const createReComment = createAsyncThunk('re-comment/create',async (comment:CreateRecoment)=>{
    try {
        const res = await PostHook('/api/v1/re-comment',comment as unknown as AxiosRequestConfig)
        return res.data;
    } catch (error) {
        return error
    }
})

export const updateReComment = createAsyncThunk('re-comment/update',async (comment:{text:string,id:number})=>{
    try {
        const res = await PutHook(`/api/v1/re-comment/${comment.id}`,comment as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
        }
})

export const deleteReComment = createAsyncThunk('re-comment/delete',async (id:string)=>{
    try {
        const res = await DeleteHook(`/api/v1/re-comment/${id}`)
            return res.data;
            } catch (error) {
                return error
            }
})

