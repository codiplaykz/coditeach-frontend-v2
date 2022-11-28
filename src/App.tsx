import React from 'react';
import './styles/main.scss'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Sidebar from "./layouts/Sidebar";
import ProjectsPage from "./pages/ProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import CreateProjectCover from "./features/Projects/components/CreateProjectCover";
import ProjectItemPage from "./features/Projects/components/ProjectItemPage";
import SchoolsPage from "./pages/SchoolsPage";
import ErrorPage from "./pages/ErrorPage";
import NetworkStatusBar from "./components/NetworkStatusBar";
import CreateSchoolCover from "./features/Schools/components/CreateSchoolCover";
import SchoolItemPage from "./features/Schools/components/SchoolItemPage";

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
              <Route path={'*'} element={<ErrorPage errorCode={404}/>}/>
              <Route path={'/500'} element={<ErrorPage errorCode={500}/>}/>
          </Routes>
      </div>
  );
}

export default App;
