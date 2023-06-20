import React from "react";
import { NavBar } from "./NavbarCliente";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Footer } from "../Principal/components/Footer";
export const Principal = () => {
 
  return (
    <>
    <NavBar/>
      <div className="banca-virtual">
      <div className="divTitulo"
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
          <h1 className="mb-4">Banco del bosque</h1>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="cards">
              <div className="card col-12 col-md-12">
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
                  <i className="fa fa-money-bill-transfer mx-2"></i>Realizar Transferencia
                </a>
              </div>
              <div className="card col-12 col-md-12">
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
                <i class="fa fa-dollar mx-2"></i>Pedir un Crédito
                </a>
              </div>
              <div className="card col-12 col-md-12">
                <img
                  src="https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-vector-edit-profile-icon-png-image_779270.jpg"
                  alt="Icono Crédito"
                  className="card-icon"
                />
                <h2>Perfil</h2>
                <p>Realice gestiones de su perfil</p>
                <a href="/miPerfil" className="btn card-link">
                  <i className="fa fa-user mx-2"></i>Ir a mi perfil
                </a>
              </div>
              <div className="card col-12 col-md-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5783/5783122.png"
                  alt="Icono Perfil"
                  className="card-icon"
                />
                <h2>Conversor de divisas</h2>
                <p>Visualice cambios monetarios</p>
                <a href="/divisas" className="btn card-link">
                  <i className="fa fa-money-bill mx-2"></i>Ver divisas
                </a>
              </div>
              <div className="card col-12 col-md-12">
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
                  <i className="fa-solid fa-credit-card mx-2"></i>Ver mis cuentas
                </a>
              </div>
              <div className="card col-12 col-md-12">
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
                <i class="fa fa-clock-rotate-left mx-2"></i>Ver mis historiales
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
                    <i className="fa fa-star mx-2"></i>Ver mis favoritos
                  </a>
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </div>
        
      </div>
      <Footer></Footer>
    </>
  );
};
