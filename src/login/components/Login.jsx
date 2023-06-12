import React, { useState } from 'react';
import { NavBarLogin } from './NavBarLogin';
import { FooterLogin } from './FooterLogin';
import Swal from "sweetalert2";
import { apiLogin } from "../api/apiLogin";
import * as yup from "yup";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(event) => {
    event.preventDefault();

    try {
      await loginSchema.validate({ username, password }, { abortEarly: false });

      const result = await apiLogin(username, password);
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Ha iniciado sesión con éxito!",
          confirmButtonText: "Ok",
        }).then((r) => {
          if (result) {
            if (r.isConfirmed) {
              const [header, payload, signature] = result.split(".");
              const decodedPayload = JSON.parse(atob(payload));
              const rolUsuario = decodedPayload.rol;
              if (rolUsuario === "ROL_ADMINISTRATIVO") {
                window.location.href = "/listaCompras";
              } else {
                window.location.href = "/principalCliente";
              }
            }
          }
        });
      }
    } catch (error) {
      let mensaje = "Por favor, complete todos los campos.";

      if (error.name === "ValidationError") {
        mensaje = error.errors[0];
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje,
      });
    }
  };

  const loginSchema = yup.object().shape({
    username: yup
      .string().required("Ingrese su usuario."),
    password: yup.string().required("Ingrese su contraseña."),
  });

  return (
    <>
      <NavBarLogin />
      <div className="login-container">
        <div className="logo-container vertical-center">
          <img src="https://bancodebosques.org/wp-content/uploads/2021/09/bdb-logo.svg" alt="" />
        </div>
        <div className="vertical-center text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <form onSubmit={handleLogin}>
                  <img className="mb-4" src="https://bancodebosques.org/wp-content/uploads/2021/09/bdb-logo.svg" width="200" alt="" />
                  <h1 className="h3 mb-3 fw-normal">Inicio de sesión</h1>

                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Nickname"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Nombre de Usuario</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Contraseña</label>
                  </div>

                  <button className="w-100 btn btn-lg btn-success" type="sumbit" >
                    Entrar
                  </button>
                  <p className="mt-5 mb-3 text-muted">
                    <a id="forgot-password" href="#">
                      ¿Aún no tienes una cuenta?
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
