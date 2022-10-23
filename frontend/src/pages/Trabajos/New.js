import { useState } from "react";
import { useQuill } from "react-quilljs";
import toolbar from "../../toolbar";
import { useNavigate } from "react-router-dom";
import "quill/dist/quill.snow.css";

function New() {
  const [titulo, setTitle] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [caracteristica, setCaracteristica] = useState("")
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar,
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUbicacion = (e) => {
    setUbicacion(e.target.value);
  };

  const handleCaracteristica = (e) => {
    setCaracteristica(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      titulo,
      ubicacion,
      caracteristica,
      informacion: JSON.stringify(quill.getContents()),
    };

    try {
      if(caracteristica == 'curso'){
        await fetch("http://localhost:4001/api/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      navigate("/");
      }else if(caracteristica == 'trabajo'){
        await fetch("http://localhost:4001/api/trabajos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      navigate("/");
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container col-lg-9">
      <h1 className="text-center fw-bold text-uppercase fs-2 my-4">
        Nuevo trabajo
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-7">
            <input
              className="my-2 form-control"
              placeholder="Insertar titulo "
              type="text"
              id="value"
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
              value={ubicacion}
              onChange={handleUbicacion}
            />
          </div>
        </div>
        <div className="editor">
          <div ref={quillRef}></div>
        </div>
        <select className="form-select mt-2" id="value" value={caracteristica} onChange={handleCaracteristica} aria-label="Default select example">
          <option selected>Selecciona la opcion correcta</option>
          <option value="trabajo">Trabajo</option>
          <option value="curso">Curso</option>
        </select>
        <button className="btn btn-success mt-2 form-control">Enviar</button>
      </form>
    </div>
  );
}

export default New;
