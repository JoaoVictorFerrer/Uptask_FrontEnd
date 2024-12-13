import { BrowserRouter,Routes,Route } from "react-router-dom";
import AppLayouts from "@/layouts/AppLayouts";
import DashBoardView from "@/views/DashBoardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AutLayout from "./layouts/AutLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";


export default function Router() {
    
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayouts />}>
            <Route path="/" element={<DashBoardView />} index />
            <Route path="/projects/create" element={<CreateProjectView />} />
            <Route path="/projects/:projectId/edit" element={<EditProjectView/>} />
            <Route path="/projects/:projectId/" element={<ProjectDetailsView/>} />
          </Route>
          <Route element={<AutLayout/>}>
            <Route path="auth/login" element={<LoginView/>}/>
            <Route path="auth/register" element={<RegisterView/>}/>
            <Route path="auth/confirm-account" element={<ConfirmAccountView/>}/>
            <Route path="auth/request-code" element={<RequestNewCodeView/>}/>
            <Route path="auth/forgot-password" element={<ForgotPasswordView/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
}



