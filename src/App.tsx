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

function App() {
  return (
      <div className="App">
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
              </Route>
          </Routes>
      </div>
  );
}

export default App;
