import React, { useCallback, useState } from "react";
import { auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(true);

  //--------------------------------------------------------------------------------

  const procesarDatos = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Ingrese un email");
      return;
    }

    if (!pass.trim()) {
      setError("Ingrese una contraseña");
      return;
    }
    if (pass.length < 6) {
      setError("La contraseña debe tener un mínimo de 6 caracteres");
      return;
    }
    setError(null);
    if (esRegistro) {
      registrar();
    }
  };

  //--------------------------------------------------------------------------------

  const registrar = useCallback(async () => {
    try {
      const resp = await auth.createUserWithEmailAndPassword(email, pass);
      console.log("LOG try registrar", resp);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Debe introducir un email con un formato válido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("El email ya esta registrado");
      }
    }
  }, [email, pass]);

  //--------------------------------------------------------------------------------

  return (
    <div className="mt-2">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuarios" : "Login"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control"
              placeholder="Ingrese un email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />

            <input
              type="password"
              className="form-control mt-2"
              placeholder="Ingrese una contraseña"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <div className="d-grid gap-3 mt-4 ">
              <button className="btn btn-dark  col-12" type="submit">
                {esRegistro ? "Registrarse" : "Acceder"}
              </button>
              <button
                className="btn btn-info btn-sm col-12"
                onClick={() => setEsRegistro(!esRegistro)}
                type="button"
              >
                {esRegistro ? "¿Ya estas registrado" : "¿No tienes cuenta?"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
