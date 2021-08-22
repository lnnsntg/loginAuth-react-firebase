import React, { useCallback, useState } from "react";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  //------------------------------------------------------------------

  const procesarDatos = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Ingrese un email");
      return;
    }
    setError(null);
    recuperarPass();
  };

  //------------------------------------------------------------------

  const recuperarPass = useCallback(async () => {
    try {

    } catch (error) {
        console.log("clg en reset recuperar datos",error);
      setError(error.message);
    }
  }, []);

  //------------------------------------------------------------------

  return (
    <div className="mt-2">
      <h3 className="text-center">Recuperar contraseña</h3>
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
            <div className="d-grid gap-3 mt-4 ">
              <button className="btn btn-dark btn-lg d-block" type="submit">
                Reiniciar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
