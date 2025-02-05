import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreateComment } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchAllComments = createAsyncThunk('comments/getAll',  async ()=>{
    try {
        const res = await getAllHook('/api/v1/comments')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchCommentById = createAsyncThunk('comments/getById',async (id)=>{
    try {
        const res = await getAllHook(`/api/v1/comments/${id}`)
        return res.data;
    } catch (error) {
        return error
    }
})

export const createComment = createAsyncThunk('comments/create',async (comment:CreateComment)=>{
    try {
        const res = await PostHook('/api/v1/comments',comment as unknown as AxiosRequestConfig)
        return res
    } catch (error) {
        return error
    }
})

export const updateComment = createAsyncThunk('comments/update',async (comment:{text:string,id:number})=>{
    try {
        const res = await PutHook(`/api/v1/comments/${comment.id}`,comment as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
        }
})

export const deleteComment = createAsyncThunk('comments/delete',async (id:string)=>{
    try {
        const res = await DeleteHook(`/api/v1/comments/${id}`)
            return res.data;
            } catch (error) {
                return error
            }
})

