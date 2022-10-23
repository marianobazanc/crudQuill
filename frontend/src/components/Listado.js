import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Listado = ({ name, link }) => {
  const [trabajos, setTrabajos] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      let api = `${link}`;
      const res = await fetch(`${api}`);
      const trabajos = await res.json();
      setTrabajos(trabajos);
    };
    fetching();
  }, [trabajos]);

  const borrarTrabajo = async (id) => {
    await fetch(`${link}/${id}`, {
      method: "DELETE",
    });
  };
  return (
      <article className="col-lg-6 me-2">
        <h1 className="text-center text-uppercase fw-bold fs-2">{name}</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col" className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trabajos.map((trabajo) => {
              return (
                <tr key={trabajo._id}>
                  <td scope="row">{trabajo.titulo}</td>
                  <td className="text-center">
                    <Link className="btn" to={`/edit/${trabajo._id}`}>
                      <i className="fa-solid fa-pencil"></i>
                    </Link>
                    <button className="btn" onClick={() => borrarTrabajo(trabajo._id)}>
                      <i className="fa-solid fa-trash"></i>
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
