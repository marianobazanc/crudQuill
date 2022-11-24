import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import Navbar from "../../components/Navbar"

const Inicio = () => {
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
    <div>
        <Navbar />
        <div className="container">
            <h2 className='my-4 fw-bold'>Bienvenido a la API de RcyAsociados</h2>
        </div>
    </div>
  )
}

export default Inicio