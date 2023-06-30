import axios from "axios";
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/credito/";
const token = localStorage.getItem("token");
export const apiCreditos = async () => {
    try {
      const listaCreditos = await axios.get(`${URL}mostrar/`,);
      console.log(listaCreditos.data);
      return listaCreditos.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const aplicarCredito = async (id, cuenta) => {
    console.log(id);
    console.log(cuenta);
    try {
      const listaCreditos = await axios.post(`${URL}aplicarCredito/${id}/${cuenta}`,);
      console.log(listaCreditos.data);
      return listaCreditos.data;
    } catch (error) {
      console.log(error);
    }
  };
