import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiPostBanco, apiPutBanco } from "../api/apiBancos";

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es obligatorio'),
    
});

export const sendData = async (bancos, option) => {
    try {
        await validationSchema.validate(bancos, { abortEarly: false });
        let resultado;
        switch (option) {
            case 1:
                resultado = await apiPostBanco(
                    bancos.nombre,
                    bancos.img,
                );

                if (resultado.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Genial!",
                        text: resultado.message,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/listaBancos";
                        } else {
                            window.location.href = "/listaBancos";
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: resultado.message,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                    });
                }
                break;
            case 2:
                console.log(bancos._id);
                resultado = await apiPutBanco(
                    bancos._id,
                    bancos.nombre,
                    bancos.img,
                    
                );
                if (resultado) {
                    Swal.fire({
                        icon: "success",
                        title: "Genial!",
                        text: `usuario actualizado correctamente!`,
                        confirmButtonText: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/listaBancos";

                        } else {
                            window.location.href = "/listaBancos";

                        }
                    });
                }
                break;
        }
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            // Mostrar una alerta de Swal indicando los campos faltantes
            const missingFields = error.inner.map((err) => err.path);
            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: `Por favor, complete los campos obligatorios: ${missingFields.join(", ")}`,
                showConfirmButton: true,
                confirmButtonText: "Ok",
            });
        }
    }
};
