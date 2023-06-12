import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiAgregarCuenta } from '../api/apiCuenta';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const token = localStorage.getItem("token");

export const AgregarCuenta = () => {
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState('');
  const [tiposCuenta, setTiposCuenta] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchTiposCuenta = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tipoCuenta/mostrar');
        setTiposCuenta(response.data);
      } catch (error) {
        console.error('Error al obtener los tipos de cuenta:', error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuario/mostrar', {
          headers: { "x-token": token }
        });

        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchTiposCuenta();
    fetchUsuarios();
  }, []);


  const agregarCuenta = async () => {
  setError('');

  // Validar campos vacíos
  if (!tipoCuenta || !usuario) {
    setError('Por favor, seleccione un tipo de cuenta y un usuario.');
    return;
  }

  try {
    const nuevaCuenta = {
      tipoCuenta: tipoCuenta,
      usuario: usuario,
    };

    const cuentaGuardada = await apiAgregarCuenta(nuevaCuenta);

    // Mostrar alerta de éxito
    await Swal.fire({
      title: 'Éxito',
      text: 'Cuenta agregada correctamente',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    console.log('Cuenta agregada correctamente:', cuentaGuardada);

    setTipoCuenta('');
    setUsuario('');

    // Redireccionar a la vista de lista de cuentas después de presionar OK
    window.location.href = '/listaCuentas';
  } catch (error) {
    // Mostrar alerta de error
    let errorMessage = 'Error al agregar la cuenta. (El usuario ya tiene una cuenta monitaria)';

    // Verificar si el error contiene el mensaje en una propiedad específica
    if (error && error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }

    await Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK',
    });

  }
};

  

  const cancelar = () => {
    // Redireccionar a la vista de lista de cuentas
    window.location.href = '/listaCuentas';
  };

  return (
    <div className="container">
      <h1>Agregar Cuenta</h1>
      <br />
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label htmlFor="tipoCuenta" className="form-label">
          Tipo de cuenta:
        </label>
        <select
          className="form-select"
          id="tipoCuenta"
          value={tipoCuenta}
          onChange={(e) => setTipoCuenta(e.target.value)}
        >
          <option value="">Seleccionar tipo de cuenta</option>
          {tiposCuenta.map((tipo) => (
            <option key={tipo._id} value={tipo._id}>
              {tipo.tipo}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="usuario" className="form-label">
          Usuario:
        </label>
        <select
          className="form-select"
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map((user) => (
            <option key={user._id} value={user._id}>
              {user.nombre} - {user.nombreUsuario}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={agregarCuenta}>
      <i className="fa fa-save mx-2"></i>Agregar Cuenta
      </button>

    </div>
  );
};