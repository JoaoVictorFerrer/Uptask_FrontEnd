import { BrowserRouter,Routes,Route } from "react-router-dom";
import AppLayouts from "@/layouts/AppLayouts";
import DashBoardView from "@/views/DashBoardView";
import CreateProjectView from "./views/projects/CreateProjectView";



export default function Router() {
    
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayouts />}>
            <Route path="/" element={<DashBoardView />} index />
            <Route path="/projects/create" element={<CreateProjectView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
}



