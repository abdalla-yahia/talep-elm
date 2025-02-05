import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreateExamResultInterface, UpdateExamResultInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchExamsResults = createAsyncThunk('ExamsResults/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/exams-results')
        return res.data;
    } catch (error) {
        return error
    }
    })

export const fetchExamResultByID = createAsyncThunk('ExamsResults/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/exams-results/${id}`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createExamResult = createAsyncThunk('ExamsResults/create', async (data:CreateExamResultInterface)=>{
    try {
        const res = await PostHook('/api/v1/exams-results/',data as unknown as AxiosRequestConfig);
        return res;
    } catch (error) {
        return error
    }
    })

export const updateExamResult = createAsyncThunk('ExamsResults/update', async (data:UpdateExamResultInterface)=>{
    try {
        const res = await PutHook(`/api/v1/exams-results/${data.examId}`,data as unknown as AxiosRequestConfig)
        return res;
        } catch (error) {
            return error;
            }
    })

export const deleteExamResult = createAsyncThunk('ExamsResults/delete', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/exams-results/${id}`)
        return res;
        } catch (error) {
            return error
            }
    })




