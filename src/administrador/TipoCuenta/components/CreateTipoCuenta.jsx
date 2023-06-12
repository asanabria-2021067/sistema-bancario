import React, { useState } from "react"
import { sendData } from '../helpers/formTipoCuentaHelper'

import { tipoCuenta } from '../models/tipoCuenta'

export const CreateTipoCuenta = () => {

    const [agregar, setAgregar] = useState(tipoCuenta);

    console.log(agregar)
    const handleSubmit = (event) => {
        event.preventDefault();
        sendData(agregar, 1);
    }; 

    return (
        <>
            <br />
            <div className='container'>
                <h1 id='create-evento'>Agregar tipo</h1>
                <br />
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="text-black">Tipo</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    tipoCuenta: {
                                        ...agregar.tipoCuenta,
                                        tipo: event.target.value,
                                    },
                                })
                            }
                        />
                    </div>

                    <div className="container text-center">
                        <button id='btn-enviar' type="submit" className="btn">
                        <i className="fa fa-save mx-2"></i>Enviar
                        </button>
                    </div>
                </form>
            </div>
            <br />
        </>
    )
}