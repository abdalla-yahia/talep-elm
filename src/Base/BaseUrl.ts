
import axios from "axios";
// export const baseURL = 'http://localhost:3000'
export const baseURL = 'https://talep-elm.vercel.app'
// export const baseURL = 'https://khaled-mansour.vercel.app'
// export const baseURL = 'https://islamic-courses.vercel.app'
// export const baseURL = 'https://islamic-courses-4bbc8.web.app/'
const BaseUrl = axios.create({baseURL})

export default BaseUrl;