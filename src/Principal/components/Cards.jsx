import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import emailjs from "emailjs-com";
import emailConfig from "./emailHelper/emailConfig";
export const Cards = () => {
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("serv");
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("fade-in");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    telefono: "",
  });
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
      message: "",
      telefono: "",
    });
    setShowModal(false);
  };

  const sendEmail = (formData) => {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      telefono: formData.telefono,
      to_email: "dquinonez-2021045@kinal.edu.gt", // Dirección de correo electrónico de destino
    };

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
      <div
        className="section"
        style={{ backgroundColor: "#1D8348", width: "100%" }}
      >
        <br />
        <div className="container " id="serv" style={{ marginBottom: "20px" }}>
          <h2
            className="text-center mb-5"
            style={{ color: "white", fontSize: "55px", fontStyle: "italic" }}
          >
            Servicios que ofrecemos
          </h2>
          <div className="row">
            {/* Card 1 */}
            <div className="col-md-6 mb-4">
              <Card className="cardPrincipal shadow">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <Card.Img
                      src="https://cdn-icons-png.flaticon.com/512/308/308833.png"
                      alt="Tarjeta de crédito"
                    />
                  </div>
                  <div className="col-md-8">
                    <Card.Body>
                      <Card.Title>Productos en Linea</Card.Title>
                      <Card.Text>
                        Obtén productos en linea desde la comunidad de tu casa,
                        todos tus movimientos quedaran registrados
                      </Card.Text>
                      <Button
                        onClick={() => handleModalShow("Solicitar Informacion sobre Productos en Linea")}
                        variant="success">
                        Solicitar Información
                      </Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>

            {/* Card 2 */}
            <div className="col-md-6 mb-4">
              <Card className="cardPrincipal shadow">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <Card.Img
                      src="https://cdn-icons-png.flaticon.com/512/6526/6526847.png"
                      alt="Préstamo personal"
                    />
                  </div>
                  <div className="col-md-8">
                    <Card.Body>
                      <Card.Title>Prestamos</Card.Title>
                      <Card.Text>
                        Solicita los prestamos para cubrir tus necesidades
                        financieras.
                      </Card.Text>
                      <br />
                      <Button
                        onClick={() => handleModalShow("Solicitar Informacion sobre Prestamos ")}
                        variant="success">
                        Solicitar Información
                      </Button>

                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>

            {/* Card 3 */}
            <div className="col-md-6 mb-4">
              <Card className="cardPrincipal shadow">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <Card.Img
                      src="https://cdn-icons-png.flaticon.com/512/1999/1999304.png"
                      alt="Cuenta de ahorros"
                    />
                  </div>
                  <div className="col-md-8">
                    <Card.Body>
                      <Card.Title>Creditos</Card.Title>
                      <Card.Text>
                        Abre una cuenta con nosotros y ten acceso a los
                        creditos.
                      </Card.Text>
                      <Button
                        onClick={() => handleModalShow("Solicitar Informacion sobre Creditos ")}
                        variant="success">
                        Solicitar Información
                      </Button>

                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>

            {/* Card 4 */}
            <div className="col-md-6 mb-4">
              <Card className="cardPrincipal shadow">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <Card.Img
                      src="https://cdn-icons-png.flaticon.com/512/4988/4988694.png"
                      alt="Inversiones"
                    />
                  </div>
                  <div className="col-md-8">
                    <Card.Body>
                      <Card.Title>Inversiones</Card.Title>
                      <Card.Text>
                        Invierte en tu negocio y ten registrados todos tus
                        movimientos economicos.
                      </Card.Text>
                      <Button
                        onClick={() => handleModalShow("Solicitar Informacion sobre Inversiones")}
                        variant="success">
                        Solicitar Información
                      </Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>

            {/* Card 5 */}
            <div className="col-md- 6 mb-4">
              <Card className="cardPrincipal shadow">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <Card.Img
                      src="https://cdn-icons-png.flaticon.com/512/2856/2856892.png"
                      style={{ width: "200px", marginLeft: "90px" }}
                      alt="Seguros"
                    />
                  </div>
                  <div className="col-md-8">
                    <Card.Body>
                      <Card.Title>Traspasos</Card.Title>
                      <Card.Text>
                        Al abrir una cuenta con nosotros ten en cuenta que
                        podras hacer traspasos monetarios no solo con cuentas de
                        nuestro mismo banco si no con otros bancos asociados.
                      </Card.Text>
                      <Button
                        onClick={() => handleModalShow("Solicitar Informacion sobre Traspasos en Linea")}
                        variant="success">
                        Solicitar Información
                      </Button>

                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
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

            <Form.Group controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
