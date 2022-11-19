import React, { useState, useEffect } from "react";
import Listado from "../../components/Listado";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
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
    <>
      <Navbar />
      <div className="container">
        <div className="text-center my-4">
          <Link to="/new">
            <h2 className="btn btn-dark text-white my-0 mx-2">
              <i className="fa-solid fa-plus"></i> Nuevo Trabajo
            </h2>
          </Link>
        </div>
        <hr />
            <Listado
              name="trabajos"
              caracteristica="trabajos"
              link="http://localhost:4001/api/trabajos"
            />
      </div>
    </>
  );
};

export default Main;
