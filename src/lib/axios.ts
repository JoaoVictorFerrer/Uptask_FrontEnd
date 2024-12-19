/** Creando el Cliente de axios */

import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


//? Dos tipos de interceptor 1 request: se ejecuta antes de realizar la peticion 2: response se ejecuta despues de la peticion http.

//utlizo un intercepto de axios para estar enviado el token en la acciones encesaria para no tenner que esta repitiendo en cada peticion el token en el header
api.interceptors.request.use( config => {
    const token = localStorage.getItem('tokenJWT')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api