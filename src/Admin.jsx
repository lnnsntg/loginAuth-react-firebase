import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "./firebase";
import Tareas from "./Tareas";

const Admin = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe usuario");
      setUser(auth.currentUser);
    } else {
      console.log("No existe usuario");
      props.history.push("/login");
    }
  }, [user, props.history]);

  return (
    <div>      
      {
      user && (<Tareas user={user}></Tareas>  )
      }
    </div>
  );
};

export default withRouter(Admin);
