import axios from "axios";


const iaxios = axios.create({
    baseURL: 'http://127.0.0.1:8000',
})

export default iaxios;