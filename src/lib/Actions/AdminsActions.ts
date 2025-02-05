import { DeleteHook, getAllHook,PostHook, PutHook } from "@/Hook/Custom-Hook"
import { AdminPayload, LoginUserInterface, UpdateUserInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosRequestConfig } from "axios";

export const fetchAllAdmins =createAsyncThunk( 'Admins/getall',async ()=>{
    try {
        const AllAdmins = await getAllHook('/api/v1/admins')
        return AllAdmins.data;
    } catch (error) {
        return error
    }
    })

export const fetchAdminById = createAsyncThunk('Admins/getAdminbyid',async(id:string)=>{
    try {
        const Admin = await getAllHook(`/api/v1/admins/${id}`)
        return Admin.data;
        } catch (error) {
            return error
            }
    })

export const createAdmin = createAsyncThunk('Admins/createAdmin',async(data:AdminPayload)=>{
    try {
        const Admin = await PostHook('/api/v1/admins/auth/registers',data as unknown as AxiosRequestConfig)
        return Admin;
        } catch (error) {
            return error
        }   
    })

export const updateAdmin = createAsyncThunk('Admins/updateAdmin',async(data:UpdateUserInterface)=>{
    try {
        const Admin = await PutHook(`/api/v1/admins/${data.id}`,data as unknown as AxiosRequestConfig)
        return Admin;
        } catch (error) {
            return error
            }
    })

export const deleteAdmin = createAsyncThunk('Admins/deleteAdmin',async(id:string)=>{
    try {
        const Admin = await DeleteHook(`/api/v1/admins/${id}`)
        return Admin.data;
        } catch (error) {
            return error
        }
    })

export const LoginAdmin = createAsyncThunk('Admins/login',async (data:LoginUserInterface)=>{
    try {
        const Admin = await PostHook(`/api/v1/${data?.role}/auth/login`,data as unknown as AxiosRequestConfig)
        return Admin.data;
        } catch (error) {
            return error
            }
    })

export const LogOutAdmin = createAsyncThunk('Admins/logout',async ()=>{
    try {
        const Admin = await getAllHook(`/api/v1/admins/auth/logout`)
        return Admin.data;
        } catch (error) {
            return error
            }
    })
