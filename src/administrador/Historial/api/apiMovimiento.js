import axios from "axios";
const URL = "http://localhost:8080/api/movimiento/";

export const apiMisMovimientos = async() => {
    try {
        const movimiento = await axios.get(`${URL}cuentasMasMovimiento`);
        console.log(movimiento.data);
        return movimiento.data;
      } catch (error) {
        console.log(error);
      }
};

export const apiMenosMovimiento = async() => {
  try {
      const movimiento = await axios.get(`${URL}cuentasMenosMovimiento`);
      console.log(movimiento.data);
      return movimiento.data;
    } catch (error) {
      console.log(error);
    }
};
