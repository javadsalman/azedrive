import axios from "axios";

// create axios instance for don't repeating base url and ensure set deafult middleware for authorization
const iaxios = axios.create({
    baseURL: 'http://127.0.0.1:8000',
})

export default iaxios;