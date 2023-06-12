import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, NavDropdown } from 'react-bootstrap';

export const NavBarLogin = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };
    return (
        <>
            <Navbar className="navbar bg-success  navFooter1">
                <div className="container">
                    <Navbar.Brand href="/">
                        <h3 style={{ color: "white" }}>Banco Del Bosque</h3>
                    </Navbar.Brand>
                    <ul className='nav nav-pills'>
                        <li className='nav-item'>
                            <a className="nav-link text-light bg-green ov-btn-grow-ellipse" href="/">
                                <i className="bi bi-box-arrow-in-right iniciarSesion"> Regresar al Inicio</i>
                            </a>
                        </li>
                       
                    </ul>
                </div>
            </Navbar>
        </>
    );
}
