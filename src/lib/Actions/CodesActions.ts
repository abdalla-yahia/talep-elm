import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { Code } from "@/Interfaces/InterFaces";
import { Codes } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchCodes = createAsyncThunk('Codes/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/codes')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchCodesByID = createAsyncThunk('Codes/getone', async (id) => {
    try {
        const res = await getAllHook(`/api/v1/codes/${id}/`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createCodes = createAsyncThunk('Codes/createone' ,async (data:Code) => {
    try {
        const res = await PostHook('/api/v1/codes', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const updateCodes = createAsyncThunk('Codes/updateone', async (data:Codes) => {
    try {
        const res = await PutHook(`/api/v1/codes/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
            })

export const deleteCodes = createAsyncThunk('Codes/deleteone', async (data:Code) => {
    try {
        const res = await DeleteHook('/api/v1/codes',{data})
        return res;
        } catch (error) {
            return error
            }
})
export const deleteCodesById = createAsyncThunk('Codes/deleteonebyid', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/codes/${id}`)
        return res;
        } catch (error) {
            return error
            }
})