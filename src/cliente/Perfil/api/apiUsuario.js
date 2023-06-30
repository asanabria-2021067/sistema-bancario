import axios from "axios";
const token = localStorage.getItem("token");
const URL = "https://sistema-bancario-git-master-grupo4kinal.vercel.app/api/usuario/";

export const apiMiUsuario = async() => {
    try {
        const usuario = await axios.get(`${URL}mostrarMiPerfil`, { headers: { "x-token": token } });
        console.log(usuario.data);
        return usuario.data;
      } catch (error) {
        console.log(error);
      }
};

export const updateProfile = async(id, nombre) => {
   try {
     const listaUsuarios = await axios.put(`${URL}editarMiPerfil`,{
       correo: nombre.correo,
       password: nombre.password,
       img: nombre.img,
       celular: nombre.celular,

     }, {headers: {'x-token': token}});
     console.log(listaUsuarios.data.msg);
     return listaUsuarios.data;
   } catch (error) {}
 }
 export const apiEliminarUsuarioById = async () => {
  try {
      const listaUsuarios = await axios.delete(`${URL}eliminarMiPerfil`, {headers: {'x-token': token}});
      console.log(listaUsuarios.data.msg);
      return listaUsuarios.data;
  } catch (error) { }
}