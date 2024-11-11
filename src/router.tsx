import { BrowserRouter,Routes,Route } from "react-router-dom";
import AppLayouts from "@/layouts/AppLayouts";
import DashBoardView from "@/views/DashBoardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";



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
        </Routes>
      </BrowserRouter>
    );
    
}



