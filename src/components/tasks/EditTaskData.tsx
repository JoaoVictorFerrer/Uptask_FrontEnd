import { getTaskByID } from "@/api/TasksApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

    /** ID del projecto */
    const params = useParams()
    const projectId = params.projectId!
    

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const editTaskId = queryParams.get('editTaskId')!
    
    const {data,isError} = useQuery({
        queryKey: ['task',editTaskId],
        queryFn: ()=> getTaskByID({projectId,editTaskId}),
        enabled: !!editTaskId, // el enable solo ejecutara sia es true editTaskId conviertiendolo en boolean con !!
        retry: false 
    })
    if (isError) return <Navigate to= {'/404'}/> // manejando error de modificar la url manualmente
    if(data) return <EditTaskModal data = {data} editTaskId = {editTaskId} />
}