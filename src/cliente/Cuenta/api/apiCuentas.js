import axios from "axios";
const token = localStorage.getItem("token");
const URL = "http://localhost:8080/api/cuenta/";

export const apiMisCuentas = async() => {
    try {
        const cuentas = await axios.get(`${URL}misCuentas/`, { headers: { "x-token": token } });
        console.log(cuentas.data);
        return cuentas.data;
      } catch (error) {
        console.log(error);
      }
};

export const apiMiCuenta = async(id) => {
  try {
      const cuentas = await axios.get(`${URL}miCuenta/${id}`, { headers: { "x-token": token } });
      console.log(cuentas.data);
      return cuentas.data;
    } catch (error) {
      console.log(error);
    }
};

export const apiDatos = async(id) => {
  console.log(id);
  try {
      const cuentas = await axios.get(`${URL}datosUsuario/${id}`, { headers: { "x-token": token } });
      console.log(cuentas.data);
      return cuentas.data;
    } catch (error) {
      console.log(error);
    }
};
