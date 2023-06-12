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
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Transferencia realizada existosamente",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/cuentaTransferencia";
            } else {
                window.location.reload();
            }});
        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.error, // Mostrar el mensaje de error específico enviado desde el backend
        });
        return false;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error, // Mostrar el mensaje de error específico enviado desde el backend
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