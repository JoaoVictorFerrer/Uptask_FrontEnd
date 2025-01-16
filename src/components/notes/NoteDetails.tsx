
import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/userAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailsProps = {
  note: Note;
};

export default function NoteDetails({ note }: NoteDetailsProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => note.createdBy._id === data?._id, [data]);

    const params = useParams();
    const projectId = params.projectId!;
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

const queryClient = useQueryClient()
const {mutate} = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (response) => {
        toast.success(response)
        queryClient.invalidateQueries({queryKey:['task',taskId]})

    }
})

const handleDelete = () =>{
    const noteId = note._id
    mutate({projectId,taskId,noteId})
}

  if (isLoading) return "Cargando..";
  return (
    <div className=" P-3 flex justify-between items-center">
      <div>
        <p>{note.content}</p>
        <p className="text-xs text-slate-500 gap-2">
          Por:
          <span className="font-bold ml-1 text-sm">{note.createdBy.name}</span>{" "}
          {formatDate(note.createdAt)}
        </p>
      </div>
      {canDelete && (
        <button onClick={handleDelete}  type="button" className="text-xs text-white p-2 bg-red-400 hover:bg-red-500 rounded-lg transition-colors">
          Eliminar
        </button>
      )}
    </div>
  );
}
