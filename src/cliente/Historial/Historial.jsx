import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { NavBar } from '../NavbarCliente';
import { useParams } from 'react-router-dom';
import { apiMisMovimientos } from './api/apiMovimientos';

export const Historial = () => {
  const { id } = useParams();
  const [movimiento, setMovimiento] = useState([]);
  console.log(movimiento);
  const [compras, setCompras] = useState([]);
  const [transferenciasRealizadas, setTransferenciasRealizadas] = useState([]);
  const [transferenciasRecibidas, setTransferenciasRecibidas] = useState([]);
  const [credito, setCredito] = useState([]);
  const [deposito, setDeposito] = useState([]);

  const viewMovimientos = async () => {
    const getMisMovimientos = await apiMisMovimientos(id);
    setMovimiento(getMisMovimientos);
    setTransferenciasRealizadas(getMisMovimientos.transferenciasRealizadas);
    setCompras(getMisMovimientos.compras);
    setTransferenciasRecibidas(getMisMovimientos.transferenciasRecibidas);
    setDeposito(getMisMovimientos.depositos);
    setCredito(getMisMovimientos.creditos);
  };

  useEffect(() => {
    viewMovimientos();
  }, []);

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
        <h1 className="mb-4">Historial de Cuenta</h1>
      </div>
      <div className="container mt-4">
        <div className="account-history">
          <Table striped bordered hover className="account-history-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo de Transacción</th>
                <th>Dinero</th>
                <th>Emisor</th>
                <th>Receptor</th>
                <th>Concepto</th>
              </tr>
            </thead>
            <tbody>
              {transferenciasRealizadas.length === 0 ? (
                <tr>
                  <td colSpan="7">Sin transferencias realizadas</td>
                </tr>
              ) : (
                transferenciasRealizadas.map((t) => (
                  <tr key={t._id}>
                    <td>{t.fecha.substring(0, 10)}</td>
                    <td>Transferencia Realizada</td>
                    <td style={{ color: "red" }}>
                      <i className="fa fa-money-bill mx-2"></i>Q.{t.monto}
                    </td>
                    <td>{t.emisor?.nombreUsuario}</td>
                    <td>{t.receptor?.nombreUsuario}</td>
                    <td>{t.concepto}</td>
                  </tr>
                ))
              )}

              {transferenciasRecibidas.length === 0 ? (
                <tr>
                  <td colSpan="7">Sin transferencias recibidas</td>
                </tr>
              ) : (
                transferenciasRecibidas.map((tr) => (
                  <tr key={tr._id}>
                    <td>{tr.fecha.substring(0, 10)}</td>
                    <td>Transferencia Recibida</td>
                    <td style={{ color: "green" }}>
                      <i className="fa fa-money-bill-trend-up mx-2"></i> Q.
                      {tr.monto}
                    </td>
                    <td>{tr.emisor?.nombreUsuario}</td>
                    <td>{tr.receptor?.nombreUsuario}</td>
                    <td>{tr.concepto}</td>
                  </tr>
                ))
              )}
              {deposito.length === 0 ? (
                <tr>
                  <td colSpan="7">Sin depósitos recibidos</td>
                </tr>
              ) : (
                deposito.map((d) => (
                  <tr key={d._id}>
                    <td>N/A</td>
                    <td>Depósito</td>
                    <td style={{ color: "green" }}>
                      <i className="fa fa-money-bill-trend-up mx-2"></i> Q.
                      {d.dinero}
                    </td>
                    <td>N/A</td>
                    <td>{d?.receptorDeposito.nombreUsuario}</td>
                    <td>N/A</td>
                  </tr>
                ))
              )}
              {credito.length === 0 ? (
                <tr>
                  <td colSpan="7">Sin créditos recibidos</td>
                </tr>
              ) : (
                credito.map((c) => (
                  <tr key={c._id}>
                    <td>{c.fechaApertura.substring(0, 10)}</td>
                    <td>Crédito</td>
                    <td style={{ color: "green" }}>
                      <i className="fa fa-money-bill-trend-up mx-2"></i>Q.
                      {c.monto}
                    </td>
                    <td>N/A</td>
                    <td>{c.usuario?.nombreUsuario}</td>
                    <td>N/A</td>
                  </tr>
                ))
              )}
              {compras.length === 0 ? (
                <tr>
                  <td colSpan="7">Sin compras realizadas</td>
                </tr>
              ) : (
                compras.map((c) => (
                  <tr key={c._id}>
                    <td>N/A</td>
                    <td>Compras</td>
                    <td style={{ color: "red" }}>
                      <i className="fa fa-money-bill mx-2"></i>Q.{c.dinero}
                    </td>
                    <td>{c.comprador.nombreUsuario}</td>
                    <td>N/A</td>
                    <td>{c.informacion}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
