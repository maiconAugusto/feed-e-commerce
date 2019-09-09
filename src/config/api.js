import axios from 'axios'

const token =  JSON.parse(localStorage.getItem('user'))
const api = axios.create({
    baseURL:'http://localhost:8000',
    headers:{
        Authorization:`Bearer ${token.token}`
    }
})
export default api
