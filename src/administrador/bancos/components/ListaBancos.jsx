import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiBancoView, apiDeleteBanco } from "../api/apiBancos";

export const ListaBancos = () => {
    const [listaBancos, setListaBancos] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (u) => {
        setShowModal(true);
        setUsuario(u);
    };


    const viewBanco = async () => {
        const bancoList = await apiBancoView();
        setListaBancos(bancoList);
    };

    useEffect(() => {
        viewBanco();
    }, [
        // showModal
        //Villeda Mula
    ]);

    const eliminar = async (id) => {
        try {
            // Mostrar mensaje de confirmación
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción eliminará el banco permanentemente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
            });

            if (confirmacion.isConfirmed) {
                await apiDeleteBanco(id);
                setListaBancos(listaBancos.filter((c) => c._id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Se eliminó el banco correctamente!",
                });
            }
        } catch (error) {
            console.log("Error al eliminar la cuenta:", error.message);
        }
    };



    return (
        <>
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
                    <h1 class="display-4 font-weight-bold mb-4" id="">Bancos</h1>
                </div>
                <Link
                    to="/agregarBancos"
                    className="nav-link "
                    aria-current="page"

                >
                    <div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: "10px" }}>
                        <button className="btn btn-success btn-agregar" type="button" ><i className="fa fa-save mx-2"></i>Agregar Banco</button>
                    </div>
                </Link>
                <div className="container-fluid">
                    <br />
                    {listaBancos.map((u) => {
                        return (
                            <div className="container-fluid" key={u._id}>

                                <div className="card mb-2 card-hotel"  >
                                    <div className="row g-0">
                                        <div className="col-md-3 image-container" >
                                            <img src={u.img} className="img-fluid  imagen-hotel " alt="..." />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="card-body text-center ">

                                                <h5 className="card-title texto-titulo tdHotel "> <strong>NOMBRE DEL BANCO : {u.nombre}</strong> </h5>
                                                <table className="table tablaHotel">
                                                    <thead>
                                                        <tr>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='tdHotel'> <div className="d-grid gap-2 col    mx-auto">
                                                                <Button variant="warning" size="sm"
                                                                    onClick={() => handleOpenModal(t)}
                                                                    style={{ backgroundColor: "#F7DC6F", border: "none" }}
                                                                >
                                                                    Editar
                                                                </Button>

                                                            </div></td>

                                                            <td className='tdHotel'> <div className="d-grid gap-2 col-12 mx-auto">

                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        eliminar(u._id);
                                                                    }}
                                                                    style={{ backgroundColor: "#CD5C5C", border: "none" }}
                                                                >
                                                                    <i className="fa fa-trash mx-2"></i> Eliminar
                                                                </Button>
                                                            </div></td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                    {/* <UpdateHotel
                    listaHotel={hotel}
                    isOpen={showModal}
                    onClose={() => handleCloseModal()}
                ></UpdateHotel> */}
                </div>
            </div>
        </>
    );
};
