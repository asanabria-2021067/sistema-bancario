import React from 'react'
import { FormUsuario } from './FormUsuario'
import { usuario } from '../models/UsuarioModel'

export const CreateUsuario = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Usuario</h1>
                <FormUsuario tipoProp={usuario} titleButton={"Crear Usuario"}
                    option={1} />
            </div>
        </>
    )
}
