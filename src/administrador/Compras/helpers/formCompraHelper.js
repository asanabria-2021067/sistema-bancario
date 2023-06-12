import Swal from "sweetalert2";
import { createCompra } from "../api/apiCompras";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  noCuenta: Yup.string().required("El número de cuenta es obligatorio"),
  informacion: Yup.string().required("La información es obligatoria"),
  dinero: Yup.number().required("El monto de dinero es obligatorio"),
});

export const sendData = async (state, option) => {
  let resultado;
  console.log(state.compra);
  switch (option) {
    case 1:
      try {
        await schema.validate(state.compra, { abortEarly: false });

        resultado = await createCompra({
          noCuenta: state.compra.noCuenta,
          informacion: state.compra.informacion,
          dinero: state.compra.dinero,
        });
        if (resultado) {
          Swal.fire({
            icon: "success",
            title: "Genial!",
            text: "Compra Agregada correctamente!",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/listaCompras";
            } else {
              window.location.href = "/listaCompras";
            }
          });
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          // Mostrar una alerta de Swal indicando los campos faltantes
          const missingFields = error.inner.map((err) => err.path);
          Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: `Por favor, complete los campos obligatorios: ${missingFields.join(
              ", "
            )}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
        }
      }
      break;
  }
};
