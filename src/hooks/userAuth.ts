import { getUser } from "@/api/authApi"
import { useQuery } from "@tanstack/react-query"



export const useAuth = () =>{
    const {data, isError,isLoading} = useQuery({
        queryKey:['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false //evitar el default de movimientos entre pestanas para que haga otro fetch 
    })

    return{data, isError,isLoading}
}