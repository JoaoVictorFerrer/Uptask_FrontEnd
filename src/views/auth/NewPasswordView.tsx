import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";

export default function NewPasswordView() {
    const [token, setToken] = useState('')
    const [isvalidToken,setIsvalidToken ] = useState(false)

  return (
    <>
    { !isvalidToken ? <NewPasswordToken token={token} setToken={setToken} setIsvalidToken={setIsvalidToken}/> : <NewPasswordForm token ={token}/>}
    </>
  );
}
 