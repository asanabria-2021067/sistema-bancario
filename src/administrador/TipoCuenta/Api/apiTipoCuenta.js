import axios from "axios"
import Swal from "sweetalert2";

const URL = "http://localhost:8080/api/tipoCuenta/"

export const apiTipoCuenta = async () => {
    try {
        const listaTipo = await axios.get(`${URL}mostrar`);
        console.log(listaTipo.data);
        return listaTipo.data;
    } catch (error) {
        console.error(error);
    }
};

export const DeleteTipoCuenta = async (id) => {
    try {
        const {data} = await axios.delete(`${URL}eliminar/${id}`);
        return true;
    } catch ({
        response: {
            data: {message},
        },
    }) {
        if (message === "GoodBye JOJO") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
}

export const createTipoCuenta = async (tipo) => {
    console.log(tipo);
    try {
        const {tipoCuentaGuardado} = await axios.post(
            `${URL}agregar`,
            {
                tipo: tipo.tipo
            },
        );
        return true;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo agregar el evento"
        });
    }
};