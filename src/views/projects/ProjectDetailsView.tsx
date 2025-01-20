import { getFullDetailsProject } from "@/api/projectsApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/userAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function ProjectDetailsView() {
  const { data: user, isLoading: isLoadingAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const projectId = params.projectId!; // si typeScript indentificara como una posbilidad de ser undefined este paramentro y sabemos que no sera podemos obligarlo poien do params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getFullDetailsProject(projectId),
    retry: 1, // por defecto intenta realizar 3 veces la conexion ante de tirar el error del back.
  });

  const canEdit = useMemo(()=> user?._id === data?.manager ,[user,data])
  
  if (isLoading && isLoadingAuth)  return "cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data && user?._id)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        { isManager(data.manager,user._id) && 
            <nav className="my-5 flex gap-3 ">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() =>
                navigate(location.pathname + "?newTask=true")
              } /*  puedo realizar solo  () => navigate('?newTask=true')*/
            >
              Agregar tareas
            </button>
            <Link
              to={"team"}
              className=" bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav> }
    
        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
