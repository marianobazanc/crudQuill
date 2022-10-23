import React from "react";

const Register = () => {
  return (
    <div className="row m-0 vh-100 justify-content-center align-items-center bg-dark">
      <div className="card col-lg-4 text-center">
        <h2 className="my-3">Iniciar Sesion</h2>
        <div className="card-body pt-0">
          <form className="form">
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
            <button className="btn btn-secondary my-2 form-control">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
