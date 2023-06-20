import axios from "axios";
import Swal from "sweetalert2";
const URL = "http://localhost:8080/api/deposito/";

export const apiDeposito = async () => {
    try {
        const listaDeposito = await axios.get(`${URL}mostrar`);
        console.log(listaDeposito.data);
        return listaDeposito.data;
    } catch (error) { }
};

export const DeleteDepositos = async (id) => {
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

export const createDeposito = async (noCuenta, dinero) => {
    console.log(noCuenta);
    try {
        const { depositoGuardado } = await axios.post(
            `${URL}agregar`,
            {
                noCuenta: noCuenta.noCuenta, dinero: noCuenta.dinero
            },
        );
        return true;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
        });
    }
};

