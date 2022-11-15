import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../../components/LoginService";

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const user = await LoginService.login({
        email,
        password
      })
  
      window.sessionStorage.setItem(
        "ApiToken", user.data.token
      )
      window.sessionStorage.setItem(
        "ApiUser", user.data.name
      )
      setUser(user)
      setEmail("")
      setPassword("")
      setTimeout(() => {
        navigate("/inicio")
      }, 1000);
    } catch ({response}) {
      if(response !== 200){
        let errorMensaje = response.data.mensaje
        setError(errorMensaje)
        setTimeout(() => {
          setError(null)
        }, 5000);
      }
    }
  }
  return (
    <div className="row m-0 vh-100 justify-content-center align-items-center bg-dark">
      <div className="card col-lg-4 text-center">
        <h2 className="my-3 text-uppercase fw-bold">Iniciar Sesion</h2>
        <div className="card-body pt-0">
          <form className="form" onSubmit={handleSubmit} autoComplete="off">
            <input
              className="form-control my-1"
              type="text"
              placeholder="Email"
              value={email}
              onChange={({target}) => setEmail(target.value)}
            />
            <input
              className="form-control my-1"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
            <button className="btn btn-secondary my-2 form-control">
              Ingresar
            </button>
            {
              error && <p className="text-danger my-0">{error}</p>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
