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
      <div className="container containerCuentas">
      <div className="title-container">
          <h1 className="h1">Mis Cuentas</h1>
        </div>
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
