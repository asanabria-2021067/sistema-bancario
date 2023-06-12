import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiTransferencia, DeleteTransferencia } from "../api/apiTransferencia";

export const ListaTransferencia = () => {
    const [ListaTransferencia, setListaTransferencia] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    //   const [credito, setCredito] = useState(Tipo )

    //   const handleOpenModal = (u) => {
    //     setShowModal(true); 
    //     setListaCreditos(u);
    //   };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const viewTransferencia = async () => {
        const transferenciaList = await apiTransferencia();
        setListaTransferencia(transferenciaList);
    };

    useEffect(() => {
        viewTransferencia();
    }, [
        showModal
    ]);

    // const eliminar = async (id) => {
    //     let result = await DeleteTransferencia(id);
    //     if (result) {
    //       setListaTransferencia(ListaTransferencia.filter((c) => c._id !== id));
    //       Swal.fire({
    //         icon: "success",
    //         title: "Genial!",
    //         text: "Se eliminó el deposito correctamente!",
    //       });
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "No se pudo eliminar el deposito.",
    //       });
    //     }
    //   };

    return (
        <div style={{ marginLeft: "10%" }}>
            <div
                style={{
                    backgroundColor: "#f8f7f6",
                    textAlign: "center",
                    opacity: "100%",
                    marginBottom: "20px",
                }}
            >
                <h1 style={{ opacity: "100%" }}>Lista de Transferencias</h1>
            </div>
         
            <div className="container">
                <Table striped bordered hover>
                    <thead style={{ backgroundColor: "#FAD7A0" }} className="text-center">
                        <tr>
                        <th>ID</th>
                            <th>Emisor</th>
                            <th>noCuentaEmisor</th>
                            <th>noCuenta</th>
                            <th>Receptor</th>
                            <th>Monto</th>
                            <th>Concepto</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    {ListaTransferencia.map((c) => {
                        return (
                            <tbody key={c._id} className="text-center">
                                <tr>
                                <td >{c._id}</td>
                                    <td> {c.emisor.nombreUsuario}</td>
                                    <td> {c.noCuentaEmisor}</td>
                                    <td> {c.noCuenta}</td>
                                    <td> {c.receptor.nombreUsuario}</td>
                                    <td> {c.monto}</td>
                                    <td> {c.concepto}</td>
                                    <td> {c.fecha}</td>
                                    

                                   
                                </tr>
                            </tbody>
                        );
                    })}
                </Table>
               
            </div>
            <br /><br />
        </div>
    );
};