import { configureStore }     from '@reduxjs/toolkit';
import userSlice              from './Reducers/UserReducer';
import subjectSlice           from './Reducers/SubjectsReducer';
import lessonSlice            from './Reducers/LessonsReducer';
import commentSlice           from './Reducers/CommentsReducer';
import recommentSlice         from './Reducers/ReCommentsReducer';
import likescommentSlice      from './Reducers/LikesCommentsReducer';
import assinmentSlice         from './Reducers/AssinmentsReducer';
import assinmentResultSlice   from './Reducers/AssinmentsResultsReducer';
import groupSlice             from './Reducers/GroupsReducer';
import teacherSlice           from './Reducers/TeacherReducer';
import sectionSlice           from './Reducers/SectionsReducer';
import managerSlice           from './Reducers/ManagerReducer';
import ownerSlice             from './Reducers/OwnerReducer';
import adminSlice             from './Reducers/AdminReducer';
import admin_TeacherSlice     from './Reducers/Admin_TeacherReducer';
import forgetpassSlice        from './Reducers/ForgetPasswordReducer';
import examSlice              from './Reducers/ExamsReducer';
import examResultSlice        from './Reducers/ExamsResultsReducer';
import articleSlice           from './Reducers/ArticlesReducer';
import postSlice              from './Reducers/PostsReducer';
import hadithSlice              from './Reducers/HadithReducer';
import newsSlice              from './Reducers/NewsReducer';
import codeSlice              from './Reducers/CodesReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userSlice,
        subject:subjectSlice,
        lesson:lessonSlice,
        comment:commentSlice,
        recomment:recommentSlice,
        likes:likescommentSlice,
        assinment:assinmentSlice,
        assinmentResult:assinmentResultSlice,
        group:groupSlice,
        teacher:teacherSlice,
        section:sectionSlice,
        manager:managerSlice,
        owner:ownerSlice,
        admin:adminSlice,
        admin_teacher:admin_TeacherSlice,
        forgetpass:forgetpassSlice,
        exam:examSlice,
        examResult:examResultSlice,
        article:articleSlice,
        post:postSlice,
        hadith: hadithSlice,
        news:newsSlice,
        code:codeSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// export const dynamic = 'force-dynamic'