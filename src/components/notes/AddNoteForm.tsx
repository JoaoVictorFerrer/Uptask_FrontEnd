import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createdNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function AddNoteForm() {
  const initialValues: NoteFormData = {
    content: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const params = useParams();
  const projectId = params.projectId!;
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const queryCliente = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createdNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
        toast.success(response);
        queryCliente.invalidateQueries({queryKey:['task',taskId]})
        reset();
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({
      projectId,
      taskId,
      formData,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear Nota
        </label>
      </div>

      <input
        type="text"
        id="content"
        placeholder="contenido de la nota"
        className="w-full p-3 border border-gray-300"
        {...register("content", {
          required: "El contenido de la nota es obligatorio",
        })}
      />
      {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
      <input
        type="submit"
        value="Crear Nota"
        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-bold cursor-pointer"
      />
    </form>
  );
}
