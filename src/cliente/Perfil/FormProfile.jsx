import React, { useState } from "react";
import { sendData } from "./helpers/FormProfileHelper";

export const FormProfile = (profileEdit, option, id) => {
  const [state, setState] = useState(profileEdit);
console.log(state);
  const handleSubmit = (event) => {
    event.preventDefault();
    sendData(state, 2, id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-black">Correo</label>
        <input
          className="form-control"
          name="correo"
          value={state.profile.correo}
          onChange={(event) =>
            setState({
                profile:{
                ...state.profile,
                correo: event.target.value,
            }})
          }
        ></input>
      </div>
      <div className="form-group">
        <label className="text-black">Password</label>
        <input
          className="form-control"
          name="correo"
          onChange={(event) =>
            setState({
                profile:{
                ...state.profile,
                password: event.target.value,
            }})
          }
        ></input>
      </div>
      <div className="form-group">
        <label className="text-black">Celular</label>
        <input
          className="form-control"
          name="correo"
          value={state.profile.celular}
          onChange={(event) =>
            setState({
                profile:{
                ...state.profile,
                celular: event.target.value,
            }})
          }
        ></input>
      </div>
      <div className="form-group">
        <label className="text-black">Imagen</label>
        <input
          className="form-control"
          name="edad"
          value={state.profile.img}
          onChange={(event) =>
            setState({
                profile:{
                ...state.profile,
                img: event.target.value,
            }})
          }
        ></input>
      </div>
      <div className="container text-center">
        <button id="btn-enviar" type="submit" className="btn">
          <i className="fa fa-save mx-4"></i>Enviar
        </button>
      </div>
    </form>
  );
};
