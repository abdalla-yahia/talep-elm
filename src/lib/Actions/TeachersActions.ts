import { DeleteHook, getAllHook,PostHook, PutHook } from "@/Hook/Custom-Hook"
import { LoginUserInterface, TeacherPayload, UpdateUserInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosRequestConfig } from "axios";

export const fetchAllTeachers =createAsyncThunk( 'teachers/getall',async ()=>{
    try {
        const AllTeachers = await getAllHook('/api/v1/teachers')
        return AllTeachers.data;
    } catch (error) {
        return error
    }
    })

export const fetchTeacherById = createAsyncThunk('teachers/getTeacherbyid',async(id:string)=>{
    try {
        const Teacher = await getAllHook(`/api/v1/teachers/${id}`)
        return Teacher.data;
        } catch (error) {
            return error
            }
    })

export const createTeacher = createAsyncThunk('teachers/createTeacher',async(data:TeacherPayload)=>{
    try {
        const Teacher = await PostHook('/api/v1/teachers',data as unknown as AxiosRequestConfig)
        return Teacher.data;
        } catch (error) {
            return error
        }   
    })

export const updateTeacher = createAsyncThunk('teachers/updateTeacher',async(data:UpdateUserInterface)=>{
    try {
        const Teacher = await PutHook(`/api/v1/teachers/${data.id}`,data as unknown as AxiosRequestConfig)
        return Teacher;
        } catch (error) {
            return error
            }
    })

export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher',async(id:string)=>{
    try {
        const Teacher = await DeleteHook(`/api/v1/teachers/${id}`)
        return Teacher.data;
        } catch (error) {
            return error
        }
    })

export const LoginTeacher = createAsyncThunk('teachers/login',async (data:LoginUserInterface)=>{
    try {
        const Teacher = await PostHook(`/api/v1/${data?.role}/auth/login`,data as unknown as AxiosRequestConfig)
        return Teacher.data;
        } catch (error) {
            return error
            }
    })

export const LogOutTeacher = createAsyncThunk('teachers/logout',async ()=>{
    try {
        const Teacher = await getAllHook(`/api/v1/teachers/auth/logout`)
        return Teacher.data;
        } catch (error) {
            return error
            }
    })

