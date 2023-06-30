import axios from "axios";
import Swal from "sweetalert2";
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/credito/";
const token = localStorage.getItem("token");
export const apiCredito = async () => {
    try {
      const listaCredito = await axios.get(`${URL}mostrar`);
      console.log(listaCredito.data);
      return listaCredito.data;
    } catch (error) {}
};

export const DeleteCreditos = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}eliminar/${id}`);  
    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "Adiós papu") {
      window.location.href = "/login";
    }
    if (message) {
      return message;
    }
  }
};

export const createCreditos = async ( noCuenta) => {
  console.log(noCuenta);
  try {
    const { creditoGuardado } = await axios.post(
      `${URL}agregar`,
      {
        monto: noCuenta.monto, 
        intereses: noCuenta.intereses,
      }, {headers:{'x-token': token}}
    );
    return true;
  } catch (error){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo agregar el evento.",
    });
  }
};