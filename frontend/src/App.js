import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Trabajos/Main";
import New from "./pages/Trabajos/New";
import Edit from "./pages/Trabajos/Edit";
import Login from "./pages/Usuarios/Login";
import Register from "./pages/Usuarios/Register";
import Datos from "./pages/Informacion/Datos";
import EditNoticia from "./pages/Noticias/EditNoticia.js";
import Create from "./pages/Noticias/Create";
import Cursos from "./pages/Cursos/Cursos";
import Noticias from "./pages/Noticias/Noticias"
import Inicio from "./pages/Inicio/Inicio";

import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Trabajos" element={<Main />} />
          <Route path="/Datos" element={<Datos />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/Noticias" element={<Noticias />} />
          <Route path="/New" element={<New />} />
          <Route path="/Edit/:id" element={<Edit />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Noticia/edit/:id" element={<EditNoticia />} />
          <Route path="/Noticia/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
