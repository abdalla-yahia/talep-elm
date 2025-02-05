import { z } from "zod"

   export const ExamSchema = z.object({
        title:z.string().min(5).max(200),
        body:z.string().min(20),
        fullDegree:z.number(),
        subjectId:z.number(),
        
    })
   export const ExamResultSchema = z.object({
        title:z.string().min(5).max(200),
        body:z.string().min(20),
        fullDegree:z.number(),
        subjectId:z.number(),
        
    })
   export const FinalResultSchema = z.object({
        score:z.number(),
        examId:z.number()
    })
    export const AssinmentsSchema = z.object({
    name:z.string().min(5).max(200),
    description:z.string().min(20),
    lessonId:z.number(),
    subjectId:z.number(),
    })
    export const AssinmentResultSchema = z.object({

    subjectId:z.number(),
    assinmentId:z.number(),
    score:z.number(),
    })
    export const GroupssSchema = z.object({
    name:z.string().min(5).max(200),
    description:z.string().min(200),
    })
    export const SubjectsSchema = z.object({
    name:z.string().min(5).max(200),
    info:z.string().min(200),
    })
    export const LessonsSchema = z.object({
    name:z.string().min(5).max(200),
    desciption:z.string().min(200),
    subjectId:z.number(),
    })  
    export const RegisterUserSchema =z.object({
    name:z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    telephone:z.string().min(11).max(14),
    gender:z.enum(['MALE','FEMALE']),
    groupId:z.number(),
    address:z.string().optional(),
    age:z.string().max(3).optional(),
    education:z.string().max(200).optional(),
    })
    export const TeacherSchema =z.object({
    name:z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    telephone:z.string().min(11).max(14),
    gender:z.enum(['MALE','FEMALE']),
    groupId:z.number(),
    subjectId:z.number(),
    leaderId:z.number(),
    address:z.string().optional(),
    age:z.string().max(3).optional(),
    education:z.string().max(200).optional(),
    })
    export const OwnerSchema =z.object({
    name:z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    telephone:z.string().min(11).max(14),
    gender:z.enum(['MALE','FEMALE']),
    address:z.string().optional(),
    age:z.string().max(3).optional(),
    education:z.string().max(200).optional(),
    })
    export const AdminsSchema =z.object({
    name:z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    telephone:z.string().min(11).max(14),
    gender:z.enum(['MALE','FEMALE']),
    leaderId:z.number(),
    groupId:z.number(),
    address:z.string().optional(),
    age:z.string().max(3).optional(),
    education:z.string().max(200).optional(),
    })
    export const ManagersSchema =z.object({
    name:z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    telephone:z.string().min(11).max(14),
    gender:z.enum(['MALE','FEMALE']),
    ownerId:z.number(),
    address:z.string().optional(),
    age:z.string().max(3).optional(),
    education:z.string().max(200).optional(),
    })
    export const OwnersSchema =z.object({
    name:z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    telephone:z.string().min(11).max(14),
    gender:z.enum(['MALE','FEMALE']),
    address:z.string().optional(),
    age:z.string().max(3).optional(),
    education:z.string().max(200).optional(),
    })
    export const AdminTeacherSchema =z.object({
    name:z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    telephone:z.string().min(11).max(14),
    gender:z.enum(['MALE','FEMALE']),
    managerId:z.number(),
    address:z.string().optional(),
    age:z.string().max(3).optional(),
    education:z.string().max(200).optional(),
    })

    export const CommentsSchema = z.object({
        text:z.string().min(10).max(1000),
        userId:z.number(),
        lessonId:z.number(),
        subjectId:z.number()
    })

    export const ArticlesSchema = z.object({
        title:z.string().min(10).max(1000),
        content:z.string().min(10),
        access:z.string()
    })
    export const PostsSchema = z.object({
        title:z.string().min(10).max(1000),
        content:z.string().min(10),
        body:z.string(),
        author:z.string(),
    })