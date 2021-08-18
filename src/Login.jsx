import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null)

  const procesarDatos = (event) => {
      event.preventDefault()
      if(!email.trim()){
          setError("Ingrese un email")
          return
        }
        
        if(!pass.trim()){
            setError("Ingrese una contraseña")            
            return
        }
        if(pass.length < 6){
            setError("La contraseña debe tener un mínimo de 6 caracteres")
          return
      }
      setError(null)
  }

  return (
    <div className="mt-2">
      <h3 className="text-center">Registro de usuario</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
              {
                  error && (
                      <div className="alert alert-danger">{error}</div>
                  )
              }
            <input
              type="email"
              className="form-control"
              placeholder="Ingrese un email"
              onChange={(event)=>setEmail(event.target.value)}
              value={email}
              />

            <input
              type="password"
              className="form-control mt-2"
              placeholder="Ingrese una contraseña"
              onChange={e=>setPass(e.target.value)}
              value={pass}
            />
            <div className="d-grid gap-3 mt-4 ">
              <button className="btn btn-dark  col-12">Registrarse</button>
              <button className="btn btn-info btn-sm col-12">
                ¿Ya tienes cuenta?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
