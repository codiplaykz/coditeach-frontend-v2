import React from 'react';
import './styles/main.scss'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"/"} element={
                <ProtectedRoute>
                    <Sidebar/>
                    <HomePage/>
                </ProtectedRoute>
            }/>
        </Routes>
    </div>
  );
}

export default App;
