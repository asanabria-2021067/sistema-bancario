import Swal from "sweetalert2";
import { createDeposito } from "../api/apiDeposito";

export const sendData = async (state, option) => {
  let resultado;
  console.log(state.deposito);
  switch (option) {
    case 1:
      resultado = await createDeposito({
        noCuenta: state.deposito.noCuenta,
        dinero: state.deposito.dinero,
      });
      if (resultado) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "deposito agregado correctamente!",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/listaDeposito";
          } else {
            window.location.href = "/listaDeposito";
          }
        });
      }
      break;
  }
};
