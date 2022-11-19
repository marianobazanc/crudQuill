import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

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

          <ul className="d-flex gap-4 mb-0">
            <li><NavLink className="nav-link text-light" to="/Trabajos">Trabajos</NavLink></li>
            <li><NavLink className="nav-link text-light" to="/Cursos">Cursos</NavLink></li>
            <li><NavLink className="nav-link text-light" to="/Noticias">Noticias</NavLink></li>
            <li><NavLink className="nav-link text-light" to="/Datos">Datos</NavLink></li>
          </ul>
          
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
