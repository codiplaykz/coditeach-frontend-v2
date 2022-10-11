import React from 'react';
import './styles/main.scss'
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/login"} element={<>Test</>}/>
        </Routes>
    </div>
  );
}

export default App;
