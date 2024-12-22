import { getProjectById } from "@/api/projectsApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const projectId = params.projectId!; // si typeScript indentificara como una posbilidad de ser undefined este paramentro y sabemos que no sera podemos obligarlo poien do params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: 1, // por defecto intenta realizar 3 veces la conexion ante de tirar el error del back.
  });

  if (isLoading) return "cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

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
        </nav>
        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
