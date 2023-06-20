import React, { useState } from 'react';
import { NavBarLogin } from './NavBarLogin';
import { FooterLogin } from './FooterLogin';
import Swal from "sweetalert2";
import { apiLogin } from "../api/apiLogin";
import * as yup from "yup";
import { Button, Form, Modal } from 'react-bootstrap';
import emailjs from "emailjs-com";
import emailConfig from "../../Principal/components/emailHelper/emailConfig";
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

// CORREO PARA CUENTA:
const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefono: "",
    DPI: "",
    ingresos: "",
    trabajo: "",
  });
  console.log(formData);
  const [selectedTitle, setSelectedTitle] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(formData);
    setFormData({
      name: "",
      email: "",
      telefono: "",
      DPI: "",
      ingresos: "",
      trabajo: "",
    });
    setShowModal(false);
  };

  const sendEmail = (formData) => {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      telefono: formData.telefono,
      DPI: formData.DPI,
      ingresos: formData.ingresos,
      trabajo: formData.trabajo,
      to_email: "dquinonez-2021045@kinal.edu.gt", // Dirección de correo electrónico de destino
    };
console.log(templateParams);
    emailjs
      .send(
        emailConfig.serviceID,
        emailConfig.templateID,
        templateParams,
        emailConfig.userID
      )
      .then((response) => {
        console.log("Email sent!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = (title) => {
    setSelectedTitle(title);
    setShowModal(true);
  };


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
                    <a id="forgot-password" href="#" onClick={() => handleModalShow("Solicita tu usuario y cuenta :)")}>
                      ¿Aún no tienes una cuenta?
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title  style={{textAlign: 'center'}}>{selectedTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Agrega los campos del formulario */}
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formIngresos">
              <Form.Label>Ingresos Mensuales</Form.Label>
              <Form.Control
                type="number"
                name="ingresos"
                value={formData.ingresos}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDPI">
              <Form.Label>DPI o Identificacion</Form.Label>
              <Form.Control
                type="number"
                name="DPI"
                value={formData.DPI}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTrabajo">
              <Form.Label>Trabajo</Form.Label>
              <Form.Control
                type="text"
                name="trabajo"
                value={formData.trabajo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button className="btn mt-3" variant="success" type="submit">
            <i className="fa fa-send mx-2"></i>Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
