import Swal from "sweetalert2";
import { createTipoCuenta } from "../Api/apiTipoCuenta";


export const sendData = async (state, option) => {
    let resultado;
    console.log(state.tipoCuenta);
    switch (option) {
        case 1:
            resultado = await createTipoCuenta({
                tipo: state.tipoCuenta.tipo
            });
            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Tipo Cuenta agregado correctamente!",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/listaTipoCuentaAdmin"
                    } else {
                        window.location.href = "/listaTipoCuentaAdmin"
                    }
                });
            }
            break;
    }
};