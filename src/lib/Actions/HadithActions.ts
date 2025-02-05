import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { CreateHadithInterface } from "@/Interfaces/InterFaces";
import { Hadith } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchHadith = createAsyncThunk('Hadith/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/hadith')
        return res.data;
    } catch (error) {
        return error
    }
    })

export const fetchHadithByID = createAsyncThunk('Hadith/getone', async (id) => {
    try {
        const res = await getAllHook(`/api/v1/hadith/${id}/`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createHadith = createAsyncThunk('Hadith/createone' ,async (data:CreateHadithInterface) => {
    try {
        const res = await PostHook('/api/v1/hadith', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
    })

export const updateHadith = createAsyncThunk('Hadith/updateone', async (data:Hadith) => {
    try {
        const res = await PutHook(`/api/v1/hadith/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
    })

export const deleteHadith = createAsyncThunk('Hadith/deleteone', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/hadith/${id}`)
        return res.data;
        } catch (error) {
            return error
            }
    })