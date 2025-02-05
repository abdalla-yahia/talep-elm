import { Dispatch, ReactNode, SetStateAction } from "react";
import { FormCheckType } from "react-bootstrap/esm/FormCheck";

export interface ErrorHandelling {
  error: Error;
  reset: () => void;
}
// Define the expected parameter type
type RouteParams = {
  id: string;
}

// Define the route context type
export  type RouteContext = {
  params: RouteParams;
}
export interface SideBarPieceProps {
    role:number,
    number:number,
    Customer:string,
    subdom:string,
    title:string,
    children:ReactNode
}
export interface ArticleProps {
  id?:string,
  content: string;
  access: string;
  title: string;
}
export interface ArticleInterface {
  id:number,
  content?: string;
  access?: string;
  title?: string;
}
export interface GroupsInterface {
  id?:string,
  name: string;
  description: string;
  gender: string;
  User?:string[];
}
export interface SectionsInterface {
  id?:string,
  name:string,
  managerId: number;
  description: string;
}
export interface SubjectsInterface {
  id?:string,
  name:string,
  sectionId: number;
  info: string;
  User?:[{name:string,id:string}]
  Teachers?:[{name:string,id:string}]
  Lessons?:[{name:string,id:string}]
  Exam?:[{name:string,id:string}]
  Assinments?:[{name:string,id:string}]
  AssinmentsResult?:[{name:string,id:string}]
  ExamResults?:[{name:string,id:string}]
}
export interface UpdateSubjectsInterface {
  id:number
  name:string,
  info:string,
  sectionId:number
}
export interface GroupInterface {
  id?:string,
  name:string,
  description: number;
  gender: string;
  createdAt:Date,
  Teachers: [{id:string,name:string}];
  Admins: [{id:string,name:string}];
  User: [{id:string,name:string}];
}
export interface AssinmentInterface {
  id?:number,
  name:string,
  description:string,
  lessonId:number,
  subjectId:number,
  teacherId:number,
  assinmentbody?:JSON
}
export interface ExamInterface {
  id?:number,
  title:string,
  fullDegree:number,
  subjectId:number,
  teacherId:number,
  assinmentbody?:JSON
}
export interface AllAssinmentInterface {
  degree: never;
  score?: number;
  id?:number,
  name:string,
  description:string,
  Lessons:{id:number,name:string},
  Subjects:{id:number,name:string},
  teacher:{id:number,name:string},
  User:string[],
  assinmentbody?:{questions:[{degree:string|number,id:string,answer:string[],type:string,question:string,choase:string[]}],time:{hours:number,minutes:number,seconds:number}}
  AssinmentResult?:string[]
}
export interface AllExamsInterface {
  degree: never;
  score?: number;
  id?:number,
  fullDegree?:number,
  title:string,
  description:string,
  Subjects:{id:number,name:string},
  teacher:{id:number,name:string},
  User:string[],
  Exambody?:{questions:[{degree:string|number,id:string,answer:string[],type:string,question:string,choase:string[]}],time:{hours:number,minutes:number,seconds:number}}
  ExamResult?:string[]
}
export interface AssinmentResultInterface {
  id?:string,
  score: number;
  createdAt:Date,
  answersbody?:string,
  User: {id:string,name:string,Groups:{id:string,name:string}},
  Assinments:{assinmentbody:{questions:[{degree:string,id:string,answer:string[],type:string,question:string,choase:string[]}]}}
}
export interface CreateAssinmentResultInterface {
  id?:number,
  score: number;
  subjectId:number,
  lessonId:number,
  userId:number | string,
  teacherId:number,
  assinmentId:number | undefined,
  answersbody:JSON | null
}
export interface CreateExamResultInterface {
  id?:number,
  score: number;
  subjectId:number,
  userId:number | string,
  teacherId:number,
  examId:number | undefined,
  answersbody:JSON | null
}
export interface UpdateAssinmentResultInterface {
  id?:number,
  score: number,
  assinmentId?:number,
  answersbody:string|JSON | null
}
export interface UpdateExamResultInterface {
  id?:number,
  score: number,
  examId?:number,
  answersbody:string|JSON | null
}

export interface ExamResultInterface {
  id?:string,
  score: number;
  createdAt:Date,
  answersbody:string 
  User: {id:string,name:string,Groups:{id:string,name:string}},
  Exams?:{Exambody:{questions:[{degree:string,id:string,answer:string[],type:string,question:string,choase:string[]}]}}
  Exam?:{Exambody:{questions:[{degree:string,id:string,answer:string[],type:string,question:string,choase:string[]}]}}
}
export interface AllExamResultInterface {
  id?:string,
  score: number;
  createdAt:Date,
  answersbody:string 
  User: {id:string,name:string,Groups:{id:string,name:string}},
  ExamResult:string[]
}
export interface ExamsProps {
  id: number | string;
  question: string;
  choase: string[];
  type: FormCheckType | string;
  degree: number | string;
  answers:[{id:number|string,type:string,answer:string}] | never[];
  setAnswers:Dispatch<SetStateAction<never[]>>
}
export interface CoorectAnswerInterface {
  id: string;
  answer: string;
  degree: number;
  type: string;
  
}
export interface RegisterUser {
  name:string,
  email:string,
  password: string,
  telephone:string,
  gender:string,
  groupId?:number,
  leaderId?:number,
  subjectId?:number,
  managerId?:number,
  ownerId?:number,
  confirmPassword?: string,
  age?:number,
  address?:string,
  education?:string,
}
export interface LoginUserInterface {
  email?:string,
  telephone?:string,
  role?:string,
  password: string,
}
export interface LogedUserInterface {
  id:string
  name:string,
  email?:string,
  telephone?:string,
  path:string,
  image:string,
  role?:string | unknown,
  gender?:string
}
export interface UpdateUserInterface {
  id?: number;
  name?: string;
  email?: string;
  telephone?: string;
  address?: string;
  groupId?: number;
  age?: number;
  education?: string;
  password?: string;
  image?: unknown | null;
}

export interface UserPayload {
  id?:number,
  name:string,
  email:string,
  telephone:string,
  password:string,
  gender:string,
  groupId:number,
  path?:string,
  role?:string,
  address?:string,
  age?:string,
  education?:string,
  image?:string
}
export interface AllUserInterface {
  id?:number,
  name?:string,
  email?:string,
  telephone?:string,
  password:string,
  gender:string,
  groupId:number,
  path?:string,
  role?:string,
  address?:string,
  age?:string,
  education?:string,
  image?:string,
  createdAt:Date,
  AssinmentResult:[{id:number,score:number}]
  ExamResult:[{id:number,score:number}],
  Groups:{id:number,name:string}
}
export interface AdminPayload {
  id?:number,
  name:string,
  email:string,
  telephone:string,
  password:string,
  gender:string,
  groupId:number,
  leaderId:number,
  path?:string,
  role?:string,
  address?:string,
  age?:string,
  education?:string,
  image?:string
}

export interface TeacherPayload {
  id?:number,
  name:string,
  email:string,
  telephone:string,
  password:string,
  gender:string,
  groupId:number,
  leaderId:number,
  subjectId:number,
  path?:string,
  role?:string,
  address?:string,
  age?:string,
  education?:string,
  image?:string
}
export interface AdminTeacherPayload {
  id?:number,
  name:string,
  email:string,
  telephone:string,
  password:string,
  gender:string,
  managerId:number,
  path?:string,
  role?:string,
  address?:string,
  age?:string,
  education?:string,
  image?:string
}
export interface ManagersPayload {
  id?:number,
  name:string,
  email:string,
  telephone:string,
  password:string,
  gender:string,
  ownerId:number,
  path?:string,
  role?:string,
  address?:string,
  age?:string,
  education?:string,
  image?:string
}
export interface OwnersPayload {
  id?:number,
  name:string,
  email:string,
  telephone:string,
  password:string,
  gender:string,
  path?:string,
  role?:string,
  address?:string,
  age?:string,
  education?:string,
  image?:string
}
export interface TokenInterFace {
  id: number,
  role: string,
  email: string,
  path: string,
  gender: string,
  name: string,
  image:string,
}
export interface InformationCard {
  name:string,
  age:number,
  gender:string,
  telephone:string,
  id?:number,
  groupId?:number,
  address?:string,
  image?:string,
  education?:string,
  role?:string,
  email?:string
  subjectId?:number,
  leaderId:number,
  managerId?:number
  ownerId?:number
}
export interface Code {
  code:string,
  email:string,
  role?:string
}

export interface CreateLikesComment {
  like:boolean     | null | unknown,
  disLike:boolean  | null | unknown,
  love:boolean     | null | unknown,
  hate:boolean     | null | unknown,
  userId:number    | null | unknown,
  adminId:number   | null | unknown,
  teacheId:number  | null | unknown,
  leaderId:number  | null | unknown,
  mangerId:number  | null | unknown,
  ownerId:number   | null | unknown,
  subjectId:number,
  commentId:number,
  lessonId:number,
  reCommentId?:number | unknown
}

export interface CreateRecoment {
  text:string,
  commentId:number,
  userId:number | null,
  adminId:number | null,
  teacheId:number |null,
  leaderId:number | null,
  mangerId:number | null,
  ownerId:number | null,
  lessonId:number ,
  subjectId:number
}

export interface CreateComment {
  id?:number,
  text:string,
  lessonId:number,
  subjectId:number,
  userId:number | null,
  adminId:number | null,
  teacheId:number | null,
  leaderId:number | null,
  mangerId:number | null,
  ownerId:number | null,
  replies?:[{
    id:number,
    text:string,
    User:{name:string,gender:string,image:string,id:string},
    Admin:{name:string,gender:string,image:string,id:string},
    Teacher:{name:string,gender:string,image:string,id:string},
    AdminTeacher:{name:string,gender:string,image:string,id:string},
    Manager:{name:string,gender:string,image:string,id:string},
    Owner:{name:string,gender:string,image:string,id:string},
  }]
  createdAt?:Date
  User?:{name:string,gender:string,image:string,id:string},
  Admin?:{name:string,gender:string,image:string,id:string},
  Teacher?:{name:string,gender:string,image:string,id:string},
  AdminTeacher?:{name:string,gender:string,image:string,id:string},
  Manager?:{name:string,gender:string,image:string,id:string},
  Owner?:{name:string,gender:string,image:string,id:string},
}
export interface Replies {
  id:string,
  text:string,
  Lesson:{Subjects:{id:string},id:string}
  likes:[{id:string,userId:string,like?: boolean,disLike?: boolean,love?: boolean,hate?: boolean}],
  User:{name:string,gender:string,image:string,id:string},
  Admin:{name:string,gender:string,image:string,id:string},
  Teacher:{name:string,gender:string,image:string,id:string},
  AdminTeacher:{name:string,gender:string,image:string,id:string},
  Manager:{name:string,gender:string,image:string,id:string},
  Owner:{name:string,gender:string,image:string,id:string},
}
export interface AllLessonsInterFace {
id:number,
subjectId:string,
name:string,
description:string,
body:string,
createdAt:Date,
Subjects:{name:string,id:number},
teacher?:{name:string},
Teachers?:{name:string,id:number},
Assinments:[{name:string,id:string}],
comments:[{name:string,User:{gender:string},Teacher:{gender:string},Admin:{gender:string},AdminTeacher:{gender:string},Manager:{gender:string},Owner:{gender:string}}],
}
export interface AllSubjectsInterFace {
id:number,
name:string,
description:string,
Lessons:string[],
Teachers:string[],
Assinments:[{name:string,id:string}],
comments:[{name:string,User:{gender:string},Teacher:{gender:string},Admin:{gender:string},AdminTeacher:{gender:string},Manager:{gender:string},Owner:{gender:string}}],
}

export interface CreatAssinmentInterFace {
  name:string,
  description:string,
  subjectId:number,
  lessonId:number,
  teacherId:number,
  assinmentbody:{
  time:{
      hours:number,
      minutes:number,
      seconds:number
  } | null,
  questions:string[],
}
}
export interface CreatExamInterFace {
  title:string,
  fullDegree:number,
  subjectId:number,
  teacherId:number,
  Exambody:{
  time:{
      hours:number,
      minutes:number,
      seconds:number
  } | null,
  questions:string[],
}
}

export interface QuestionInbody {
  id:number,
  question:string,
  choase:string[],
  degree:string,
  answer:string,
  type:string

}


export interface UpdateGroupInterface {
  id:number,
  name:string,
  description:string,
  gender:string
}

export interface PostsInterface {
  id?: string;
  createdAt?: Date;
  title?: string | null;
  content?: string | null;
  body?: {src: string};
  author?: {name:string,image:string}
}
export interface CreatePostsInterface {
  id?: string;
  createdAt?: Date;
  title?: string | null;
  content?: string | null;
  body?:{src: string};
  author?: {id:number,name:string,image:string}
}
export interface CreateHadithInterface {
  id?: string;
  createdAt?: Date;
  title?: string | null;
  content?: string | null;
  body?:{src: string};
  author: {id:number,name:string,image:string}
}
export interface CreateLessonsInterface {
  name:string,
  description:string,
  subjectId:number,
  teacherId:number,
  body:{
    fileName:string[] ,
    linkVideo:string,
  }
}
export interface PrayerTime {
    date:{hijri:{month:{ar:string},weekday:{ar:string},day:number,year:string}},
    timings:{Fajr:string,Sunrise:string,Dhuhr:string,Asr:string,Maghrib:string,Isha:string,}
}

export interface UpdateLesson {
  id:number,
  name:string,
  description:string,
  subjectId:number,
  teacherId:number,
}

export interface CreateNewsInterface {
  id?:string
  content?:string,
  author?:{
    id:string,
    name:string,
    image:string,
  }
  createdAt?:Date
}

export interface UpdateNewsInterface {
  id:number
  content:string,
  author:{
    id?:string,
    name?:string,
    image?:string,
  }
}
export interface SectionInterface {
  id?:number,
  name?:string,
  description?:string,
  manager:{id:string,name:string},
  subjects:[{id:string,name:string}],
  createdAt:Date,
}
export interface UpdateSectionInterface {
  id:number,
  name:string,
  description:string,
  managerId:number
}
export interface Datainterface {
     id: number;
    jozz: number; 
    page: number; 
    sura_no: number; 
    sura_name_en: string; 
    sura_name_ar: string; 
    line_start: number; 
    line_end: number; 
    aya_no: number; 
    aya_text: string; 
    aya_text_emlaey: string; 
}
export interface permation {
  role: string | never,
  email: string | never
} 

export interface TafseerInterface {
  sura_no: number;
  aya_no: number;
  aya_tafseer: string;
}

export interface Chapter {
  id:number,
  title:string,
  description:string,
  search:string,
  author:string,
  publisher:string,
  year:number,
  audio_count:number,
  audio_type:string,
  url:string,
  image:string,
  sort:string,
  type:string,
  download:string,
  data: {id:number, name:string, url:string,sort:string}[]
}
