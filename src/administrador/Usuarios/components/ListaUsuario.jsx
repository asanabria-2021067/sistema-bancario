import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiDeleteUsuario, apiUsuarioView } from "../api/apiUsuario";
import { UpdateUsuarios } from "./UpdateUsuario";

export const ListaUsuarios = () => {
  const [ListaUsuario, setListaUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState([]);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (u) => {
    setShowModal(true);
    setUsuario(u);
  };

  const viewUser = async () => {
    const usuarioList = await apiUsuarioView();
    setListaUsuario(usuarioList);
  };

  useEffect(() => {
    viewUser();
  }, [showModal]);

  const eliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (confirmacion.isConfirmed) {
      let result = await apiDeleteUsuario(id);
      if (result) {
        setListaUsuario(ListaUsuario.filter((c) => c._id !== id));
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Se eliminó el Usuario correctamente!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo eliminar el usuario.",
        });
      }
    }
  };

  return (
    <>
      <div style={{ marginLeft: "1%" }}>
        <div
          style={{
            textAlign: "center",
            opacity: "100%",
            marginBottom: "20px",
            paddingTop: "20px",
            backgroundColor: "#004906",
            color: "#FFFFFF",
            paddingBottom: "1px",
          }}
        >
          <h1 class="display-4 font-weight-bold mb-4" id="">
            Usuario
          </h1>
        </div>
        <div
          className="d-grid gap-2 col-6 mx-auto"
          style={{ marginBottom: "10px" }}
        >
          <Link to="/agregarUsuario" className="nav-link" aria-current="page">
            <button
              className="btn btn-success"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                navigate("/agregarUsuario");
              }}
            >
              <i className="fa fa-save mx-2"></i> Agregar Usuario
            </button>
          </Link>
        </div>
        <div className="container">
          <Table striped bordered hover>
            <thead
              style={{ backgroundColor: "#AEAEAE" }}
              className="text-center"
            >
              <tr>
                <th>Nombre:</th>
                <th>Nombre de Usuario:</th>
                <th>DPI</th>
                <th>Correo:</th>
                <th>Celular:</th>
                <th>Direccion:</th>
                <th>Ingresos Mensuales:</th>
                <th>Cuenta:</th>
                <th>Saldo:</th>
                <th>- ROL -</th>
                <th>Opciones:</th>
              </tr>
            </thead>
            {ListaUsuario.map((t) => {
              return (
                <tbody key={t._id} className="text-center">
                  <tr>
                    <td>{t.nombre}</td>
                    <td>{t.nombreUsuario}</td>
                    <td>{t.DPI}</td>
                    <td>{t.correo}</td>
                    <td>{t.celular}</td>
                    <td>{t.direccion}</td>
                    <td>{t.ingresosMensuales}</td>
                    <td>
                      {t.cuentas ? (
                        <div className="row">
                          {t.cuentas.map((cuenta) => (
                            <div key={cuenta._id}>
                              <span>{cuenta.noCuenta}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No hay cuentas disponibles</p>
                      )}
                    </td>
                    <td>
                      {t.cuentas ? (
                        <div className="row">
                          {t.cuentas.map((cuenta) => (
                            <div key={cuenta.noCuenta}>
                              <span>Q{cuenta.saldo}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No hay cuentas disponibles</p>
                      )}
                    </td>
                    <td>{t.rol}</td>

                    <td>
                      <div className="d-grid gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal(t)}
                          style={{ backgroundColor: "#F7DC6F", border: "none" }}
                        >
                          <i className="fa fa-user mx-2"></i>Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            eliminar(t._id);
                          }}
                          style={{ backgroundColor: "#CD5C5C", border: "none" }}
                        >
                          <i className="fa fa-trash mx-2"></i>Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <UpdateUsuarios
            listaUsuarios={usuario}
            isOpen={showModal}
            onClose={() => handleCloseModal()}
          ></UpdateUsuarios>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};
