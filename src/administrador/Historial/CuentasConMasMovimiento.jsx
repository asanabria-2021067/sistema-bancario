import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiMisMovimientos } from "./api/apiMovimiento";
import { useNavigate } from "react-router-dom";

export const CuentasConMasMovimiento = () => {
  const [movimiento, setMovimiento] = useState([]);
  console.log(movimiento);
  const navigate = useNavigate();
  const viewMovimientos = async () => {
    try {
      const response = await apiMisMovimientos();
      setMovimiento(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewMovimientos();
  }, []);

  return (
    <>
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
          Cuentas con mas movimiento
        </h1>
      </div>
      <div className="container mt-4">
        <div className="account-history">
          <Table striped bordered hover className="account-history-table">
            <thead>
              <tr>
                <th>Numero de Cuenta</th>
                <th>Cantidad de Movimientos</th>
                <th>Compras</th>
                <th>Transferencias Recibidas</th>
                <th>Transferencias Realizadas</th>
                <th>Depositos</th>
                <th>Creditos</th>
                <th>Historial</th>
              </tr>
            </thead>
            <tbody>
              {movimiento.map((m) => (
                <tr key={m._id}>
                  <td>{m.cuenta.noCuenta}</td>
                  <td>{m.numMovimientos}</td>
                  <td>{m.compras.length}</td>
                  <td>{m.transferenciasRecibidas.length}</td>
                  <td>{m.transferenciasRealizadas.length}</td>
                  <td>{m.depositos.length}</td>
                  <td>{m.creditos.length}</td>
                  <td> <div className="d-grid gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          navigate(`/historialAdmin/${m.cuenta._id}`)
                        }}
                        className="btn btn-primary btn-ver-historial"
                      >
                        <i className="fa fa-history mx-2"></i> Historial
                      </Button>
                    </div></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
