import React, { useState, useEffect, useHistory } from "react";
import { Table, Button } from "react-bootstrap";
import { obtenerCuentas, apiEliminarCuenta } from "../api/apiCuenta";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Cuenta = () => {
  const [cuentas, setCuentas] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const cuentasList = await obtenerCuentas();
        setCuentas(cuentasList);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCuentas();
  }, []);

  const eliminar = async (id) => {
    try {
      // Mostrar mensaje de confirmación
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la cuenta permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (confirmacion.isConfirmed) {
        await apiEliminarCuenta(id);
        console.log("Cuenta eliminada con éxito");
        const cuentasActualizadas = cuentas.filter(
          (cuenta) => cuenta._id !== id
        );
        setCuentas(cuentasActualizadas);
      }
    } catch (error) {
      console.log("Error al eliminar la cuenta:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ marginLeft: "10%", marginBottom: "10%" }}>
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
          Cuentas
        </h1>
      </div>

      <div
        className="d-grid gap-2 col-6 mx-auto"
        style={{ marginBottom: "10px" }}
      >
        <Link to="/agregar-cuenta" className="nav-link" aria-current="page">
          <div className="btn btn-success btn-agregar" type="button">
            <i className="fa fa-save mx-2"></i>Agregar Cuenta
          </div>
        </Link>
      </div>

      <div className="container">
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#AEAEAE" }} className="text-center">
            <tr>
              <th>ID</th>
              <th>Número de Cuenta</th>
              <th>Tipo de Cuenta</th>
              <th>Usuario</th>
              <th>Dinero de la cuenta</th>
              <th>Acciones</th>
            </tr>
          </thead>

          {cuentas.map((cuenta) => {
            return (
              <tbody className="text-center" key={cuenta._id}>
                <tr>
                  <td>{cuenta._id}</td>
                  <td>{cuenta.noCuenta}</td>
                  <td>{cuenta.tipoCuenta.tipo}</td>
                  <td>{cuenta.usuario.nombre}</td>
                  <td>{cuenta.saldo}</td>

                  <td>
                    <div className="d-grid gap-2 col mx-auto">
                      <div className="d-grid gap-2">
                        <Button
                          onClick={() => eliminar(cuenta._id)}
                          className="btn btn-danger"
                          style={{ backgroundColor: "#CD5C5C", border: "none" }}
                        >
                          <i className="fa fa-trash mx-2"></i>Eliminar
                        </Button>
                        <Link
                          to={`/historialAdmin/${cuenta._id}`}
                          className="nav-link"
                        >
                          <div
                            className="d-grid gap-2 col-190 mx-auto"
                            style={{ marginBottom: "10px" }}
                          >
                            <div
                              className="btn btn-primary btn-ver-historial"
                              type="button"
                            >
                              <i className="fa fa-history mx-2"></i>Ver Historial
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
          <div
            className="d-grid gap-2 col-190 mx-auto"
            style={{ marginBottom: "10px" }}
          >
        <Link to={`/cuentasConMasMovimiento`} className="nav-link">
            <div className="btn btn-primary btn-ver-historial" type="button">
              <i className="fa fa-upload mx-2"></i>Cuentas Mas Movimiento
            </div>
        </Link>
          </div>
      </div>
    </div>
  );
};
