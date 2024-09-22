import ProjectForm from "@/components/projects/ProjectsForm";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/projectsApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {
    const navigate = useNavigate()

     const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
     }
    const {register,handleSubmit,formState:{errors}} = useForm({defaultValues:initialValues})
    
    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error) =>{
           toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            navigate('/')
        }
    })
    
    const handleForm = (data : ProjectFormData) => mutation.mutate(data) 
    
        /**
         * la informacion del form lo capta mutate y no la funcion createdProject 
         *  si utilizo solo mutate no hace falta establecer async ya que esta embebido por mutate de Rquery
         * puedo aplicar destruccturing en mutate para simplificacion de codigo
         */

      


  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Rellena el formulario para crear un nuevo Proyecto.
                </p>

                <nav className="my-5">
                    <Link
                    className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    to={"/"}
                    >
                    Volver a Proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate // para que que no ejcute la validacion de html5
                >

                    <ProjectForm 
                        register= {register}
                        errors = {errors}
                    />
                    <input
                    type="submit"
                    value="Crear Proyecto"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
      </div>
    </>
  );
}
