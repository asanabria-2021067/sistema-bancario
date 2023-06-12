import {updateProfile } from "../api/apiUsuario";
import Swal from "sweetalert2";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string()
    .required("El correo es requerido"),
});
export const formOptions = { resolver: yupResolver(formSchema) };

export const sendData = async (state, option) => {
    console.log(state)
  let resultado;
  switch (option) {
    case 1:
      break;
    case 2:
      resultado = await updateProfile(state.profile._id, { // Llamar al método de axios con el id y los datos a actualizar
        correo: state.profile.correo,
       password: state.profile.password,
       img: state.profile.img,
       celular: state.profile.celular
      });
      if (resultado) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: `Usuario actualizado correctamente!`,
          confirmButtonText: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/miPerfil";
          } else {
            window.location.href = "/";
          }
        });
      }
      break;
  }
};