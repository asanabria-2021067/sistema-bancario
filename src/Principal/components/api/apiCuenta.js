import axios from "axios"

const URL = 'http://localhost:8080/api/tipoCuenta';

//Mostrar Informacion 
export const apiCuentaGet = async () => {
    try {

        const cuenta = await axios.get(`${URL}/mostrar`);
        console.log(cuenta.data);
        return cuenta.data;

    } catch (error) {
    }

}

