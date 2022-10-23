import React from "react";
import Listado from "../../components/Listado";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="container">
      <div className="text-center my-4">
        <Link to="/new">
          <h2 className="btn btn-info text-white my-0">
            <i className="fa-solid fa-plus"></i> Nuevo Trabajo/Curso
          </h2>
        </Link>
      </div>
      <hr />
      <div className="d-lg-flex">
        <Listado name="trabajos" caracteristica="trabajos" link="http://localhost:4001/api/trabajos" />
        <Listado name="cursos" caracteristica="cursos" link="http://localhost:4001/api/cursos"/>
      </div>
    </div>
  );
};

export default Main;
