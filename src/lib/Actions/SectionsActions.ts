import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { SectionsInterface, UpdateSectionInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchSections = createAsyncThunk('Sections/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/sections')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchSectionByID = createAsyncThunk('Sections/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/sections/${id}`)
        return res.data;
        } catch (error) {
            return error
        }
})

export const createSection = createAsyncThunk('Sections/createone' ,async (data:SectionsInterface) => {
    try {
        const res = await PostHook('/api/v1/sections', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const updateSection = createAsyncThunk('Sections/updateone', async (data:UpdateSectionInterface) => {
    try {
        const res = await PutHook(`/api/v1/sections/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const deleteSection = createAsyncThunk('Sections/deleteone', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/sections/${id}`)
        return res.data;
        } catch (error) {
            return error
            }
})
