import axios from "axios"

const URL = 'https://sistema-bancario-ff2jivasf-grupo4kinal.vercel.app/api/tipoCuenta';

//Mostrar Informacion 
export const apiCuentaGet = async () => {
    try {

        const cuenta = await axios.get(`${URL}/mostrar`);
        console.log(cuenta.data);
        return cuenta.data;

    } catch (error) {
    }

}

