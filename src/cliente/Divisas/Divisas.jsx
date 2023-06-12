import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "../NavbarCliente";

export const Divisas = () => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

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

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4 mb-4">
      <div className="title-container">
          <h1 className="h1 mb-3">Conversor Divisas</h1>
        </div>
        <div className="currency-converter mt-2">
          <div className="input-group">
            <label className="labelDivisas">Moneda de conversión</label>
            <select
              className="selectDivisas"
              value={baseCurrency}
              onChange={handleBaseCurrencyChange}
            >
              <option value="">Seleccionar moneda</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="GTQ">GTQ</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="CNY">CNY</option>
              <option value="DKK">DKK</option>
              <option value="HKD">HKD</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="MXN">MXN</option>
              <option value="NZD">NZD</option>
              <option value="SEK">SEK</option>
              <option value="SGD">SGD</option>
              <option value="ZAR">ZAR</option>
              <option value="BRL">BRL</option>
              <option value="TRY">TRY</option>
              <option value="RUB">RUB</option>
              <option value="NOK">NOK</option>
              <option value="PLN">PLN</option>
              <option value="CZK">CZK</option>
              <option value="HUF">HUF</option>
              <option value="THB">THB</option>
              <option value="IDR">IDR</option>
              <option value="ISK">ISK</option>
              <option value="PHP">PHP</option>
              <option value="HRK">HRK</option>
              <option value="BGN">BGN</option>
              <option value="RON">RON</option>
              <option value="KRW">KRW</option>
            </select>
          </div>
          <div className="input-group">
            <label className="labelDivisas">Moneda a convertir:</label>
            <select
              className="selectDivisas"
              value={targetCurrency}
              onChange={handleTargetCurrencyChange}
            >
              <option value="">Seleccionar moneda</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="GTQ">GTQ</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="CNY">CNY</option>
              <option value="DKK">DKK</option>
              <option value="HKD">HKD</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="MXN">MXN</option>
              <option value="NZD">NZD</option>
              <option value="SEK">SEK</option>
              <option value="SGD">SGD</option>
              <option value="ZAR">ZAR</option>
              <option value="BRL">BRL</option>
              <option value="TRY">TRY</option>
              <option value="RUB">RUB</option>
              <option value="NOK">NOK</option>
              <option value="PLN">PLN</option>
              <option value="CZK">CZK</option>
              <option value="HUF">HUF</option>
              <option value="THB">THB</option>
              <option value="IDR">IDR</option>
              <option value="ISK">ISK</option>
              <option value="PHP">PHP</option>
              <option value="HRK">HRK</option>
              <option value="BGN">BGN</option>
              <option value="RON">RON</option>
              <option value="KRW">KRW</option>
            </select>
          </div>
          <div className="input-group">
            <label className="labelDivisas">Monto:</label>
            <input
              type="number"
              className="selectDivisas"
              value={amount}
              onChange={handleAmountChange}
              step="0.01"
            />
          </div>
          {convertedAmount !== 0 && (
            <p className="conversion-result">
              Monto convertido: {amount} {baseCurrency} ={" "}
              {convertedAmount.toFixed(2)} {targetCurrency}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
