import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreatExamInterFace, ExamInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchExams = createAsyncThunk('Exams/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/exams')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchExamByID = createAsyncThunk('Exams/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/exams/${id}`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createExam = createAsyncThunk('Exams/create', async (data:CreatExamInterFace) =>{
    try {
        const res = await PostHook('/api/v1/exams', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
}
})

export const updateExam = createAsyncThunk('Exams/update', async (data:ExamInterface) =>{
    try {
        const res = await PutHook(`/api/v1/exams/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const deleteExam = createAsyncThunk('Exams/delete', async (id:string) =>{
    try {
        const res = await DeleteHook(`/api/v1/exams/${id}`)
        return res.data;
        } catch (error) {
            return error
            }

})