import React, { useState, useEffect } from "react";
import { apiCreditos, aplicarCredito } from "./api/apiCreditos";
import { NavBar } from "../NavbarCliente";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const Creditos = () => {
  const [creditos, setCreditos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const obtenerCreditos = async () => {
      try {
        const getCreditos = await apiCreditos();
        setCreditos(getCreditos);
      } catch (error) {
        console.error("Error al obtener los créditos:", error);
      }
    };

    obtenerCreditos();
  }, []);

  const creditoAplicar = async (id, credito) => {
    event.preventDefault();
    const response = await aplicarCredito(id, credito);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Genial!",
        text: "Se aplico al credito correctamente!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo aplicar.",
      });
    }
  };

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
        <h1 class="display-4 font-weight-bold mb-4" id="">Creditos</h1>
      </div>
      <div className="container">
        
        {creditos.length === 0 ? (
          <p>No hay créditos disponibles en este momento.</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>Número de Crédito</th>
                <th>Intereses</th>
                <th>Monto</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {creditos.map((credito) => (
                <tr key={credito._id}>
                  <td>{credito.numeroCredito}</td>
                  <td>{credito.intereses}%</td>
                  <td>{credito.monto}</td>
                  <td>
                    {" "}
                    <button
                      className="btn"
                      onClick={() => creditoAplicar(id, credito._id)}
                    >
                      <i className="fa fa-check mx-2"></i> Aplicar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};
