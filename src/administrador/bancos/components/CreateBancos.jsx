import React from 'react'
import { FormBancos } from './FormBancos'
import { bancos } from '../models/ModelBanco'

export const CreateBancos = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Banco</h1>
                <FormBancos bancosProp={bancos} titleButton={"Crear Banco"}
                    option={1} />
            </div>
        </>
    )
}
