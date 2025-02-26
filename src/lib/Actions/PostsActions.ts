import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreatePostsInterface } from "@/Interfaces/InterFaces";
import { Posts } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchPosts = createAsyncThunk('Posts/getall', async (page:number)=> {
    try {
        const res = await getAllHook(`/api/v1/posts?page=${page}`)
        return res.data;
    } catch (error) {
        return error
    }
    })

export const fetchPostByID = createAsyncThunk('Posts/getone', async (id) => {
    try {
        const res = await getAllHook(`/api/v1/posts/${id}/`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createPost = createAsyncThunk('Posts/createone' ,async (data:CreatePostsInterface) => {
    try {
        const res = await PostHook('/api/v1/posts', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
    })

export const updatePost = createAsyncThunk('Posts/updateone', async (data:Posts) => {
    try {
        const res = await PutHook(`/api/v1/posts/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
    })

export const deletePost = createAsyncThunk('Posts/deleteone', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/posts/${id}`)
        return res.data;
        } catch (error) {
            return error
            }
    })