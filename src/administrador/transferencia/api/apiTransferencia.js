import axios from "axios";
import Swal from "sweetalert2";
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/transferencia/";
const token = localStorage.getItem("token");

export const apiTransferencia = async () => {
    try {
        const listaTransferencia = await axios.get(`${URL}mostrar`,  {headers:{'x-token': token}});
        console.log(listaTransferencia.data);
        return listaTransferencia.data;
    } catch (error) { }
};

export const DeleteTransferencia = async (id) => {
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