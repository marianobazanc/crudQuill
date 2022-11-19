import React from "react";

const Register = () => {
  return (
    <div className="row m-0 vh-100 justify-content-center align-items-center bg-dark">
      <div className="card col-lg-4 text-center">
        <h2 className="my-3">Añadir usuario</h2>
        <div className="card-body pt-0">
          <form className="form">
            <input className="form-control" type="text" placeholder="Usuario" />
            <input
              className="form-control my-1"
              type="text"
              placeholder="Email"
            />
            <input
              className="form-control my-1"
              type="password"
              placeholder="Contraseña"
            />
            <select className="form-select" aria-label="Default select example">
              <option selected>Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="usuario">Usuario</option>
            </select>
            <button className="btn btn-secondary my-2 form-control">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
