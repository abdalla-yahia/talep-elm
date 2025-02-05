import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { SubjectsInterface, UpdateSubjectsInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchSubjects = createAsyncThunk('subjects/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/subjects')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchSubjectByID = createAsyncThunk('subjects/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/subjects/${id}`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createSubject = createAsyncThunk('subjects/createone' ,async (data:SubjectsInterface) => {
    try {
        const res = await PostHook('/api/v1/subjects', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const updateSubject = createAsyncThunk('subjects/updateone', async (data:UpdateSubjectsInterface) => {
    try {
        const res = await PutHook(`/api/v1/subjects/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const deleteSubject = createAsyncThunk('subjects/deleteone', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/subjects/${id}`)
        return res.data;
        } catch (error) {
            return error
            }
})

