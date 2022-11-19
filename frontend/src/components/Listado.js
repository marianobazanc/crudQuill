import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Listado = ({ name, link }) => {
  const [trabajos, setTrabajos] = useState([]);
  const [dato, setDato] = useState("");
  useEffect(() => {
    const loggedUserJson = window.sessionStorage.getItem("ApiToken");
    if (loggedUserJson) {
      const userLogged = loggedUserJson;
      setDato(userLogged);
    }
    fetching();
  }, []);

  const fetching = async () => {
    let api = `${link}`;
    const res = await fetch(api);
    const trabajos = await res.json();
    setTrabajos(trabajos);
  };

  const borrarTrabajo = async (id) => {
    await fetch(`${link}/${id}`, {
      method: "DELETE",
      headers: {
        authToken: `${dato}`,
      },
    });
    fetching();
  };
  return (
    <article className="">
      <h1 className="text-center text-uppercase fw-bold fs-2">{name}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col" className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {trabajos.map((trabajo) => {
            return (
              <tr key={trabajo._id}>
                <td scope="row">{trabajo.titulo}</td>
                <td className="text-center">
                  <Link
                    className="btn"
                    to={
                      trabajo.tipo === "noticia"
                        ? `/noticia/edit/${trabajo._id}`
                        : `/edit/${trabajo._id}`
                    }
                  >
                    <i className="fa-solid fa-pencil text-primary"></i>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => borrarTrabajo(trabajo._id)}
                  >
                    <i className="fa-solid fa-trash text-danger"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};

export default Listado;
