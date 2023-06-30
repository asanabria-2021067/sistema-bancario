import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "http://localhost:8080/api/transferencia/";
export const transferenciaEfectuada = async (transferencia) => {
    try {
      const response = await axios.post(`${URL}agregar/`, {
        noCuentaEmisor: transferencia.noCuentaEmisor,
        noCuenta: transferencia.noCuenta,
        monto: transferencia.monto,
        concepto: transferencia.concepto,
      }, { headers: { "x-token": token } });
  
      console.log(response);
     return response;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error, // Mostrar el mensaje de error específico enviado desde el backend
      }).then(() => {
        window.location.reload();
      });
      return false;
    }
  };

  export const ultimaTransferencia = async () => {
    try {
      const respuesta = await axios.get(`${URL}ultimaTransferencia`, { headers: { "x-token": token } });
      return respuesta.data
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error, // Mostrar el mensaje de error específico enviado desde el backend
      });
    }
  }