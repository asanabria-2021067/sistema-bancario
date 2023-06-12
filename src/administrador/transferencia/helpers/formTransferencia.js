import Swal from "sweetalert2";
import { createTransferencia } from "../api/apiTransferencia";

export const sendData = async (state, option) => {
  let resultado;
  console.log(state.deposito);
  switch (option) {
    case 1:
      resultado = await createTransferencia({
        noCuenta: state.transferencia.noCuenta,
        emisor: state.transferencia.emisor,
        monto: state.transferencia.monto,
        fecha: state.transferencia.fecha,
        concepto: state.transferencia.concepto
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
