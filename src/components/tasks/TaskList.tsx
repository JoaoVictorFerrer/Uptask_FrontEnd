import { Task } from "@/types/index";
import TaskCard from "./TaskCard";

type TasksListProp = {
  tasks: Task[];
};
export default function TaskList({ tasks }: TasksListProp) {
  type GroupedTasks = {
    [key: string]: Task[];
  };

  const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
  };

  /** esta es la traduccion tengo qeu espeficar la firma de la jey como del valor si no me tiraria un error ya que le estoy pidiendo que itere con un string sobre un objeto */
  const statusTranslations : {[key : string] : string} = {
    pending: 'Pendiente',
    onHold: 'En espera',
    inProgress: 'En Progreso',
    underReview: 'En Revision',
    completed: 'Completado',
  }

  const statusStyles : {[key : string] : string} = {
    pending: 'border-t-gray-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
  }


  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);


  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

        <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
            {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
                <h3 
                    className={`capitalize text-xl font-light border border-slate-300 bg-white border-t-8 p-3 ${statusStyles[status]}`}>
                        {statusTranslations[status]}</h3> {/* hago que itere en mi objeto con esta nomeclatura acciendo a los valores en funcion de cada key */}
                <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                    <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                    </li>
                ) : (
                    tasks.map((task) => <TaskCard key={task._id} task={task} />)
                )}
                </ul>
            </div>
            ))}
      </div>
    </>
  );
}
