import axios from "axios";
const URL = "http://localhost:8080/api/movimiento/";

export const apiMisMovimientos = async(id) => {
    try {
        const movimiento = await axios.get(`${URL}mostrarMisMovimientosAdmin/${id}`);
        console.log(movimiento.data);
        return movimiento.data;
      } catch (error) {
        console.log(error);
      }
};
