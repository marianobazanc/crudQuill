import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react"

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
    swal({
      title:"¿Borrar?",
      text:"¿Estas seguro que deseas eliminar?",
      icon:"warning",
      buttons:true,
      dangerMode:true,
      })
      .then(async(willDelete) => {
        if(willDelete){
          await fetch(`${link}/${id}`, {
            method: "DELETE",
            headers: {
              authToken: `${dato}`,
            },
          }).then(() => {swal("Eliminado con exito", "", "success")});
          fetching();
        }else{
          swal("No se ha eliminado ningun archivo")
        }
      })
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
