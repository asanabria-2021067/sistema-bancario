import React, { useEffect, useState } from "react";
import { NavBar } from "../NavbarCliente";
import { useNavigate } from "react-router-dom";
import { apiMisCuentas } from "../Cuenta/api/apiCuentas";

export const CuentaFavoritos = () => {
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
          {misCuentas.map((c) => (
            <div key={c._id} className="account-card">
              <h3>Numero de cuenta: {c.noCuenta}</h3>
              <p>Tipo de cuenta: {c.tipoCuenta.tipo}</p>
              <p>Balance: {c.saldo}</p>
              <button
                className="btn history-button"
                href={`/favoritos?id=${c._id}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/favoritos/${c.noCuenta}`);
                }}
              >
                Favoritos
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
