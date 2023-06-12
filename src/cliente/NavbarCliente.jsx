import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown, NavDropdown, Table } from "react-bootstrap";

export const NavBar = () => {
  const [compraDolares, setCompraDolares] = useState(0);
  const [ventaDolares, setVentaDolares] = useState(0);
  const [compraPesos, setCompraPesos] = useState(0);
  const [ventaPesos, setVentaPesos] = useState(0);
  const [compraEuros, setCompraEuros] = useState(0);
  const [ventaEuros, setVentaEuros] = useState(0);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/GTQ"
        );
        const { rates } = response.data;
        const compraDolares = 1 / rates.USD;
        const compraPesos = 1 / rates.MXN;
        const compraEuros = 1 / rates.EUR;
        setCompraDolares(compraDolares);
        setCompraPesos(compraPesos);
        setCompraEuros(compraEuros);
        setVentaDolares(compraDolares - 0.15);
        setVentaPesos(compraPesos - 0.09);
        setVentaEuros(compraEuros - 0.05);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <>
      <Navbar className="navbar bg-success navColor1">
        <div className="container">
          <Navbar.Brand href="/principalCliente">
            <img
              src="https://bancodebosques.org/wp-content/uploads/2021/09/bdb-logo.svg"
              style={{ width: "30%" }}
              alt="Banco de Bosques"
            />
          </Navbar.Brand>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                className="nav-link text-light bg-green ov-btn-grow-ellipse"
                href="/login"
              >
                <i className="bi bi-box-arrow-in-right iniciarSesion">
                  {" "}
                  Cerrar Sesion
                </i>
              </a>
            </li>
          </ul>
        </div>
      </Navbar>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container justify-content-center">
          <div
            className="navbar-text"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span
              style={{
                fontWeight: "bold",
                flex: "1",
                minWidth: "70px",
              }}
            >
              Dólar:
            </span>
            <span
              style={{
                color: "#FFC107",
                flex: "1",
                marginRight: "5px",
                minWidth: "120px",
              }}
            >
              COMPRA: Q{compraDolares.toFixed(2)}
            </span>
            <span
              style={{
                flex: "1",
                marginRight: "9px",
              }}
            >
              |
            </span>
            <span
              style={{
                color: "#28A745",
                flex: "1",
                marginRight: "5px",
                minWidth: "140px",
              }}
            >
              VENTA: Q{ventaDolares.toFixed(2)}
            </span>
            <span
              style={{
                fontWeight: "bold",
                flex: "1",
                minWidth: "60px",
              }}
            >
              Peso:
            </span>
            <span
              style={{
                color: "#FFC107",
                flex: "1",
                marginRight: "5px",
                minWidth: "120px",
              }}
            >
              COMPRA: Q{compraPesos.toFixed(2)}
            </span>
            <span
              style={{
                flex: "1",
                marginRight: "9px",
              }}
            >
              |
            </span>
            <span
              style={{
                color: "#28A745",
                flex: "1",
                marginRight: "15px",
                minWidth: "120px",
              }}
            >
              VENTA: Q{ventaPesos.toFixed(2)}
            </span>
            <span
              style={{
                fontWeight: "bold",
                marginRight: "5px",
                flex: "1",
                minWidth: "50px",
              }}
            >
              Euro:
            </span>
            <span
              style={{
                color: "#FFC107",
                marginRight: "10px",
                flex: "1",
                minWidth: "120px",
              }}
            >
              COMPRA: Q{compraEuros.toFixed(2)}
            </span>
            <span
              style={{
                flex: "1",
                marginRight: "9px",
              }}
            >
              |
            </span>
            <span
              style={{
                color: "#28A745",
                marginRight: "10px",
                flex: "1",
                minWidth: "120px",
              }}
            >
              VENTA: Q{ventaEuros.toFixed(2)}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};
