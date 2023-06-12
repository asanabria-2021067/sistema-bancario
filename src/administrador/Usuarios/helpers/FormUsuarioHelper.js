import Swal from "sweetalert2";
import { apiPostUsuario, apiPutUsuario } from "../api/apiUsuario";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es obligatorio'),
    nombreUsuario: Yup.string().required('El campo nombre de usuario es obligatorio'),
    DPI: Yup.string().required('El campo DPI es obligatorio'),
    correo: Yup.string().required('El campo correo es obligatorio'),
    password: Yup.string().required('El campo password es obligatorio'),
    rol: Yup.string().required('El campo rol es obligatorio'),
    celular: Yup.string().required('El campo celular es obligatorio'),
    direccion: Yup.string().required('El campo dirección es obligatorio'),
    ingresosMensuales: Yup.number().required('El campo ingresos mensuales es obligatorio'),
});

export const sendData = async (usuario, option) => {
    try {
        await validationSchema.validate(usuario, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                resultado = await apiPostUsuario(
                    usuario.nombre,
                    usuario.DPI,
                    usuario.nombreUsuario,
                    usuario.correo,
                    usuario.password,
                    usuario.rol,
                    usuario.celular,
                    usuario.direccion,
                    usuario.ingresosMensuales
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
                            window.location.href = "/listaUsuarios";
                        } else {
                            window.location.href = "/listaUsuarios";
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
                console.log(usuario._id);
                resultado = await apiPutUsuario(
                    usuario._id,
                    usuario.nombre,
                    usuario.DPI,
                    usuario.nombreUsuario,
                    usuario.correo,
                    usuario.password,
                    usuario.rol,
                    usuario.celular,
                    usuario.direccion,
                    usuario.ingresosMensuales
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
                            window.location.href = "/listaUsuarios";

                        } else {
                            window.location.href = "/listaUsuarios";

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
