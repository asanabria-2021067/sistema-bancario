import axios from "axios";
const URL = "http://localhost:8080/api/favorito/";
const token = localStorage.getItem("token");

export const apiFavoritos = async (id) => {
  try {
    const listaFavoritos = await axios.get(`${URL}mostrar/${id}`,);
    console.log(listaFavoritos.data);
    return listaFavoritos.data;
  } catch (error) {
    console.log(error);
  }
};

export const agregarFavorito = async (id, noCuentaUsuario, nickname) => {
  console.log(noCuentaUsuario);
  try {
    const listaUsuarios = await axios.post(`${URL}agregarContacto/${id}`, {
      noCuentaUsuario: noCuentaUsuario,
      nickname: nickname,
    });
    console.log(listaUsuarios.data.msg);
    return listaUsuarios.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiEliminarContacto = async (id, usuario) => {
  console.log(usuario);

  try {
    const deleteContacto = await axios.delete(`${URL}eliminarContacto/${id}`,{idUsuario:usuario});
    console.log(deleteContacto.data);
    return deleteContacto.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiEliminarLista = async (id) => {
  try {
    const deleteContacto = await axios.delete(`${URL}eliminarLista/${id}`);
    console.log(deleteContacto.data);
    return deleteContacto.data;
  } catch (error) {
    console.log(error);
  }
};

