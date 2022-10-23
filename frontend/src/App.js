import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Trabajos/Main";
import New from "./pages/Trabajos/New";
import Edit from "./pages/Trabajos/Edit";
import Login from "./pages/Usuarios/Login";
import Register from "./pages/Usuarios/Register";

import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
