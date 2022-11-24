import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import toolbar from "../../toolbar";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react"
import "quill/dist/quill.snow.css";

function New() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [titulo, setTitle] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipo, setTipo] = useState("");
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar,
    },
  });

  useEffect(() => {
    const loggedUserJson = window.sessionStorage.getItem("ApiToken");
    if (loggedUserJson) {
      const userLogged = loggedUserJson;
      setUser(userLogged);
    }else{
      navigate("/login")
    }
  }, []);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUbicacion = (e) => {
    setUbicacion(e.target.value);
  };

  const handleTipo = (e) => {
    setTipo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      titulo: e.target.titulo.value,
      ubicacion: e.target.ubicacion.value,
      opciones: e.target.opciones.value
    }

    if(datos.titulo === "" || datos.ubicacion === ""){
      swal("Error", "Todos los campos son obligatorios. Por favor rellenelos", "error")
    }

    const data = {
      titulo,
      ubicacion,
      descripcion: JSON.stringify(quill.getContents()),
      tipo,
    };

    try {
      if (tipo === "curso") {
        await fetch("http://localhost:4001/api/cursos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: `${user}`,
          },
          body: JSON.stringify(data),
        }).then(() => {
          swal("Curso creado con exito", "", "success")
          navigate("/Cursos");
        });
      } else if (tipo === "trabajo") {
        await fetch("http://localhost:4001/api/trabajos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: `${user}`,
          },
          body: JSON.stringify(data),
        }).then(() => {
          swal("Trabajo creado con exito", "", "success")
          navigate("/Trabajos");
        });
      }
    } catch (error) {
      swal("Error", `Algo ha sucedido: ${error}`, "error")
    }
  };
  return (
    <>
      <Navbar />
      <div className="container col-lg-11">
        <h1 className="text-center fw-bold text-uppercase fs-2 my-4">crear</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-7">
              <input
                className="my-2 form-control"
                placeholder="Insertar titulo "
                type="text"
                id="value"
                name="titulo"
                value={titulo}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                className="my-2 form-control"
                placeholder="Insertar ubicacion"
                type="text"
                id="value"
                name="ubicacion"
                value={ubicacion}
                onChange={handleUbicacion}
              />
            </div>
          </div>
          <div className="editor">
            <div ref={quillRef}></div>
          </div>
          <select
            className="form-select mt-2"
            id="value"
            value={tipo}
            name="opciones"
            onChange={handleTipo}
            aria-label="Default select example"
          >
            <option selected>Selecciona la opcion correcta</option>
            <option value="trabajo">Trabajo</option>
            <option value="curso">Curso</option>
          </select>
          <button className="btn btn-success mt-2 form-control">Enviar</button>
        </form>
      </div>
    </>
  );
}

export default New;
