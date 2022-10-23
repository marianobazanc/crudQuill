import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import toolbar from "../../toolbar";
import { useNavigate, useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";

const Edit = () => {
  const [titulo, setTitle] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [caracteristica, setCaracteristica] = useState("")
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar,
    },
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUbicacion = (e) => {
    setUbicacion(e.target.value);
  };

  const handleCaracteristica = (e) => {
    setCaracteristica(e.target.value)
  }

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(
        `http://localhost:4001/api/trabajos/${params.id}`
      );
      const trabajos = await res.json();
      quill.setContents(JSON.parse(trabajos.informacion));
      setTitle(trabajos.titulo);
      setUbicacion(trabajos.ubicacion);
    };
    if (quill) {
      fetching();
    }
  }, [params.id, quill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      titulo,
      ubicacion,
      caracteristica,
      informacion: JSON.stringify(quill.getContents()),
    };

    try {
      await fetch(`http://localhost:4001/api/trabajos/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center fw-bold text-uppercase fs-2 my-4">
        Editar trabajo
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
        <button className="btn btn-success mt-2">Enviar</button>
      </form>
    </div>
  );
};

export default Edit;
