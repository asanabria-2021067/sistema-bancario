import React, { useEffect, useState } from "react";
import { NavBar } from "../NavbarCliente";
import { apiMisCuentas } from "../Cuenta/api/apiCuentas";
import { useNavigate } from "react-router-dom";

export const CuentaCredito = () => {
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
        <h1 class="display-4 font-weight-bold mb-4" id="">Mis cuentas</h1>
      </div>
      <div className="container containerCuentas">
        <div className="account-list">
          {misCuentas.map((c) => {
            if (c.tipoCuenta.tipo === "Plazo Fijo") {
              return null; // Omitir el renderizado de la cuenta
            }
            if(c.tipoCuenta.tipo === "Ahorro")  {
            return null; // Omitir el renderizado
            }
            return (
              <div key={c._id} className="account-card">
                <h3>Numero de cuenta: {c.noCuenta}</h3>
                <p>Tipo de cuenta: {c.tipoCuenta.tipo}</p>
                <p>Balance: {c.saldo}</p>
                <button
                  className="btn history-button"
                  onClick={() => navigate(`/credito/${c._id}`)}
                >
                  Credito
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
