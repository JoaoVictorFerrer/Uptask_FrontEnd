import { Link } from "react-router-dom";

export default function NotFound() {
  return (
   <>
        <h1 className="font-black text-center text-4xl text-white"> Pagina no encontrada</h1>
        <p className="text-white text-center mt-6">
            Tal vez quieras volver a {' '}
            <Link className="text-fuchsia-500" to={"/"}>Proyectos</Link>
        </p>
   </>
  )
}
