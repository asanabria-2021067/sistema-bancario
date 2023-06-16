import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { NavBar } from '../NavbarCliente';
import { useParams } from 'react-router-dom';
import { apiMisMovimientos } from './api/apiMovimientos';

export const Historial = () => {
  const { id } = useParams();
  const [movimiento, setMovimiento] = useState([]);
  const [compras, setCompras] = useState([])
  const [transferenciasRealizadas, setTransferenciasRealizadas] = useState([])
  const [transferenciasRecibidas, setTransferenciasRecibidas] = useState([])
  const [credito, setCredito] = useState([])
  const [deposito, setDeposito] = useState([])
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
        <h1 class="display-4 font-weight-bold mb-4" id="">Historial</h1>
      </div>
      <div className="container">
        <div className="account-history">
          <Table striped bordered hover className="account-history-table">
          <thead>
  <tr>
    <th>Usuario</th>
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
        <td>{movimiento.usuario}</td>
        <td>{t.fecha.substring(0, 10)}</td>
        <td>Transferencia Realizadas</td>
        <td>{t.monto}</td>
        <td>{t.emisor}</td>
        <td>{t.receptor}</td>
        <td>{t.concepto}</td>
      </tr>
    ))
  )}

  {transferenciasRecibidas.length === 0 ? (
    <tr>
      <td colSpan="7">Sin transferencias recibidas</td>
    </tr>
  ) : (
    transferenciasRecibidas.map((t) => (
      <tr key={t._id}>
        <td>{movimiento.usuario}</td>
        <td>{t.fecha.substring(0, 10)}</td>
        <td>Transferencia Recibida</td>
        <td>{t.monto}</td>
        <td>{t.emisor}</td>
        <td>{t.receptor}</td>
        <td>{t.concepto}</td>
      </tr>
    ))
  )}
  {deposito.length === 0 ? (
    <tr>
      <td colSpan="7">Sin depositos recibidos</td>
    </tr>
  ) : (
    deposito.map((d) => (
      <tr key={d._id}>
        <td>{movimiento.usuario}</td>
        <td>N/A</td>
        <td>Deposito</td>
        <td>{d.dinero}</td>
        <td>N/A</td>
        <td>{d.receptorDeposito}</td>
        <td>N/A</td>
      </tr>
    ))
  )}
  {credito.length === 0 ? (
    <tr>
      <td colSpan="7">Sin creditos recibidos</td>
    </tr>
  ) : (
    credito.map((c) => (
      <tr key={c._id}>
        <td>{movimiento.usuario}</td>
        <td>{c.fechaApertura.substring(0,10)}</td>
        <td>Credito</td>
        <td>{c.monto}</td>
        <td>N/A</td>
        <td>{movimiento.usuario}</td>
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
        <td>{movimiento.usuario}</td>
        <td>N/A</td>
        <td>Compras</td>
        <td>{c.dinero}</td>
        <td>{c.comprador}</td>
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
