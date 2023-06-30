import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { NavBar } from "../NavbarCliente";
import { transferencia } from "./models/transferencia";
import { transferenciaEfectuada } from "./api/apiTransferencia";
import { apiDatos, apiMiCuenta } from "../Cuenta/api/apiCuentas";
import "sweetalert2/dist/sweetalert2.css";

const MySwal = withReactContent(Swal);

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
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transferCompleted, setTransferCompleted] = useState(false);

  useEffect(() => {
    const viewMisCuentas = async () => {
      try {
        const getMisCuentas = await apiMiCuenta(id);
        setMisCuentas(getMisCuentas.cuentas);
        setUsuario(getMisCuentas.usuarioPropietario);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    viewMisCuentas();
  }, [id]);

  useEffect(() => {
    const viewUsuariosTransferencias = async () => {
      try {
        if (transferenciaData.noCuenta.length === 10) {
          const getUsuarios = await apiDatos(transferenciaData.noCuenta);
          if (getUsuarios) {
            setReceptor(getUsuarios);
          } else {
            MySwal.fire({
              icon: "error",
              title: "Error",
              text: "No se encontró el usuario",
              showConfirmButton: true,
              confirmButtonText: "Ok",
            });
          }
        } else {
          setReceptor([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    viewUsuariosTransferencias();
  }, [transferenciaData.noCuenta]);

  useEffect(() => {
    setTransferenciaData((prevData) => ({
      ...prevData,
      noCuentaEmisor: misCuentas.noCuenta,
    }));
  }, [misCuentas]);

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
    }
  }, [targetCurrency, amount, baseCurrency, exchangeRates]);

  useEffect(() => {
    setMontoConvertido(convertedAmount);
  }, [convertedAmount]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      Swal.fire({
        title: ` Transferencia a: ${receptor.nombreUsuario} en progreso`,
        html: `
          <div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <hr/>
            <p>transfiriendo Q${montoConvertido.toFixed(2)} a la cuenta:  ${transferenciaData.noCuenta}</p>
          </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          const progressBar = document.querySelector(".progress-bar");
          const increaseProgress = async () => {
            setProgress((prevProgress) => {
              if (prevProgress < 100) {
                const newProgress = prevProgress + 10;
                progressBar.style.width = `${newProgress}%`;
                return newProgress;
              }
              return prevProgress;
            });

            if (parseInt(progressBar.style.width) > 80 && transferCompleted == false) {
              setTransferCompleted(true);
              const resultado = await transferenciaEfectuada(transferenciaData);
              console.log("Respuesta", resultado);

              if (resultado) {
                progressBar.style.width = `0%`;
                Swal.fire({
                  icon: "success",
                  title: "Genial!",
                  text: "Transferencia realizada exitosamente",
                  showConfirmButton: true,
                  confirmButtonText: "Ok",
                }).then(() => {
                  window.location.href = "/comprobanteTransferencia";
                  
                });
              } else {
                progressBar.style.width = `0%`;
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: response.data.error,
                }).then(() => {
                  window.location.reload();
                });
                
              }
            }
          };

          const interval = setInterval(increaseProgress, 1000);

          return () => {
            clearInterval(interval);
          };
        },
      });
    } catch (error) {
      console.error("Error during transfer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferenciaData((prevData) => ({
      ...prevData,
      [name]: value,
      monto: montoConvertido,
    }));
  };

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
    setConvertedAmount(0);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setConvertedAmount(0);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const isCurrencySelected = baseCurrency !== "";

  return (
    <>
      <NavBar />
      <br /><br />
      <div className="container mt-5 mb-5 ">
        <div className="card transferencia-card card-hotel">
          <div className="card-body d-flex flex-column">
            <div className="row">
              <div className="col-md-4">
                <div className="avatar-container">
                  <img
                    className="avatar rounded-circle"
                    src={usuario.img}
                    alt="Avatar"
                  />
                </div>
                <h5 className="card-title mt-4">
                  <strong>Usuario emisor:</strong> {usuario.nombreUsuario}
                </h5>
                <p className="card-text mb-4">
                  <strong>Saldo:</strong> Q.{misCuentas.saldo}
                </p>
                <p className="card-text mb-4">
                  <strong>Cuenta de salida :</strong> {misCuentas.noCuenta}
                </p>
              </div>
              <div className="col-md-4">
                <h3 className="text-center">
                  <i className="fas fa-exchange-alt"></i>
                </h3>
                <h5 className="text-center">Datos de la transferencia</h5>
                <form onSubmit={handleTransfer}>
                  <div className="form-group">
                    <label htmlFor="recipientAccountNumber">
                      Cuenta de destino:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="recipientAccountNumber"
                      name="noCuenta"
                      value={transferenciaData.noCuenta}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount">Monto:</label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="number"
                        id="amount"
                        name="monto"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                      <div className="input-group-append">
                        <select
                          className="form-control"
                          id="currency"
                          name="baseCurrency"
                          value={baseCurrency}
                          onChange={handleBaseCurrencyChange}
                          required
                        >
                          <option value="">Seleccionar moneda</option>
                          <option value="GTQ">GTQ</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipientAccountNumber">
                      Concepto:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="concept"
                      name="concepto"
                      value={transferenciaData.concepto}
                      onChange={handleInputChange}
                      required={isCurrencySelected}
                      disabled={!isCurrencySelected}
                    />
                  </div>

                  <button
                    className="btn btn-primary transferir"
                    type="submit"
                    disabled={isLoading || !isCurrencySelected}
                  >
                    {isLoading ? (
                      <span>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Cargando...</span>
                      </span>
                    ) : (
                      "Transferir"
                    )}
                  </button>
                </form>
              </div>
              <div className="col-md-4">
                <div className="avatar-container">
                  <img
                    className="avatar rounded-circle"
                    src={receptor.img}
                    alt="Avatar"
                  />
                </div>
                <h5 className="card-title mt-4">
                  <strong>Usuario receptor:</strong> {receptor.nombreUsuario}
                </h5>
                <p className="card-text">
                  <strong>Saldo:</strong> Q.{montoConvertido}
                </p>
                <p className="card-text">
                  <strong>Cuenta de entrada:</strong> {transferenciaData.noCuenta}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

