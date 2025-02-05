import { DeleteHook, getAllHook, PostHook, PutHook } from "@/Hook/Custom-Hook";
import { GroupsInterface, UpdateGroupInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const fetchGroups = createAsyncThunk('Groups/getall', async () => {
    try {
        const res = await getAllHook('/api/v1/groups')
        return res.data;
    } catch (error) {
        return error
    }
    })

export const fetchGroupByID = createAsyncThunk('Groups/getone', async (id:string) => {
    try {
        const res = await getAllHook(`/api/v1/groups/${id}/`)
        return res.data;
        } catch (error) {
            return error
        }
    })

export const createGroup = createAsyncThunk('Groups/createone' ,async (data:GroupsInterface) => {
    try {
        const res = await PostHook('/api/v1/groups', data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
    })

export const updateGroup = createAsyncThunk('Groups/updateone', async (data:UpdateGroupInterface) => {
    try {
        const res = await PutHook(`/api/v1/groups/${data.id}`, data as unknown as AxiosRequestConfig)
        return res.data;
        } catch (error) {
            return error
            }
    })

export const deleteGroup = createAsyncThunk('Groups/deleteone', async (id:string) => {
    try {
        const res = await DeleteHook(`/api/v1/groups/${id}`)
        return res.data;
        } catch (error) {
            return error
            }
    })