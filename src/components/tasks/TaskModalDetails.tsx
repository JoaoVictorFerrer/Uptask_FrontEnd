import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTaskByID, updateStatusTask } from "@/api/TasksApi";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/utils";
import { statusTranslations } from "@/locales/es";
import { TaskStatus } from "@/types/index";
import NotesPanel from "../notes/NotesPanel";

export default function TaskModalDetails() {
  const navigate = useNavigate();

  /** Obtiendo el Task ID del queryParams */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  /** Controlador del modal */
  const show = taskId ? true : false;

  /** Obteniendo el ID del porjecto con params */
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isError, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskByID({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  });

  /** mutacion para cambiar el estado de las tareas. */
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateStatusTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] }); // reordenar la tarea
      queryClient.invalidateQueries({ queryKey: ["task", taskId] }); // actualizar ele estado de la tarea cuando se ordena eliminando el cacheo previo con la nueva consulta
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;

    const data = {
      projectId,
      taskId,
      status,
    };
    mutate(data);
  };

  if (isError) {
    toast.error(error.message);
    return <Navigate to={`/projects/${projectId}`} />; // estoy retornando al cliente a la misma pagina si hay un error pero atraves de um componente no directamente atraves del hook useNavigate ya que m estaba generenado problemas en el render
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}{" "}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción: {data.description}
                    </p>
                    {data.completedBy.length > 0 && (
                      <>
                        <p className=" font-bold text-2xl text-slate-600 my-5">
                          Historial de cambios
                        </p>
                        <ul className="list-decimal">
                          {data.completedBy.map((activityLog) => (
                            <li key={activityLog._id}>
                              <span className="font-bold text-slate-600">
                                {statusTranslations[activityLog.status]}
                              </span>{" "}
                              por: {activityLog.user?.name}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado Actual:</label>
                      <select
                        className="w-full p-3 bg-white border border-gray-300 rounded-md"
                        defaultValue={data.status}
                        onChange={handleChange}
                      >
                        {Object.entries(statusTranslations).map(
                          ([key, value]) => (
                            <option value={key} key={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <NotesPanel notes = {data.notes} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
