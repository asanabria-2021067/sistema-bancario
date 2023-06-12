import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendData } from '../helpers/formDeposito';


import { deposito } from '../models/deposito';

export const CreateDepositos = () => {
    const [agregar, setAgregar] = useState(deposito);
    const navigate = useNavigate();
    console.log(agregar)
    const handleSubmit = (event) => {
        event.preventDefault();
        sendData(agregar, 1);
    };
 
    return (
        <>
            <br />
            <div className='container'>
                <h1 id='create-evento'>Agregar deposito</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-black">Numero de la cuenta</label>
                        <input
                            type="number"
                            className="form-control"
                            name="noCuenta"
                            onChange={(event) =>
                                setAgregar({
                                    deposito: {
                                        ...agregar.deposito,
                                        noCuenta: event.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-black">Dinero</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    deposito: {
                                        ...agregar.deposito,
                                        dinero: event.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    <div className="container text-center">
                        <button id='btn-enviar'
                            type="submit"
                            className="btn"
                        >
                            <i className="fa fa-save mx-2"></i>Enviar
                        </button>
                    </div>
                </form>
            </div>
            <br />
        </>
    )
}