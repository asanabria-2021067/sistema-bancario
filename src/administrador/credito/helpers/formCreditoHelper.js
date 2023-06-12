import Swal from "sweetalert2";
import { createCreditos } from "../api/apiCredito";

export const sendData = async (state, option) => {
  let resultado;
  console.log(state.credito);
  switch (option) {
    case 1:
      resultado = await createCreditos({
        monto: state.credito.monto,
        intereses: state.credito.intereses,
      });
      if (resultado) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Hotel agregado correctamente!",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/listaCreditosAdmin";
          } else {
            window.location.href = "/listaCreditosAdmin";
          }
        });
      }
      break;
  }
};
