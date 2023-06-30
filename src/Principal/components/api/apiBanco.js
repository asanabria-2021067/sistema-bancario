import axios from "axios"

const URL = 'https://sistema-bancario-ff2jivasf-grupo4kinal.vercel.app/api/banco';

//Mostrar Informacion 
export const apiBancosGet = async () => {
    try {

        const banco = await axios.get(`${URL}/mostrar`);
        console.log(banco.data);
        return banco.data;

    } catch (error) {
    }

}

