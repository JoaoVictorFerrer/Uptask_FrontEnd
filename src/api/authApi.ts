import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";
import api from "@/lib/axios";



export async function createAccount (formData : UserRegistrationForm){
    try {
        const url = 'auth//create-account'
        const {data} = await api.post<string>(url,formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function confirmAccount (formData : ConfirmToken){
    try {
        const url = 'auth/confirm-account'
        const {data} = await api.post<string>(url,formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function RequestConfirmationCode (formData : RequestConfirmationCodeForm){
    try {
        const url = 'auth/request-code'
        const {data} = await api.post<string>(url,formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function loginUser (formData : UserLoginForm){
    try {
        const url = 'auth/login'
        const {data} = await api.post<string>(url,formData)
        localStorage.setItem('tokenJWT',data)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function ForgotPassword (formData : ForgotPasswordForm){
    try {
        const url = 'auth/forgot-password'
        const {data} = await api.post<string>(url,formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

    
}

export async function valideteToken (formData : ConfirmToken){
    try {
        const url = 'auth/validate-token'
        const {data} = await api.post<string>(url,formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

    
}
export async function updatePasswordWithToken ({formData , token } : {formData: NewPasswordForm,token : ConfirmToken['token']}){
    try {
        const url = `auth/update-password/${token}`
        const {data} = await api.post<string>(url,formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

    
}

export async function getUser() {
    try {
       
        const {data} =  await api('/auth/user') // lo puedo tipar con generic en api<User>
        const response = userSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}