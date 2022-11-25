import React from 'react';
import './styles/main.scss'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import ProjectsPage from "./pages/ProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import CreateProjectCover from "./components/CreateProjectCover";
import ProjectItemPage from "./components/ProjectItemPage";
import SchoolsPage from "./pages/SchoolsPage";
import ServerSideError from "./pages/ServerSideError";
import NetworkStatusBar from "./components/NetworkStatusBar";
import CreateSchoolCover from "./components/CreateSchoolCover";
import SchoolItemPage from "./components/SchoolItemPage";

function App() {
  return (
      <div className="App">
          {<NetworkStatusBar/>}
          <Routes>
              <Route path={"/login"} element={<LoginPage/>}/>
              <Route path={"/"} element={<ProtectedRoute><Sidebar/></ProtectedRoute>}>
                  <Route index element={<HomePage/>}/>
                  <Route path={'projects'} element={<ProjectsPage/>}>
                      <Route index element={<CreateProjectCover/>}/>
                  </Route>
                  <Route path={'projects/:projectId'} element={<ProjectsPage/>}>
                      <Route index element={<ProjectItemPage/>}/>
                  </Route>
                  <Route path={'create-project'} element={<CreateProjectPage/>}/>
                  <Route path={'schools'} element={<SchoolsPage/>}>
                      <Route index element={<CreateSchoolCover/>}/>
                  </Route>
                  <Route path={'schools/:schoolId'} element={<SchoolsPage/>}>
                      <Route index element={<SchoolItemPage/>}/>
                  </Route>

              </Route>
              <Route path={'*'} element={<>Not found</>}/>
              <Route path={'/500'} element={<ServerSideError/>}/>
          </Routes>
      </div>
  );
}

export default App;
