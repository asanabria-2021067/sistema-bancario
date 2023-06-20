import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

import { DeleteTipoCuenta, apiTipoCuenta } from "../Api/apiTipoCuenta"


export const ListaTipoCuenta = () => {
    const [ListaTipoCuenta, setListaTipoCuenta] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const viewTipoCuenta = async () => {
        const tipoCuentaList = await apiTipoCuenta();
        setListaTipoCuenta(tipoCuentaList)
    }

    useEffect(() => {
        viewTipoCuenta();
    }, [
        showModal
    ]);

    const eliminar = async (id) => {
        try {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción eliminará el tipo de cuenta permanentemente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
            });

            if (confirmacion.isConfirmed) {
                await DeleteTipoCuenta(id);
                setListaTipoCuenta(ListaTipoCuenta.filter((c) => c._id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Se eliminó el tipo de cuenta correctamente!",
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
                    textAlign: "center",
                    opacity: "100%",
                    marginBottom: "20px",
                    paddingTop: "20px",
                    backgroundColor: "#004906",
                    color: "#FFFFFF",
                    paddingBottom: "1px"
                }}
            >
                <h1 class="display-4 font-weight-bold mb-4" id="">Tipo Cuenta</h1>
            </div>

                <div
                    className="d-grid gap-2 col-6 mx-auto"
                    style={{ marginBottom: "10px" }}
                >
            <Link to="/agregarTipoCuentaAdmin    " className="nav-link " aria-current="page">
                    <button className="btn btn-success" type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("/agregarTipoCuentaAdmin");
                        }}
                    >
                        <i className="fa fa-save mx-2"></i>Agregar un Tipo de Cuenta
                    </button>
            </Link>
                </div>

            <div className="container">
                <Table striped bordered hover>
                    <thead style={{ backgroundColor: "#AEAEAE" }} className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>TIPO</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>

                    {ListaTipoCuenta.map((c) => {
                        return (
                            <tbody key={c._id} className='text-center' >
                                <tr>
                                    <td >{c._id}</td>
                                    <td>{c.tipo}</td>
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
    )
}