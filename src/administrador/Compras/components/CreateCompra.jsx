import React, { useState } from "react";
import { sendData } from "../helpers/formCompraHelper";
import { compra } from "../model/compra";

export const CreateCompra = () => {
  const [agregar, setAgregar] = useState(compra);
  console.log(agregar)
  const handleSubmit = (event) => {
    event.preventDefault();
    sendData(agregar, 1);
  };

  return (
    <>
      <br />
      <div className="container">
        <h1 id="create-evento">Agregar Compra</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-black">No. de cuenta</label>
            <input
              type="number"
              className="form-control"
              name="noCuenta"
              onChange={(event) =>
                setAgregar({
                  compra: {
                    ...agregar.compra,
                    noCuenta: event.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="text-black">Informacion de la compra</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="informacion"
              onChange={(event) =>
                setAgregar({
                  compra: {
                    ...agregar.compra,
                    informacion: event.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="text-black">Total de Compra</label>
            <br />
            <input
              type="number"
              className="form-control"
              name="dinero"
              onChange={(event) =>
                setAgregar({
                  compra: {
                    ...agregar.compra,
                    dinero: event.target.value,
                  },
                })
              }
            />
          </div>
          <div className="container text-center">
            <button id="btn-enviar" type="submit" className="btn">
            <i className="fa fa-save mx-2"></i>Enviar
            </button>
          </div>
        </form>
      </div>
      <br />
    </>
  );
};
