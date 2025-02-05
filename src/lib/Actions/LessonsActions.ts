import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreateLessonsInterface, UpdateLesson } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchAllLesson = createAsyncThunk('lessons/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/lessons')
        return res.data
    } catch (error) {
        return error
    }
})

export const fetchLessonById = createAsyncThunk('lessons/getbyid', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/lessons/${id}`)
        return res.data
    }   catch (error) {
        return error
    }
})

export const createLesson = createAsyncThunk('lessons/create', async (lesson:CreateLessonsInterface) => {
    try {
        const res = await PostHook('/api/v1/lessons',lesson as unknown as AxiosRequestConfig)
        return res.data
    } catch (error) {
        return error
        }
})

export const updateLesson = createAsyncThunk('lessons/update', async (lesson:UpdateLesson) => {
    try {
        const res = await PutHook(`/api/v1/lessons/${lesson.id}`, lesson as unknown as AxiosRequestConfig)
        return res.data
    } catch (error) {
        return error
        }
})

export const deleteLesson = createAsyncThunk('lessons/delete', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/lessons/${id}`)   
        return res.data
        } catch (error) {
            return error
            }
})