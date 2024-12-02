import api from "@/lib/axios";
import { dasboardProjectSchema, Project, ProjectFormData } from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData : ProjectFormData) {
        try {
            const {data} = await api.post('/projects',formData)
           return data
        } catch (error) {

            if(isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)

            }
        }
}
export async function getProjects() {
    try {
            const {data} = await api('/projects')
            const response = dasboardProjectSchema.safeParse(data)
       if(response.success){
        return response.data
       }
    } catch (error) {

        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)

        }
    }
}

export async function getProjectById(id : Project ['_id']) {
    try {
        const {data} = await api(`/projects/${id}`)
        return data

     }catch (error) {

        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)

        }
    }
}

type ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}
 
export async function updateProject({formData,projectId} : ProjectApiType) {
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`,formData) // no todo requiere la validaddion por zod en este caso estoy priorizando solo las peticones get lo demas estou realizaon via generic
        // console.log(data)
        return data
        

     }catch (error) {

        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)

        }
    }
}

export async function deleteProject(id : Project ['_id']) {
    try {
        const {data} = await api.delete<string>(`/projects/${id}`)
        return data

     }catch (error) {

        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)

        }
    }
}