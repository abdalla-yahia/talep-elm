import { DeleteHook, getAllHook,PostHook, PutHook } from "@/Hook/Custom-Hook"
import { AdminTeacherPayload, LoginUserInterface, UpdateUserInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosRequestConfig } from "axios";
// import { setAdminData } from "../Reducers/AdminReducer"

export const fetchAllAdmins_Teachers =createAsyncThunk( 'Admins_Teachers/getall',async ()=>{
    try {
        const AllAdmins_Teachers = await getAllHook('/api/v1/admin-teacher')
        return AllAdmins_Teachers.data;
    } catch (error) {
        return error
    }
    })

export const fetchAdmin_TeacherById = createAsyncThunk('Admins_Teachers/getAdminbyid',async(id:string)=>{
    try {
        const Admin_Teacher = await getAllHook(`/api/v1/admin-teacher/${id}`)
        return Admin_Teacher.data;
        } catch (error) {
            return error
            }
    })

export const createAdmin_Teacher = createAsyncThunk('Admins_Teachers/createAdmin',async(data:AdminTeacherPayload)=>{
    try {
        const Admin_Teacher = await PostHook('/api/v1/admin-teacher',data as unknown as AxiosRequestConfig)
        return Admin_Teacher.data;
        } catch (error) {
            return error
        }   
    })

export const updateAdmin_Teacher = createAsyncThunk('Admins_Teachers/updateAdmin',async(data:UpdateUserInterface)=>{
    try {
        const Admin_Teacher = await PutHook(`/api/v1/admin-teacher/${data.id}`,data as unknown as AxiosRequestConfig)
        return Admin_Teacher.data;
        } catch (error) {
            return error
            }
    })

export const deleteAdmin_Teacher = createAsyncThunk('Admins_Teachers/deleteAdmin',async(id:string)=>{
    try {
        const Admin_Teacher = await DeleteHook(`/api/v1/admin-teacher/${id}`)
        return Admin_Teacher.data;
        } catch (error) {
            return error
        }
    })

export const LoginAdmin_Teacher = createAsyncThunk('Admins_Teachers/login',async (data:LoginUserInterface)=>{
    try {
        const Admin_Teacher = await PostHook(`/api/v1/${data?.role}/auth/login`,data as unknown as AxiosRequestConfig)
        return Admin_Teacher.data;
        } catch (error) {
            return error
            }
    })

export const LogOutAdmin_Teacher = createAsyncThunk('Admins_Teachers/logout',async ()=>{
    try {
        const Admin_Teacher = await getAllHook(`/api/v1/admin-teacher/auth/logout`)
        return Admin_Teacher.data;
        } catch (error) {
            return error
            }
    })
