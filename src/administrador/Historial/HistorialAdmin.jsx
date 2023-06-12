import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { apiMisMovimientos } from '../../cliente/Historial/api/apiMovimientos';

export const HistorialAdmin = () => {
    const { id } = useParams();
    const [movimiento, setMovimiento] = useState([]);
    const [compras, setCompras] = useState([]);

    const viewMovimientos = async () => {
        const getMisMovimientos = await apiMisMovimientos(id);
        setMovimiento([getMisMovimientos]);
        if (getMisMovimientos.length > 0) {
            setCompras(getMisMovimientos[0].compras);
        }
    };

    useEffect(() => {
        viewMovimientos();
    }, []);

    return (
        <>
            <div className="container">
                <div className="account-history">
                    <h1 >Historial de Cuenta</h1>
                    <br />
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

                            {movimiento.map((m) => (
                                <React.Fragment key={m._id}>
                                    {m.transferenciasRealizadas.map((transferencia) => (
                                        <tr key={transferencia._id}>
                                            <td>{m.usuario}</td>
                                            <td>{new Date(transferencia.fecha).toLocaleDateString()}</td>
                                            <td>Transferencia</td>
                                            <td>{transferencia.monto}</td>
                                            <td>{transferencia.emisor.nombreUsuario}</td>
                                            <td>{transferencia.receptor.nombreUsuario}</td>
                                            <td>{transferencia.concepto}</td>
                                        </tr>
                                    ))}
                                    {m.transferenciasRecibidas.map((transferenciaRecibida) => (
                                        <tr key={transferenciaRecibida._id}>
                                            <td>{m.usuario}</td>
                                            <td>{new Date(transferenciaRecibida.fecha).toLocaleDateString()}</td>
                                            <td>Transferencia Recibida</td>
                                            <td>{transferenciaRecibida.monto}</td>
                                            <td>{transferenciaRecibida.emisor.nombreUsuario}</td>
                                            <td>{transferenciaRecibida.receptor.nombreUsuario}</td>
                                            <td>{transferenciaRecibida.concepto}</td>
                                        </tr>
                                    ))}
                                    {m.transferenciasRealizadas.length === 0 && (
                                        <tr>
                                            <td colSpan="7">Sin transferencias Realizadas</td>
                                        </tr>
                                    )}
                                    {m.transferenciasRecibidas.length === 0 && (
                                        <tr>
                                            <td colSpan="7">Sin transferencias Recibidas</td>
                                        </tr>
                                    )}
                                    {m.depositos.map((deposito) => (
                                        <tr key={deposito._id}>
                                            <td>{m.usuario}</td>
                                            <td> N/A </td>
                                            <td>Deposito</td>
                                            <td>{deposito.dinero}</td>
                                            <td> N/A </td>
                                            <td>{deposito.receptorDeposito.nombreUsuario}</td>
                                            <td> N/A </td>
                                        </tr>
                                    ))}
                                    {m.compras.map((compra) => (
                                        <tr key={compra._id}>
                                            <td>{m.usuario}</td>
                                            <td> N/A </td>
                                            <td>Compra</td>
                                            <td>{compra.dinero}</td>
                                            <td> N/A </td>
                                            <td>{compra.comprador.nombreUsuario}</td>
                                            <td>{compra.informacion}</td>
                                        </tr>
                                    ))}
                                    {m.creditos.map((credito) => (
                                        <tr key={credito._id}>
                                            <td>{m.usuario}</td>
                                            <td>{new Date(credito.fechaApertura).toLocaleDateString()}</td>
                                            <td>Credito</td>
                                            <td>{credito.monto}</td>
                                            <td> N/A </td>
                                            <td>{m.usuario}</td>
                                            <td>N/A</td>
                                        </tr>
                                    ))}


                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};
