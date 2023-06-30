import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/usuario/";

export const apiUsuarioView = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`, { headers: { "x-token": token } });
        
        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostUsuario = async (
    nombre,
    DPI,
    nombreUsuario,
    correo,
    password,
    rol,
    celular,
    direccion,
    ingresosMensuales
) => {
    try {
        const response = await axios.post(
            `${URL}agregar`,
            {
                nombre: nombre,
                DPI: DPI,
                nombreUsuario: nombreUsuario,
                correo: correo,
                password: password,
                rol: rol,
                celular: celular,
                direccion: direccion,
                ingresosMensuales: ingresosMensuales,
            },
            { headers: { "x-token": token } }
        );

        return {
            success: true,
            message: "Usuario agregado correctamente",
        };
    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            return {
                success: false,
                message: data.error,
            };
        } else {
            return {
                success: false,
                message: "Error al procesar la solicitud",
            };
        }
    }
};

export const apiDeleteUsuario = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminar/${id}`, { headers: { "x-token": token } });

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Usuario Eliminado") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutUsuario = async (id,
    nombre,
    DPI,
    nombreUsuario,
    correo,
    password,
    rol,
    celular,
    direccion,
    ingresosMensuales) => {
    try {
        const { data } = await axios.put(
            `${URL}editar/${id}`,
            {
                nombre,
                DPI,
                nombreUsuario,
                correo,
                password,
                rol,
                celular,
                direccion,
                ingresosMensuales
            },
            { headers: { "x-token": token } }
        );
        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "el token ha expirado") {
            localStorage.removeItem("token");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                } else if (result.isDenied) {
                    window.location.href = "/login";
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                showConfirmButton: true,
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                } else {
                }
            });
        }
    }
};