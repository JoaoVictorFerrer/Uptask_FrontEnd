import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, teamMembersSchema } from "../types";

type TeamApi = {
    formData: TeamMemberForm,
    projectId: Project['_id'],
    id: TeamMember['_id']
}

export async function findMemberByEmail({formData,projectId} : Pick<TeamApi,'formData' | 'projectId'> ) {

    try {
        const url = `projects/${projectId}/team/find`
         const {data} = await api.post(url,formData)
        return data

        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}

export async function addMemberToProject({id,projectId} : Pick<TeamApi, 'id' | 'projectId'> ) {

    try {
        const url = `projects/${projectId}/team`
         const {data} = await api.post<string>(url,{id})
        return data

        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}

export async function getProjectTeam(projectId : Project['_id'] ) {

    try {
            const url = `projects/${projectId}/team`
            const {data} = await api(url)
            const response = teamMembersSchema.safeParse(data)
            if(response.success){
                return response.data
            }
            
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}

export async function removeMemberToProject({idUser,projectId} : {idUser: TeamMember['_id'] , projectId:  Project['_id'] } ) {

    try {
        const url = `projects/${projectId}/team/${idUser}`
         const {data} = await api.delete<string>(url)
        return data

        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}