import React, { useEffect, useState } from "react";
import {
  agregarFavorito,
  apiEliminarContacto,
  apiEliminarLista,
  apiFavoritos,
} from "./api/apiFavoritos";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { NavBar } from "../NavbarCliente";

export const Favoritos = () => {
  const { id } = useParams();
  const [favoritos, setFavoritos] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noCuentaEmisor, setNoCuentaEmisor] = useState("");
  const [nickname, setNickname] = useState("");

  const getFavoritos = async () => {
    try {
      const favoritosData = await apiFavoritos(id);
      setFavoritos(favoritosData.favoritos);
      setContactos(favoritosData.favoritos.contactos.usuarios);
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };

  useEffect(() => {
    getFavoritos();
  }, []);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async () => {
    try {
      const schema = Yup.object().shape({
        noCuentaEmisor: Yup.string().required("El número de cuenta del emisor es obligatorio"),
        nickname: Yup.string().required("El nickname es obligatorio"),
      });
  
      await schema.validate({ noCuentaEmisor, nickname });
  
      const agregarFav = agregarFavorito(favoritos._id, noCuentaEmisor, nickname);
      if (agregarFav) {
        Swal.fire({
          icon: "success",
          title: "Se agregó un nuevo favorito",
          text: "Has agregado un nuevo favorito",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload(); // Recargar la página
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          confirmButtonText: "Ok",
        });
      }
      handleModalClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonText: "Ok",
      });
    }
  };

  const handleEliminarLista = async () => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la cuenta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (confirmacion.isConfirmed) {
      const resultado = await apiEliminarLista(favoritos._id);
      if (resultado) {
        Swal.fire({
          icon: "success",
          title: "Se eliminó un favorito",
          text: "Has eliminado un favorito",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload(); // Recargar la página
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          confirmButtonText: "Ok",
        });
      }
      setFavoritos([]);
      setContactos([]);
    }
  };

  const handleEliminarFavorito = async (c) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la cuenta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (confirmacion.isConfirmed) {
      const resultado = await apiEliminarContacto(favoritos._id, c.cuentas);
      if (resultado) {
        Swal.fire({
          icon: "success",
          title: "Se eliminó un favorito",
          text: "Has eliminado un favorito",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload(); // Recargar la página
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          textAlign: "center",
          opacity: "100%",
          marginBottom: "20px",
          backgroundColor: "#004906",
          color: "#FFFFFF",
          paddingBottom: "1px",
          paddingTop: "15px"
        }}
      >
          <h1 className="mb-4">Lista de favoritos</h1>
        </div>
      <div className="container mt-4">
      
        <div className="d-flex justify-content-start align-items-center mb-3">
          <Button
            className="btnOpciones btn-primary mr-2"
            onClick={handleModalShow}
          >
            <i className="fa fa-user mx-2"></i>Agregar Favorito
          </Button>
          <Button
            className="btnCancel btn-danger"
            onClick={handleEliminarLista}
          >
            <i className="fa fa-trash mx-2"></i>Eliminar Lista
          </Button>
        </div>

        <section className="favoritos-section">
          <Row xs={1} md={2} className="g-3">
            {contactos.map((c) => (
              <Col key={c._id}>
                <Card className="h-100">
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "0 auto",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={c.img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <Card.Title>{c.nickname}</Card.Title>
                    <Card.Text>
                      <strong>Numero de Cuenta:</strong> {c.cuentas}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                    className="btnCancel"
                      variant="danger"
                      onClick={() => handleEliminarFavorito(c)}
                    >
                      <i className="fa fa-trash mx-2"></i>Eliminar
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Favorito</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="noCuentaEmisor">
                <Form.Label>No. Cuenta Emisor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el número de cuenta del emisor"
                  value={noCuentaEmisor}
                  onChange={(e) => setNoCuentaEmisor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="nickname">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nickname del favorito"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btnCancel"
              variant="secondary"
              onClick={handleModalClose}
            >
              <i className="fa fa-cancel mx-2"></i>Cerrar
            </Button>
            <Button
              className="btnOpciones"
              variant="primary"
              onClick={handleFormSubmit}
            >
              <i className="fa fa-save mx-2"></i>Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
