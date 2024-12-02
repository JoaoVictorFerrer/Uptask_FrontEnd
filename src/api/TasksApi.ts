import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "../types";


type TaskApi ={
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id']
}

export async function createTask({formData,projectId}:Pick<TaskApi,'formData'|'projectId'>) {
    
try {
    const url = `projects/${projectId}/tasks`
    const data = await api.post<string>(url,formData)
    return data.data

} catch (error) {
    if (isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
    }
}
}

export async function getTaskByID({projectId,taskId} : Pick<TaskApi,'projectId' | 'taskId' >) {

    try {  
        const url = `/projects/${projectId}/tasks/${taskId}`
        const data = await api(url)
        return data.data

    } catch (error) {
         if (isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
    }
    }
    
}

export async function updateTask({projectId,taskId,formData}: Pick<TaskApi,'projectId' | 'taskId' | 'formData'  >){
    console.log('esto es foordata',formData)
    try {  
        const url = `/projects/${projectId}/tasks/${taskId}`
        const data = await api.put<string>(url,formData)
        return data.data

    } catch (error) {
         if (isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
    }
    }
    
}

export async function deleteTask({projectId,taskId} : Pick<TaskApi,'projectId' | 'taskId' >) {

    try {  
        const url = `/projects/${projectId}/tasks/${taskId}`
        const data = await api.delete<string>(url)
        return data.data

    } catch (error) {
         if (isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
    }
    }
    
}