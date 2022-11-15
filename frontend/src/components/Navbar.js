import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dato, setDato] = useState("");

  useEffect(() => {
    const loggedUserJson = window.sessionStorage.getItem("ApiUser");
    if (loggedUserJson) {
      const userLogged = loggedUserJson;
      setDato(userLogged);
    }
  }, []);

  const handleSession = () => {
    window.sessionStorage.removeItem("ApiToken");
    window.sessionStorage.removeItem("ApiUser");
    setDato("");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <nav className="navbar navbar-dark bg-dark ">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/inicio">
            RcyasociadosAPI
          </Link>
          <Link className="nav-link text-light ms-2" to="/Datos">Datos</Link>
        </div>
        <div className="d-flex align-items-center text-light">
          <p className="m-0 text-uppercase">{dato && `${dato}`}</p>
          <button className="btn text-light" onClick={handleSession}>
            Cerrar sesion
          </button>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
