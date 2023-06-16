import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { DeleteTarea, apiCompras } from "../api/apiCompras";

export const ListaCompras = () => {
  const [compras, setCompras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await apiCompras();
        setCompras(data);
        console.log(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchCompras();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log("Compras Realizadas:", compras);
  }, [compras]);

  if (error) {
    return <div>Hubo un error al cargar las compras: {error.message}</div>;
  }

  const eliminar = async (id) => {
    try {
      // Mostrar mensaje de confirmación
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la compra permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (confirmacion.isConfirmed) {
        await DeleteTarea(id);
        setCompras(compras.filter((c) => c._id !== id));
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Se eliminó la compra correctamente!",
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
          paddingTop:"20px",
          backgroundColor: "#004906",
          color: "#FFFFFF",
          paddingBottom: "1px"
        }}
      >
        <h1 class="display-4 font-weight-bold mb-4" id="">Compras</h1>
      </div>
      <Link to="/agregar" className="nav-link " aria-current="page">
        <div
          className="d-grid gap-2 col-6 mx-auto"
          style={{ marginBottom: "10px" }}
        >
          <button className="btn btn-success" type="button">
            <i className="fa fa-save mx-2"></i>Agregar Compra
          </button>
        </div>
      </Link>
      <div className="container">
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#AEAEAE" }} className="text-center">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Cuenta</th>
              <th>Compra</th>
              <th>Total</th>
              <th>Opciones</th>
            </tr>
          </thead>
          {compras.map((c) => {
            return (
              <tbody key={c._id} className="text-center">
                <tr>
                  <td>{c._id}</td>
                  <td>{c.comprador.nombre}</td>
                  <td>No. {c.noCuenta}</td>
                  <td>{c.informacion}</td>
                  <td>Q. {c.dinero}</td>
                  <td>
                    <div className="d-grid gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          eliminar(c._id);
                        }}
                        style={{ backgroundColor: "#CD5C5C", border: "none" }}
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
