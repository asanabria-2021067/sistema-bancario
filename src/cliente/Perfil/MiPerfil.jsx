import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { apiEliminarUsuarioById, apiMiUsuario } from "./api/apiUsuario";
import { NavBar } from "../NavbarCliente";
import { UpdateProfile } from "./UpdateProfile";
import Swal from "sweetalert2";

export const MiPerfil = () => {
  const [usuario, setUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const eliminarUser = async () => {
    const resultado = await apiEliminarUsuarioById();
    if (resultado) {
      Swal.fire({
        icon: "success",
        title: "Genial!",
        text: `Usuario eliminada correctamente!`,
        confirmButtonText: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
          localStorage.removeItem("token");
          localStorage.removeItem("rol");
        } else {
          window.location.href = "/";
        }
      });
    }
  };

  const viewMiUsuario = async () => {
    const getMiUsuario = await apiMiUsuario();
    setUsuario(getMiUsuario);
  };
  useEffect(() => {
    viewMiUsuario();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
      <section>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    id="img"
                    src={usuario.img}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />

                  <p className="text-muted mb-1" id="name">
                    @{usuario.nombreUsuario}
                  </p>
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <button
                      className="ms-2 btn btn-success"
                      style={{ backgroundColor: "green" }}
                      onClick={() => handleOpenModal()}
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <MDBIcon icon="fas fa-pencil align-middle" />
                        <span className="align-middle ms-2">Editar</span>
                      </span>
                    </button>

                    <button
                      className="ms-2 btn btn-danger"
                      style={{ backgroundColor: "red" }}
                      onClick={() => eliminarUser()}
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <MDBIcon icon="fas fa-trash align-middle" />
                        <span className="align-middle ms-2">Eliminar</span>
                      </span>
                    </button>
                  </div>
                  <br />
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        icon="money fa-lg text-success"
                        style={{ marginRight: "1rem" }}
                      />
                      <MDBCardText>
                        Ingresos Mensuales:{" "}
                        <strong>Q. {usuario.ingresosMensuales}</strong>
                      </MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center custom-list-item">
                      <MDBIcon
                        icon="user fa-lg text-primary"
                        style={{ marginLeft: "2rem" }}
                      />
                      <span className="fw-bold">Nombre:</span>
                      <span className="text-muted ms-4 me-2">
                        {usuario.nombre}
                      </span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center custom-list-item">
                      <MDBIcon
                        icon="envelope fa-lg text-primary"
                        style={{ marginRight: "1rem" }}
                      />
                      <span className="fw-bold">Correo:</span>
                      <span className="text-muted ms-4">{usuario.correo}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center custom-list-item">
                      <MDBIcon
                        icon="id-card fa-lg text-primary"
                        style={{ marginLeft: "0.5rem" }}
                      />
                      <span className="fw-bold">DPI:</span>
                      <span className="text-muted ms-4 me-2">
                        {usuario.DPI}
                      </span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center custom-list-item">
                      <MDBIcon
                        icon="phone fa-lg text-primary"
                        style={{ marginRight: "1rem" }}
                      />
                      <span className="fw-bold">Telefono:</span>
                      <span className="text-muted ms-4 me-2">
                        (+502) {usuario.celular}
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
              <MDBCard>
                <MDBCardBody>
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center custom-list-item">
                      <MDBIcon
                        icon="fas fa-file-invoice-dollar"
                        style={{ marginLeft: "2rem", color: "#007BFF" }}
                      />
                      <span className="fw-bold mx-4">Mis cuentas:</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <div className="row">
                        <div className="col">
                          <span>Cuenta</span>
                        </div>
                        <div className="col">
                          <span>Saldo</span>
                        </div>
                        <div className="col">
                          <span>Tipo</span>
                        </div>
                      </div>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <span>
                        {usuario.cuentas ? (
                          usuario.cuentas.map((cuenta) => (
                            <div className="row" key={cuenta._id}>
                              <div className="col">
                                <span>{cuenta.noCuenta}</span>
                              </div>
                              <div className="col">
                                <span>Q.{cuenta.saldo}</span>
                              </div>
                              <div className="col">
                                <span>{cuenta.tipoCuenta.tipo}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No hay cuentas disponibles</p>
                        )}
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <UpdateProfile
            profileEdit={usuario}
            isOpen={showModal}
            onClose={() => handleCloseModal()}
          ></UpdateProfile>
        </MDBContainer>
      </section>
    </>
  );
};
