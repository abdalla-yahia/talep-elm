import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { AssinmentInterface, CreatAssinmentInterFace } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchAssinments = createAsyncThunk('Assinments/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/assinments')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchAssinmentByID = createAsyncThunk('Assinments/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/assinments/${id}`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createAssinment = createAsyncThunk('Assinments/create', async (data:CreatAssinmentInterFace) =>{
    try {
        const res = await PostHook('/api/v1/assinments', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
}
})

export const updateAssinment = createAsyncThunk('Assinments/update', async (data:AssinmentInterface) =>{
    try {
        const res = await PutHook(`/api/v1/assinments/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
})

export const deleteAssinment = createAsyncThunk('Assinments/delete', async (id:string) =>{
    try {
        const res = await DeleteHook(`/api/v1/assinments/${id}`)
        return res.data;
        } catch (error) {
            return error
            }

})