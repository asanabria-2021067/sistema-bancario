import axios from "axios"

const URL = 'http://localhost:8080/api/banco';

//Mostrar Informacion 
export const apiBancosGet = async () => {
    try {

        const banco = await axios.get(`${URL}/mostrar`);
        console.log(banco.data);
        return banco.data;

    } catch (error) {
    }

}

