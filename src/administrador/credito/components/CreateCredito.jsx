import React, { useState } from 'react';
import { sendData } from '../helpers/formCreditoHelper';

import { credito } from '../models/credito';

export const CreateCredito = () => {
    const [agregar, setAgregar] = useState(credito);
    console.log(agregar)
    const handleSubmit = (event) => {
        event.preventDefault();
        sendData(agregar, 1 );
    };

    return (
        <>
        <br />
            <div className='container'>
                <h1 id='create-evento'>Agregar credito</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-black">Monto</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    credito: {
                                        ...agregar.credito,
                                        monto: event.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="text-black">Intereses</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    credito: {
                                        ...agregar.credito,
                                        intereses: event.target.value,
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