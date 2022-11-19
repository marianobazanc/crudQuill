import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Listado from "../../components/Listado";

const Cursos = () => {
  const navigate = useNavigate();
  const [dato, setDato] = useState("");

  useEffect(() => {
    const loggedUserJson = window.sessionStorage.getItem("ApiUser");
    if (loggedUserJson) {
      const userLogged = loggedUserJson;
      setDato(userLogged);
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="text-center my-4">
        <Link to="/new">
          <h2 className="btn btn-dark text-white my-0 mx-2">
            <i className="fa-solid fa-plus"></i> Nuevo Curso
          </h2>
        </Link>
      </div>
      <hr />
      <div className="d-flex justify-content-center mt-4">
        <div className="col-10">
          <Listado
            name="cursos"
            caracteristica="cursos"
            link="http://localhost:4001/api/cursos"
          />
        </div>
      </div>
    </div>
  );
};

export default Cursos;
