import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/banco/";

export const apiBancoView = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);

        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostBanco = async (
    nombre,
    img,

) => {
    try {
        const response = await axios.post(
            `${URL}agregar`,
            {
                nombre: nombre,
                img: img
            },
            { headers: { "x-token": token } }
        );

        return {
            success: true,
            message: "Banco agregado correctamente",
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

export const apiDeleteBanco = async (id) => {
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

export const apiPutBanco = async (id,
    nombre,
    img) => {
    try {
        const { data } = await axios.put(
            `${URL}editar/${id}`,
            {
                nombre,
                img
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