import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/projectsApi";
import EditProjectForm from "@/components/projects/EditProjectForm";


export default function EditProjectView() {

    const params = useParams()
    const projectId = params.projectId! // si typeScript indentificara como una posbilidad de ser undefined este paramentro y sabemos que no sera podemos obligarlo poien do params.projectId!
    
    const { data,isLoading,isError } = useQuery({
        queryKey: ["editProject",projectId],
        queryFn: () => getProjectById(projectId),
        retry: 1 // por defecto intenta realizar 3 veces la conexion ante de tirar el error del back. 
      });

      if(isLoading) return 'cargando...'
      if(isError) return <Navigate  to='/404'/>
      if(data) return <EditProjectForm data = {data} projectId={projectId}/>
}