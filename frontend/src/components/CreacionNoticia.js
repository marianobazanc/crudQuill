import swal from "@sweetalert/with-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreacionNoticia = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [user, setUser] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    img: ""
  });

  const fetching = async () => {
    let api = `http://localhost:4001/api/noticias/${params.id}`;
    const res = await fetch(api);
    const noticias = await res.json();
    setForm({
        titulo: noticias.titulo,
        descripcion: noticias.descripcion,
        img: noticias.img
    })
  };

  useEffect(() => {
    const loggedUserJson = window.sessionStorage.getItem("ApiToken");
    if (loggedUserJson) {
      const userLogged = loggedUserJson;
      setUser(userLogged);
      fetching()
    } else {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const datos = {
      titulo: e.target.titulo.value,
      descripcoin: e.target.descripcion.value,
      img: e.target.img.value,
      link: e.target.link.value
    }
    const data = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        img: form.img,
        link: form.link
    }
    if(datos.titulo === "" || datos.descripcion === "" || datos.img === "" || datos.link === ""){
      swal("Error", "Todos los campos son obligatorios", "error")
      return
    }
    try {
        if(params.id){
            await fetch(`http://localhost:4001/api/noticias/${params.id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authToken: `${user}`
                },
                body: JSON.stringify(data)
            })
            swal("Noticia actualizada correctamente", "", "success")

        }else{
            await fetch("http://localhost:4001/api/noticias",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authToken: `${user}`
                },
                body: JSON.stringify(data)
            })
            swal("Noticia creada correctamente", "", "success")
        }
        navigate("/Noticias");
    } catch (error) {
        swal("Error", "Ocurrio un error inesperado. Intente de nuevo o mas tarde", "warning")
    }
  };
  return (
    <div className="container col-9 ">
      <h2 className="text-center fw-bold text-uppercase my-3">
        {params.id ? "Editar noticia" : "Añade una nueva noticia"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          type="text"
          name="titulo"
          value={form.titulo}
          placeholder="Titulo de la noticia"
          onChange={handleChange}
        />
        <input
          className="form-control"
          type="text"
          value={form.img}
          name="img"
          placeholder="Link de la imagen"
          onChange={handleChange}
        />
        <input
          className="form-control mt-2"
          type="text"
          value={form.link}
          name="link"
          placeholder="Link de la noticia"
          onChange={handleChange}
        />
        <div className="mt-2">
          <label className="form-label my-0">Texto de la noticia</label>
          <textarea
            className="form-control"
            name="descripcion"
            type="text"
            onChange={handleChange}
            value={form.descripcion}
          />
        </div>
        <button className="btn btn-success form-control my-2">Enviar</button>
      </form>
    </div>
  );
};

export default CreacionNoticia;
