import axios from "axios";
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/movimiento/";

export const apiMisMovimientos = async(id) => {
    try {
        const movimiento = await axios.get(`${URL}mostrarMisMovimientosAdmin/${id}`);
        console.log(movimiento.data);
        return movimiento.data;
      } catch (error) {
        console.log(error);
      }
};
