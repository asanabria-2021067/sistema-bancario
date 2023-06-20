import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiDeposito, DeleteDepositos } from "../api/apiDeposito";

export const ListaDeposito = () => {
    const [ListaDepositos, setListaDepositos] = useState([]);
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

    const viewDeposito = async () => {
        const depositoList = await apiDeposito();
        setListaDepositos(depositoList);
    };

    useEffect(() => {
        viewDeposito();
    }, [
        showModal
    ]);

    const eliminar = async (id) => {
        try {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción eliminará el credito permanentemente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
            });

            if (confirmacion.isConfirmed) {
                await DeleteDepositos(id);
                setListaDepositos(ListaDepositos.filter((c) => c._id !== id));
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
                    textAlign: "center",
                    opacity: "100%",
                    marginBottom: "20px",
                    paddingTop: "20px",
                    backgroundColor: "#004906",
                    color: "#FFFFFF",
                    paddingBottom: "1px"
                }}
            >
                <h1 class="display-4 font-weight-bold mb-4" id="">Deposito</h1>
            </div>
           
                <div
                    className="d-grid gap-2 col-6 mx-auto"
                    style={{ marginBottom: "10px" }}
                >
                     <Link to="/agregarDepositos    " className="nav-link " aria-current="page">
                    <button className="btn btn-success" type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("/agregarDepositos");
                        }}
                    >
                        <i className="fa fa-save mx-2"></i>Agregar Deposito
                    </button>
                    </Link>
                </div>
            
            <div className="container">
                <Table striped bordered hover>
                    <thead style={{ backgroundColor: "#AEAEAE" }} className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>noCuenta</th>
                            <th>Dinero</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    {ListaDepositos.map((c) => {
                        return (
                            <tbody key={c._id} className='text-center' >
                                <tr>
                                    <td >{c._id}</td>
                                    <td>{c.noCuenta}</td>
                                    <td>{c.dinero}</td>
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
                                                <i className="fa fa-trash mx-2"></i>Eliminar
                                            </Button>
                                        </div>
                                    </td>
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