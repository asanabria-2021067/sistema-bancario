import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown, NavDropdown, Table } from "react-bootstrap";
import { apiBancosGet } from "./api/apiBanco";
import { apiCuentaGet } from "./api/apiCuenta";
import { Link } from 'react-scroll';
export const NavBar = () => {
  const [listaBanco, setListaBanco] = useState([]);
  const [listaCuenta, setListaCuenta] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownBanco, setShowDropdownBanco] = useState(false);
  const [showDropdownCuenta, setShowDropdownCuenta] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  const handleMouseEnterCuenta = () => {
    setShowDropdownCuenta(true);
  };

  const handleMouseLeaveCuenta = () => {
    setShowDropdownCuenta(false);
  };

  const handleMouseEnterBanco = () => {
    setShowDropdownBanco(true);
  };

  const handleMouseLeaveBanco = () => {
    setShowDropdownBanco(false);
  };

  const viewBanco = async () => {
    const bancoList = await apiBancosGet();
    setListaBanco(bancoList);
  };
  const viewCuenta = async () => {
    const cuentaList = await apiCuentaGet();
    setListaCuenta(cuentaList);
  };

  useEffect(() => {
    viewBanco();
    viewCuenta();
  }, []);

  return (
    <>
      <Navbar className="navbar bg-success navColor1">
        <div className="container">
          <Navbar.Brand href="/">
            <h3 style={{ color: "white" }}>Banco Del Bosque</h3>
          </Navbar.Brand>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                className="nav-link text-light bg-green ov-btn-grow-ellipse"
                href="/login"
              >
                <i className="bi bi-box-arrow-in-right iniciarSesion">
                  {" "}
                  Iniciar Sesion
                </i>
              </a>
            </li>
          </ul>
        </div>
      </Navbar>
      <Navbar className="navbar-expand-md bg-success navColor">
        <div className="container justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-4">
              <a className="nav-link text-white letrasDoradads" href=""></a>
            </li>
            <li className="nav-item mx-4">
            <Link to="cards" smooth={true} duration={500} easing="easeInOutQuart">
                <a className="nav-link text-white letrasDoradads" href="#cards">
                  Servicios de BDB
                </a>
              </Link>
            </li>

            <li
              className="nav-item mx-4"
              onMouseEnter={handleMouseEnterCuenta}
              onMouseLeave={handleMouseLeaveCuenta}
            >
              <NavDropdown
                title="Bancos Asociados"
                id="contact-dropdown"
                show={showDropdownCuenta}
                className="custom-dropdown"
              >
                {listaBanco.map((t) => {
                  return (
                    <li key={t._id}>
                      <NavDropdown.Item href="#action1">
                        <img className="imaBancos" src={t.img} /> - {t.nombre}
                      </NavDropdown.Item>
                    </li>
                  );
                })}
              </NavDropdown>
            </li>

            <li
              className="nav-item mx-4"
              onMouseEnter={handleMouseEnterBanco}
              onMouseLeave={handleMouseLeaveBanco}
            >
              <NavDropdown
                title="Cuentas de BDB"
                id="contact-dropdown"
                show={showDropdownBanco}
                className="custom-dropdown"
              >
                {listaCuenta.map((t) => {
                  return (
                    <li key={t._id}>
                      <NavDropdown.Item href="#action1">
                        {t.tipo}
                      </NavDropdown.Item>
                    </li>
                  );
                })}
              </NavDropdown>
            </li>

            <li className="nav-item mx-4">
              <a className="nav-link text-white" href="#">
                Funcionalidad de BDB
              </a>
            </li>

            <li
              className="nav-item mx-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown
                title="Contactanos"
                id="contact-dropdown"
                show={showDropdown}
                className="custom-dropdown"
              >
                <NavDropdown.Item href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=davidjosueaq2004@gmail.com">
                  Correo Electrónico
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
        </div>
      </Navbar>
    </>
  );
};
