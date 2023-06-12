import React, { useState } from "react";
import { NavBar } from "../NavbarCliente";
import Swal from "sweetalert2";
import { transferencia } from "./models/transferencia";
import { transferenciaEfectuada } from "./api/apiTransferencia";
import { useParams } from "react-router-dom";
import { apiDatos, apiMiCuenta } from "../Cuenta/api/apiCuentas";
import { useEffect } from "react";
import axios from "axios";

export const Transferencia = () => {
  const { id } = useParams();
  const [transferenciaData, setTransferenciaData] = useState(transferencia);
  const [misCuentas, setMisCuentas] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [receptor, setReceptor] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("GTQ");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [montoConvertido, setMontoConvertido] = useState(0);

  const viewMisCuentas = async () => {
    const getMisCuentas = await apiMiCuenta(id);
    console.log(getMisCuentas);
    setMisCuentas(getMisCuentas.cuentas);
    setUsuario(getMisCuentas.usuarioPropietario);
  };

  const viewUsuariosTransferencias = async () => {
    // RECEPTOR
    console.log("SE ENVIO EL RECEPTOR");
    const getUsuarios = await apiDatos(transferenciaData.noCuenta);
    if(getUsuarios){
    setReceptor(getUsuarios);
    }else{
      
      Swal.fire({
        icon: "error",
        title: "error",
        text: "No se encontro el usuario",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      })
    }
  };
  useEffect(() => {
    viewMisCuentas();
  }, []);

  useEffect(() => {
    if (transferenciaData.noCuenta.length === 10) {
      viewUsuariosTransferencias();
    } else {
      setReceptor([]); // Limpiar el receptor si no se proporciona un número de cuenta válido
    }
  }, [transferenciaData.noCuenta]);

  useEffect(() => {
    setTransferenciaData({
      ...transferenciaData,
      noCuentaEmisor: misCuentas.noCuenta,
    });
  }, [misCuentas]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    const resultado = await transferenciaEfectuada(transferenciaData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferenciaData({
      ...transferenciaData,
      [name]: value,
      monto: montoConvertido,
    });
  };

  // Divisas
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/cd26cf7eefb651fca75b4499/latest/${baseCurrency}`
        );
        const { data } = response;

        if (data.result === "success") {
          setExchangeRates(data.conversion_rates);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    if (baseCurrency) {
      fetchExchangeRates();
    }
  }, [baseCurrency]);

  useEffect(() => {
    if (targetCurrency && amount && exchangeRates[baseCurrency]) {
      const baseRate = exchangeRates[baseCurrency];
      const targetRate = exchangeRates[targetCurrency];
      const converted = (amount / baseRate) * targetRate;
      setConvertedAmount(converted);
      console.log(converted);
    }
  }, [targetCurrency, amount, baseCurrency, exchangeRates]);

  useEffect(() => {
    setMontoConvertido(convertedAmount);
  }, [convertedAmount]);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
    setConvertedAmount(0); // Restablecer el monto convertido cuando cambia la moneda base
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setConvertedAmount(0); // Restablecer el monto convertido cuando cambia el monto
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4 mb-4">
        <div className="transfer-container mt-4">
          <div
            className="card emisor-card"
            style={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="avatar-container">
              <img
                className="avatar rounded-circle"
                src={usuario.img}
                alt="Avatar"
              />
            </div>
            <div>
            <h5 className="mt-4"><strong>Usuario emisor:</strong> {usuario.nombreUsuario}</h5>
            <p className="mb-4" style={{color:"white"}}><strong>Saldo:</strong> Q.{misCuentas.saldo}</p>
            </div>
            <div className="input-container">
              <label className="labelTransferencia" htmlFor="accountNumber">
                Emisor:
              </label>
              <input
                className="inputTransferencia mx-3"
                type="number"
                id="accountNumber"
                name="noCuentaEmisor"
                value={misCuentas.noCuenta}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div
            className="card center-card"
            style={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Información de transferencia</h2>
            <div className="input-container">
              <label className="labelTransferencia" htmlFor="balance">
                Monto:
              </label>
              <select
                className="selectDivisas mx-2"
                value={baseCurrency}
                onChange={handleBaseCurrencyChange}
              >
                <option value="">$</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="GTQ">GTQ</option>
              </select>

              <input
                className="inputTransferencia mx-2"
                type="number"
                id="balance"
                name="monto"
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>
            {convertedAmount !== 0 && (
              <input
                className="conversion-result mt-2 mb-2"
                value={`${montoConvertido.toFixed(2)} GTQ`}
                readOnly
              />
            )}
            <div className="input-container mt-4">
              <label className="labelTransferencia" htmlFor="concept">
                Concepto:
              </label>
              <input
                className="inputTransferencia mx-3"
                type="text"
                id="concept"
                name="concepto"
                value={transferenciaData.concepto}
                onChange={handleInputChange}
                required
              />
            </div>
            <button className="btn mt-3" onClick={handleTransfer}>
              Transferir
            </button>
          </div>
          <div
            className="card receptor-card"
            style={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="avatar-container">
              <img
                className="avatar rounded-circle"
                src={receptor.img}
                alt="Avatar"
              />
            </div>
            <h5 className="mt-4"><strong>Usuario receptor:</strong> {receptor.nombreUsuario}</h5>
            <div className="input-container">
              <label className="labelTransferencia" htmlFor="accountNumber">
                Receptor:
              </label>
              <input
                className="inputTransferencia mx-3"
                type="number"
                id="accountNumber"
                name="noCuenta"
                value={transferenciaData.noCuenta}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
