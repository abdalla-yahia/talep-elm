import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreateAssinmentResultInterface, UpdateAssinmentResultInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchAssinmentsResults = createAsyncThunk('AssinmentsResults/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/assinments-results')
        return res.data;
    } catch (error) {
        return error
    }
})

export const fetchAssinmentResultByID = createAsyncThunk('AssinmentsResults/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/assinments-results/${id}`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createAssinmentResult = createAsyncThunk('AssinmentsResults/create', async (data:CreateAssinmentResultInterface)=>{
    try {
        const res = await PostHook('/api/v1/assinments-results/',data as unknown as AxiosRequestConfig);
        return res;
    } catch (error) {
        return error
    }
})

export const updateAssinmentResult = createAsyncThunk('AssinmentsResults/update', async (data:UpdateAssinmentResultInterface)=>{
    try {
        const res = await PutHook(`/api/v1/assinments-results/${data.assinmentId}`,data as unknown as AxiosRequestConfig)
        return res;
        } catch (error) {
            return error;
            }
    })

export const deleteAssinmentResult = createAsyncThunk('AssinmentsResults/delete', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/assinments-results/${id}`)
        return res;
        } catch (error) {
            return error
            }
            })




