import axios from "axios";
import Swal from "sweetalert2";
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/compra/";

export const apiCompras = async () => {
  try {
    const response = await axios.get(`${URL}mostrar`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteTarea = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}eliminar/${id}`);

    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "Compra Eliminada") {
      window.location.href = "/login";
    }
    if (message) {
      return message;
    }
  }
};

export const createCompra = async (noCuenta, informacion, dinero) => {
  console.log(noCuenta)
  try {
    const { compraGuardada } = await axios.post(`${URL}agregar`, 
    {
      noCuenta: noCuenta.noCuenta,
      dinero: noCuenta.dinero,
      informacion: noCuenta.informacion,
    },
    );
    return true;
  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo agregar la compra.",
    });
  }
};
