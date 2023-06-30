import axios from 'axios';
import Swal from 'sweetalert2';
const token = localStorage.getItem("token");

const URL = 'https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/cuenta';

export const obtenerCuentas = async () => {
  try {
    const response = await axios.get(`${URL}/mostrar`);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};


export const apiAgregarCuenta = async (nuevaCuenta) => {
  try {
    const response = await axios.post(`${URL}/agregar`, nuevaCuenta, {
      headers: { "x-token": token }
    });
    return response.data.cuenta;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:  error.response.data.message
    });
    throw new Error(error.response.data.error);
  }
};


export const apiEliminarCuenta = async (id) => {
  try {
    const response = await axios.delete(`${URL}/eliminar/${id}`);

    if (response.status === 200) {
      Swal.fire({
        title: 'Cuenta eliminada',
        text: 'La cuenta ha sido eliminada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } else {
      throw new Error('Error al eliminar la cuenta');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'No se pudo eliminar la cuenta.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    throw new Error(error.response.data.message);
  }
};

