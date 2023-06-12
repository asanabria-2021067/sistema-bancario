import React, { useEffect, useState } from "react";
import { NavBar } from "../NavbarCliente";
import { apiMisCuentas } from "../Cuenta/api/apiCuentas";
import { useNavigate } from "react-router-dom";

export const CuentaTransferencia = () => {
  const navigate = useNavigate();
  const [misCuentas, setMisCuentas] = useState([]);
  const viewMisCuentas = async () => {
    const getMisCuentas = await apiMisCuentas();
    setMisCuentas(getMisCuentas);
  };
  useEffect(() => {
    viewMisCuentas();
  }, []);
  return (
    <>
      <NavBar />
      <div className="container containerCuentas">
        <div className="title-container">
          <h1 className="h1">Mis Cuentas</h1>
        </div>
        <div className="account-list">
          {misCuentas.map((c) => {
            if (c.tipoCuenta.tipo === "Plazo Fijo") {
              return null; // Omitir el renderizado de la cuenta
            }
            return (
              <div key={c._id} className="account-card">
                <h3>Numero de cuenta: {c.noCuenta}</h3>
                <p>Tipo de cuenta: {c.tipoCuenta.tipo}</p>
                <p>Balance: {c.saldo}</p>
                <button
                  className="btn history-button"
                  onClick={() => navigate(`/transferencia/${c._id}`)}
                >
                  Transferencia
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};