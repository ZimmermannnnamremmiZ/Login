import axios from 'axios';
import API_ENV from '../../config/api.config';
import interceptors from './interceptors'

// Creating an instance (instance с кастомными настройками)
const instance = axios.create({
    // сделали базовый url, теперь в каждый сервис не нужно импортировать конфиг и подставлять адрес сервера
    baseURL: API_ENV.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

interceptors(instance);

export default instance;