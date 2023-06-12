import React from "react";
import { NavBar } from "./NavbarCliente";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
export const Principal = () => {
 
  return (
    <>
    <NavBar/>
      <div className="banca-virtual">
        <header className="banca-virtual-header">
          <h1>Banco de Bosques</h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="cards">
              <div className="card">
                <img
                  src="https://w7.pngwing.com/pngs/996/236/png-transparent-money-transfer-banking-icon-buy-communication-concept-customer-deposit-design.png"
                  alt="Icono Transferencia"
                  className="card-icon"
                />
                <h2>Transferencia</h2>
                <p>
                  Realiza transferencias de dinero de manera segura y rápida.
                </p>
                <a href="/cuentaTransferencia" className="btn card-link">
                  Realizar Transferencia
                </a>
              </div>
              <div className="card">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/273/273546.png"
                  alt="Icono Crédito"
                  className="card-icon"
                />
                <h2>Crédito</h2>
                <p>
                  Administra tus tarjetas de crédito y realiza pagos fácilmente.
                </p>
                <a href="/cuentasCredito" className="btn card-link">
                  Pedir un Crédito
                </a>
              </div>
              <div className="card">
                <img
                  src="https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-vector-edit-profile-icon-png-image_779270.jpg"
                  alt="Icono Crédito"
                  className="card-icon"
                />
                <h2>Perfil</h2>
                <p>Realice gestiones de su perfil</p>
                <a href="/miPerfil" className="btn card-link">
                  Ir a mi perfil
                </a>
              </div>
              <div className="card">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5783/5783122.png"
                  alt="Icono Perfil"
                  className="card-icon"
                />
                <h2>Conversor de divisas</h2>
                <p>Visualice cambios monetarios</p>
                <a href="/divisas" className="btn card-link">
                  Ver divisas
                </a>
              </div>
              <div className="card">
                <img
                  src="https://images.vexels.com/media/users/3/129922/isolated/lists/3e8c93dfdbd9ddbfec6f14c8eb56d580-icono-de-circulo-de-tarjetas-de-credito.png"
                  alt="Icono Perfil"
                  className="card-icon"
                />
                <h2>Mis Cuentas</h2>
                <p>
                  Actualiza tus datos personales y configura tus preferencias.
                </p>
                <a href="/cuentasVista" className="btn card-link">
                  Ver mis cuentas
                </a>
              </div>
              <div className="card">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2852/2852376.png"
                  alt="Icono Perfil"
                  className="card-icon"
                />
                <h2>Historial</h2>
                <p>
                  Actualiza tus datos personales y configura tus preferencias.
                </p>
                <a href="/cuentas" className="btn card-link">
                  Ver mis historiales
                </a>
              </div>
            </div>
            <div className="row mt-3 mb-4">
              <div className="col-md-1"></div>
              <div className="col-12 col-md-10 d-flex justify-content-center">
                <div className="card ms-5" style={{ width: "60%" }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4863/4863906.png"
                    alt="Icono Perfil"
                    className="card-icon"
                  />
                  <h2>Favoritos</h2>
                  <p>
                    Actualiza tus datos personales y configura tus preferencias.
                  </p>
                  <a href="/cuentasFavoritos" className="btn card-link">
                    Ver mis favoritos
                  </a>
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
