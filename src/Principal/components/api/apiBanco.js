import axios from "axios";

const URL = 'https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/banco';

// Mostrar Informacion
export const apiBancosGet = async () => {
  try {
    const response = await axios.get(`${URL}/mostrar`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    // Manejar errores de conexión o del backend
    console.error('Error:', error.response);
    throw new Error('Error al obtener la información de los bancos');
  }
};
