import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import toolbar from "../../toolbar";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "quill/dist/quill.snow.css";

const Edit = () => {
  const [titulo, setTitle] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipo, setTipo] = useState("");
  const [user, setUser] = useState("");
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

  const handleTipo = (e) => {
    setTipo(e.target.value);
  };

  useEffect(() => {
    const loggedUserJson = window.sessionStorage.getItem("ApiToken");
    if (loggedUserJson) {
      const userLogged = loggedUserJson;
      setUser(userLogged);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(
        `http://localhost:4001/api/trabajos/${params.id}`
      );
      const trabajos = await res.json();
      setTitle(trabajos.titulo);
      setUbicacion(trabajos.ubicacion);
      setTipo(trabajos.tipo);
      quill.setContents(JSON.parse(trabajos.descripcion));
    };
    if (quill) {
      fetching();
    }
  }, [params.id, quill]);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`http://localhost:4001/api/cursos/${params.id}`);
      const trabajos = await res.json();
      setTitle(trabajos.titulo);
      setUbicacion(trabajos.ubicacion);
      setTipo(trabajos.tipo);
      quill.setContents(JSON.parse(trabajos.descripcion));
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
      descripcion: JSON.stringify(quill.getContents()),
      tipo,
    };
    if (tipo === "trabajo") {
      try {
        await fetch(`http://localhost:4001/api/trabajos/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: `${user}`,
          },
          body: JSON.stringify(data),
        });
        navigate("/inicio");
      } catch (error) {
        console.log(error);
      }
    } else if (tipo === "curso") {
      try {
        await fetch(`http://localhost:4001/api/cursos/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: `${user}`,
          },
          body: JSON.stringify(data),
        });
        navigate("/inicio");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="">
      <Navbar />
      <div className="container">
        <h1 className="text-center fw-bold text-uppercase fs-2 my-4">Editar</h1>
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
          <div className="d-inline-flex mt-1">
            <div className="text-danger me-1">*</div>
            <p className="text-muted p-0 m-0">
              Si desea cambiar el tipo de la publicacion (trabajo a curso o
              viceversa) recomendamos borrar la publicacion y generar una nueva
              con los datos correctos
            </p>
          </div>
          <button className="btn btn-success mt-2">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
