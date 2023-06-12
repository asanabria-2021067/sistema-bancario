import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { DeleteCreditos, apiCredito } from "../api/apiCredito";

export const ListaCreditos = () => {
    const [ListaCreditos, setListaCreditos] = useState([]);
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

    const viewCredito = async () => {
        const creditoList = await apiCredito();
        setListaCreditos(creditoList);
    };

    useEffect(() => {
        viewCredito();
    }, [
        showModal
    ]);

    const eliminar = async (id) => {
        try {
            // Mostrar mensaje de confirmación
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción eliminará el credito permanentemente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
            });

            if (confirmacion.isConfirmed) {
                await DeleteCreditos(id);
                setListaCreditos(ListaCreditos.filter((c) => c._id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Se eliminó el credito correctamente!",
                });
            }
        } catch (error) {
            console.log("Error al eliminar la cuenta:", error.message);
        }
    };


    return (
        <div style={{ marginLeft: " 10%" }}>
            <div
                style={{
                    backgroundColor: " #f8f7f6",
                    textAlign: "center",
                    opacity: "100%",
                    marginBottom: "20px",
                }}
            >
                <h1 style={{ opacity: "100%" }}>Lista de Creditos</h1>
            </div>
            <Link to="/agregarCreditoAdmin    " className="nav-link " aria-current="page">
                <div
                    className="d-grid gap-2 col-6 mx-auto"
                    style={{ marginBottom: "10px" }}
                >
                    <button className="btn btn-success" type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("/agregarCreditoAdmin");
                        }}
                    >
                       <i className="fa fa-save mx-2"></i> Agregar Credito
                    </button>
                </div>
            </Link>
            <div className="container">
                <Table striped bordered hover>
                    <thead style={{ backgroundColor: "#FAD7A0" }} className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Numero de Credito</th>
                            <th>Monto</th>
                            <th>Monto a pagar</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>

                    {ListaCreditos.map((c) => {
                        return (
                            <tbody key={c._id} className='text-center' >
                                <tr>
                                    <td >{c._id}</td>
                                    <td>{c.numeroCredito}</td>
                                    <td>{c.monto}</td>
                                    <td>{c.montoPagar}</td>
                                    <td>
                                        <div className="d-grid gap-2">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                style={{ backgroundColor: "#CD5C5C", border: "none" }}
                                                onClick={() => {
                                                    eliminar(c._id);
                                                }}
                                            >
                                               <i className="fa fa-trash mx-2"></i> Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        );
                    })}
                </Table>
            </div>
        </div>
    );
};